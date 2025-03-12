using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ChatSessions",
                columns: table => new
                {
                    ChatSessionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PetID = table.Column<int>(type: "int", nullable: false),
                    OwnerUserID = table.Column<int>(type: "int", nullable: false),
                    FinderEphemeralId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FinderName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FinderSurname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FinderEmail = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChatSessions", x => x.ChatSessionId);
                });

            migrationBuilder.CreateTable(
                name: "DogBreeds",
                columns: table => new
                {
                    BreedID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BreedName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DogBreeds", x => x.BreedID);
                });

            migrationBuilder.CreateTable(
                name: "MedicalRecordTypes",
                columns: table => new
                {
                    TypeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TypeName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MedicalRecordTypes", x => x.TypeID);
                });

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    NotificationID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserID = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsRead = table.Column<bool>(type: "bit", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReferenceID = table.Column<int>(type: "int", nullable: true),
                    ScheduledTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.NotificationID);
                });

            migrationBuilder.CreateTable(
                name: "QRCodes",
                columns: table => new
                {
                    QRCodeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    QRCodeData = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QRCodeImage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsScannedForFirstTime = table.Column<bool>(type: "bit", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true),
                    DateGenerated = table.Column<DateTime>(type: "datetime2", nullable: true),
                    PetProfileID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QRCodes", x => x.QRCodeID);
                });

            migrationBuilder.CreateTable(
                name: "Statuses",
                columns: table => new
                {
                    StatusID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StatusName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Statuses", x => x.StatusID);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsAdmin = table.Column<bool>(type: "bit", nullable: false),
                    IsVerified = table.Column<bool>(type: "bit", nullable: false),
                    IsPrimaryOwner = table.Column<bool>(type: "bit", nullable: false),
                    IsAccountTransferRequested = table.Column<bool>(type: "bit", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Gender = table.Column<bool>(type: "bit", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ZipCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastLoginDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    FailedLoginAttempts = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserID);
                });

            migrationBuilder.CreateTable(
                name: "ChatMessages",
                columns: table => new
                {
                    ChatMessageId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DateModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ChatSessionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SenderId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MessageContent = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SentAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChatMessages", x => x.ChatMessageId);
                    table.ForeignKey(
                        name: "FK_ChatMessages_ChatSessions_ChatSessionId",
                        column: x => x.ChatSessionId,
                        principalTable: "ChatSessions",
                        principalColumn: "ChatSessionId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    OrderID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    QRCodeID = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Surname = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Mobile = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    TotalAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    OrderStatusID = table.Column<int>(type: "int", nullable: false),
                    Street = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    City = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PostalCode = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Country = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.OrderID);
                    table.ForeignKey(
                        name: "FK_Orders_QRCodes_QRCodeID",
                        column: x => x.QRCodeID,
                        principalTable: "QRCodes",
                        principalColumn: "QRCodeID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Orders_Statuses_OrderStatusID",
                        column: x => x.OrderStatusID,
                        principalTable: "Statuses",
                        principalColumn: "StatusID");
                });

            migrationBuilder.CreateTable(
                name: "PetProfiles",
                columns: table => new
                {
                    PetID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UserID = table.Column<int>(type: "int", nullable: false),
                    PetName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    UniqueUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Age = table.Column<int>(type: "int", nullable: true),
                    BreedID = table.Column<int>(type: "int", nullable: true),
                    IsTransferred = table.Column<bool>(type: "bit", nullable: false),
                    Sex = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    Photo = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    SpecialNotes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    QRCodeID = table.Column<int>(type: "int", nullable: false),
                    IsHavingCard = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PetProfiles", x => x.PetID);
                    table.ForeignKey(
                        name: "FK_PetProfiles_DogBreeds_BreedID",
                        column: x => x.BreedID,
                        principalTable: "DogBreeds",
                        principalColumn: "BreedID");
                    table.ForeignKey(
                        name: "FK_PetProfiles_QRCodes_QRCodeID",
                        column: x => x.QRCodeID,
                        principalTable: "QRCodes",
                        principalColumn: "QRCodeID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PetProfiles_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Schedules",
                columns: table => new
                {
                    ScheduleID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserID = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Time = table.Column<TimeSpan>(type: "time", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    IsCompleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schedules", x => x.ScheduleID);
                    table.ForeignKey(
                        name: "FK_Schedules_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MedicalRecords",
                columns: table => new
                {
                    MedicalRecordID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    PetID = table.Column<int>(type: "int", nullable: false),
                    TypeID = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NextDueDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VetClinicName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MedicalRecords", x => x.MedicalRecordID);
                    table.ForeignKey(
                        name: "FK_MedicalRecords_MedicalRecordTypes_TypeID",
                        column: x => x.TypeID,
                        principalTable: "MedicalRecordTypes",
                        principalColumn: "TypeID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MedicalRecords_PetProfiles_PetID",
                        column: x => x.PetID,
                        principalTable: "PetProfiles",
                        principalColumn: "PetID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PetCards",
                columns: table => new
                {
                    PetCardID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    PetID = table.Column<int>(type: "int", nullable: false),
                    UserID = table.Column<int>(type: "int", nullable: false),
                    UniqueUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MobilePhone1 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MobilePhone2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImportantInformation = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    AdditionalInfo = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AlternativeContactName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AlternativeContactPhone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PetName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BreedName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Age = table.Column<int>(type: "int", nullable: true),
                    Sex = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SpecialNotes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Photo = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    Weight = table.Column<double>(type: "float", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PetCards", x => x.PetCardID);
                    table.ForeignKey(
                        name: "FK_PetCards_PetProfiles_PetID",
                        column: x => x.PetID,
                        principalTable: "PetProfiles",
                        principalColumn: "PetID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PetCards_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PetCardSettings",
                columns: table => new
                {
                    PetCardSettingId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PetId = table.Column<int>(type: "int", nullable: false),
                    PetName = table.Column<bool>(type: "bit", nullable: false),
                    BreedName = table.Column<bool>(type: "bit", nullable: false),
                    Sex = table.Column<bool>(type: "bit", nullable: false),
                    Age = table.Column<bool>(type: "bit", nullable: false),
                    Weight = table.Column<bool>(type: "bit", nullable: false),
                    MobilePhone1 = table.Column<bool>(type: "bit", nullable: false),
                    MobilePhone2 = table.Column<bool>(type: "bit", nullable: false),
                    Address = table.Column<bool>(type: "bit", nullable: false),
                    AlternativeContact = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PetCardSettings", x => x.PetCardSettingId);
                    table.ForeignKey(
                        name: "FK_PetCardSettings_PetProfiles_PetId",
                        column: x => x.PetId,
                        principalTable: "PetProfiles",
                        principalColumn: "PetID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "DogBreeds",
                columns: new[] { "BreedID", "BreedName" },
                values: new object[,]
                {
                    { 1, "Affenpinscher" },
                    { 2, "Airedale Terrier" },
                    { 3, "Akita" },
                    { 4, "Alaskan Malamute" },
                    { 5, "American Bulldog" },
                    { 6, "American Eskimo Dog" },
                    { 7, "American Foxhound" },
                    { 8, "American Pit Bull Terrier" },
                    { 9, "American Staffordshire Terrier" },
                    { 10, "Anatolian Shepherd" },
                    { 11, "Australian Cattle Dog" },
                    { 12, "Australian Shepherd" },
                    { 13, "Barbet" },
                    { 14, "Basenji" },
                    { 15, "Basset Hound" },
                    { 16, "Beagle" },
                    { 17, "Bearded Collie" },
                    { 18, "Beauceron" },
                    { 19, "Bedlington Terrier" },
                    { 20, "Belgian Malinois" },
                    { 21, "Bernese Mountain Dog" },
                    { 22, "Bichon Frise" },
                    { 23, "Biewer Terrier" },
                    { 24, "Bloodhound" },
                    { 25, "Bluetick Coonhound" },
                    { 26, "Boerboel" },
                    { 27, "Bolognese" },
                    { 28, "Border Collie" },
                    { 29, "Border Terrier" },
                    { 30, "Borzoi" },
                    { 31, "Boston Terrier" },
                    { 32, "Bouvier des Flandres" },
                    { 33, "Boxer" },
                    { 34, "Boykin Spaniel" },
                    { 35, "Briard" },
                    { 36, "Brittany" },
                    { 37, "Brussels Griffon" },
                    { 38, "Bull Terrier" },
                    { 39, "Bulldog" },
                    { 40, "Bullmastiff" },
                    { 41, "Cairn Terrier" },
                    { 42, "Cane Corso" },
                    { 43, "Cardigan Welsh Corgi" },
                    { 44, "Cavalier King Charles Spaniel" },
                    { 45, "Chesapeake Bay Retriever" },
                    { 46, "Chihuahua" },
                    { 47, "Chinese Crested" },
                    { 48, "Chinese Shar-Pei" },
                    { 49, "Chinook" },
                    { 50, "Chow Chow" },
                    { 51, "Clumber Spaniel" },
                    { 52, "Cocker Spaniel" },
                    { 53, "Collie" },
                    { 54, "Coton de Tulear" },
                    { 55, "Dachshund" },
                    { 56, "Dalmatian" },
                    { 57, "Doberman Pinscher" },
                    { 58, "Dogo Argentino" },
                    { 59, "Dogue de Bordeaux" },
                    { 60, "Dutch Shepherd" },
                    { 61, "English Cocker Spaniel" },
                    { 62, "English Setter" },
                    { 63, "English Springer Spaniel" },
                    { 64, "Entlebucher Mountain Dog" },
                    { 65, "Flat-Coated Retriever" },
                    { 66, "French Bulldog" },
                    { 67, "German Pinscher" },
                    { 68, "German Shepherd" },
                    { 69, "German Shorthaired Pointer" },
                    { 70, "German Wirehaired Pointer" },
                    { 71, "Giant Schnauzer" },
                    { 72, "Golden Retriever" },
                    { 73, "Gordon Setter" },
                    { 74, "Great Dane" },
                    { 75, "Great Pyrenees" },
                    { 76, "Greater Swiss Mountain Dog" },
                    { 77, "Greyhound" },
                    { 78, "Harrier" },
                    { 79, "Havanese" },
                    { 80, "Irish Setter" },
                    { 81, "Irish Terrier" },
                    { 82, "Irish Water Spaniel" },
                    { 83, "Irish Wolfhound" },
                    { 84, "Italian Greyhound" },
                    { 85, "Jack Russell Terrier" },
                    { 86, "Japanese Chin" },
                    { 87, "Keeshond" },
                    { 88, "Kerry Blue Terrier" },
                    { 89, "Komondor" },
                    { 90, "Kuvasz" },
                    { 91, "Labrador Retriever" },
                    { 92, "Lagotto Romagnolo" },
                    { 93, "Lakeland Terrier" },
                    { 94, "Leonberger" },
                    { 95, "Lhasa Apso" },
                    { 96, "Maltese" },
                    { 97, "Manchester Terrier" },
                    { 98, "Mastiff" },
                    { 99, "Miniature Pinscher" },
                    { 100, "Miniature Schnauzer" },
                    { 101, "Neapolitan Mastiff" },
                    { 102, "Nederlandse Kooikerhondje" },
                    { 103, "Newfoundland" },
                    { 104, "Norfolk Terrier" },
                    { 105, "Norwegian Elkhound" },
                    { 106, "Norwich Terrier" },
                    { 107, "Nova Scotia Duck Tolling Retriever" },
                    { 108, "Old English Sheepdog" },
                    { 109, "Papillon" },
                    { 110, "Pekingese" },
                    { 111, "Pembroke Welsh Corgi" },
                    { 112, "Pharaoh Hound" },
                    { 113, "Plott Hound" },
                    { 114, "Pointer" },
                    { 115, "Pomeranian" },
                    { 116, "Poodle" },
                    { 117, "Portuguese Water Dog" },
                    { 118, "Pug" },
                    { 119, "Puli" },
                    { 120, "Pumi" },
                    { 121, "Rat Terrier" },
                    { 122, "Redbone Coonhound" },
                    { 123, "Rhodesian Ridgeback" },
                    { 124, "Rottweiler" },
                    { 125, "Saint Bernard" },
                    { 126, "Saluki" },
                    { 127, "Samoyed" },
                    { 128, "Schipperke" },
                    { 129, "Shetland Sheepdog" },
                    { 130, "Shiba Inu" },
                    { 131, "Shih Tzu" },
                    { 132, "Siberian Husky" },
                    { 133, "Silky Terrier" },
                    { 134, "Smooth Fox Terrier" },
                    { 135, "Spanish Water Dog" },
                    { 136, "Staffordshire Bull Terrier" },
                    { 137, "Standard Schnauzer" },
                    { 138, "Swedish Vallhund" },
                    { 139, "Tibetan Mastiff" },
                    { 140, "Tibetan Spaniel" },
                    { 141, "Tibetan Terrier" },
                    { 142, "Vizsla" },
                    { 143, "Weimaraner" },
                    { 144, "Welsh Springer Spaniel" },
                    { 145, "Welsh Terrier" },
                    { 146, "West Highland White Terrier" },
                    { 147, "Whippet" },
                    { 148, "Xoloitzcuintli" },
                    { 149, "Yorkshire Terrier" },
                    { 150, "Australian Terrier" },
                    { 151, "Black Russian Terrier" },
                    { 152, "Brittany Spaniel" },
                    { 153, "Catahoula Leopard Dog" },
                    { 154, "Cavalier Spaniel" },
                    { 155, "Curly-Coated Retriever" },
                    { 156, "English Bulldog" },
                    { 157, "English Foxhound" },
                    { 158, "Finnish Spitz" },
                    { 159, "Glen of Imaal Terrier" },
                    { 160, "Great Pyrenean" },
                    { 161, "Irish Red and White Setter" },
                    { 162, "Lakeland Terrier" },
                    { 163, "Lowchen" },
                    { 164, "Mexican Hairless Dog" },
                    { 165, "Norwegian Buhund" },
                    { 166, "Norwegian Lundehund" },
                    { 167, "Otterhound" },
                    { 168, "Petit Basset Griffon Vendeen" },
                    { 169, "Portuguese Podengo" },
                    { 170, "Pudelpointer" },
                    { 171, "Shiloh Shepherd" },
                    { 172, "Skye Terrier" },
                    { 173, "Soft-Coated Wheaten Terrier" },
                    { 174, "Stabyhoun" },
                    { 175, "Sussex Spaniel" },
                    { 176, "Swedish Lapphund" },
                    { 177, "Taiwan Dog" },
                    { 178, "Thai Ridgeback" },
                    { 179, "Tosa" },
                    { 180, "Treeing Walker Coonhound" },
                    { 181, "Volpino Italiano" },
                    { 182, "Wirehaired Vizsla" },
                    { 183, "Wetterhoun" },
                    { 184, "Alano Español" },
                    { 185, "Central Asian Shepherd" },
                    { 186, "Kangal" },
                    { 187, "Estrela Mountain Dog" },
                    { 188, "Chinook" },
                    { 189, "Bohemian Shepherd" },
                    { 190, "Blue Lacy" },
                    { 191, "Danish-Swedish Farmdog" },
                    { 192, "Dutch Smoushond" },
                    { 193, "Old Danish Pointer" },
                    { 194, "Romanian Raven Shepherd Dog" },
                    { 195, "Shikoku" },
                    { 196, "Telomian" },
                    { 197, "Transylvanian Hound" },
                    { 198, "Tibetan Kyi Apso" },
                    { 199, "Yakutian Laika" },
                    { 200, "Yorkshire Terrier" }
                });

            migrationBuilder.InsertData(
                table: "MedicalRecordTypes",
                columns: new[] { "TypeID", "IsActive", "TypeName" },
                values: new object[,]
                {
                    { 1, true, "Vaccination" },
                    { 2, true, "Deworming" },
                    { 3, true, "Preventive Care" },
                    { 4, true, "Surgery" },
                    { 5, true, "Medication" },
                    { 6, true, "Routine Check-Up" },
                    { 7, true, "Test Results" },
                    { 8, true, "Injury Treatment" },
                    { 9, true, "Sterilization" }
                });

            migrationBuilder.InsertData(
                table: "Statuses",
                columns: new[] { "StatusID", "StatusName", "Type" },
                values: new object[,]
                {
                    { 1, "Pending", "Order" },
                    { 2, "Completed", "Order" },
                    { 3, "Canceled", "Order" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChatMessages_ChatSessionId",
                table: "ChatMessages",
                column: "ChatSessionId");

            migrationBuilder.CreateIndex(
                name: "IX_MedicalRecords_PetID",
                table: "MedicalRecords",
                column: "PetID");

            migrationBuilder.CreateIndex(
                name: "IX_MedicalRecords_TypeID",
                table: "MedicalRecords",
                column: "TypeID");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_OrderStatusID",
                table: "Orders",
                column: "OrderStatusID");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_QRCodeID",
                table: "Orders",
                column: "QRCodeID");

            migrationBuilder.CreateIndex(
                name: "IX_PetCards_PetID",
                table: "PetCards",
                column: "PetID");

            migrationBuilder.CreateIndex(
                name: "IX_PetCards_UserID",
                table: "PetCards",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_PetCardSettings_PetId",
                table: "PetCardSettings",
                column: "PetId");

            migrationBuilder.CreateIndex(
                name: "IX_PetProfiles_BreedID",
                table: "PetProfiles",
                column: "BreedID");

            migrationBuilder.CreateIndex(
                name: "IX_PetProfiles_QRCodeID",
                table: "PetProfiles",
                column: "QRCodeID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PetProfiles_UserID",
                table: "PetProfiles",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_UserID",
                table: "Schedules",
                column: "UserID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChatMessages");

            migrationBuilder.DropTable(
                name: "MedicalRecords");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "PetCards");

            migrationBuilder.DropTable(
                name: "PetCardSettings");

            migrationBuilder.DropTable(
                name: "Schedules");

            migrationBuilder.DropTable(
                name: "ChatSessions");

            migrationBuilder.DropTable(
                name: "MedicalRecordTypes");

            migrationBuilder.DropTable(
                name: "Statuses");

            migrationBuilder.DropTable(
                name: "PetProfiles");

            migrationBuilder.DropTable(
                name: "DogBreeds");

            migrationBuilder.DropTable(
                name: "QRCodes");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}

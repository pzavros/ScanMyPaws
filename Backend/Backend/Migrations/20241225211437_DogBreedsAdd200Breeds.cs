using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class DogBreedsAdd200Breeds : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "DogBreeds",
                columns: new[] { "BreedID", "BreedName" },
                values: new object[,]
                {
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
                    { 199, "Yakutian Laika" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 29);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 30);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 31);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 32);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 33);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 34);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 35);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 36);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 37);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 38);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 39);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 40);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 41);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 42);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 43);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 44);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 45);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 46);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 47);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 48);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 49);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 50);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 51);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 52);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 53);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 54);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 55);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 56);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 57);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 58);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 59);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 60);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 61);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 62);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 63);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 64);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 65);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 66);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 67);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 68);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 69);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 70);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 71);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 72);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 73);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 74);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 75);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 76);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 77);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 78);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 79);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 80);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 81);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 82);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 83);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 84);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 85);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 86);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 87);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 88);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 89);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 90);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 91);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 92);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 93);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 94);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 95);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 96);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 97);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 98);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 99);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 100);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 101);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 102);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 103);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 104);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 105);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 106);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 107);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 108);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 109);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 110);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 111);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 112);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 113);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 114);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 115);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 116);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 117);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 118);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 119);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 120);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 121);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 122);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 123);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 124);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 125);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 126);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 127);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 128);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 129);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 130);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 131);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 132);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 133);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 134);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 135);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 136);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 137);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 138);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 139);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 140);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 141);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 142);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 143);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 144);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 145);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 146);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 147);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 148);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 149);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 150);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 151);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 152);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 153);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 154);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 155);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 156);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 157);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 158);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 159);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 160);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 161);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 162);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 163);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 164);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 165);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 166);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 167);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 168);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 169);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 170);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 171);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 172);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 173);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 174);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 175);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 176);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 177);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 178);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 179);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 180);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 181);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 182);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 183);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 184);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 185);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 186);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 187);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 188);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 189);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 190);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 191);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 192);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 193);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 194);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 195);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 196);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 197);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 198);

            migrationBuilder.DeleteData(
                table: "DogBreeds",
                keyColumn: "BreedID",
                keyValue: 199);
        }
    }
}

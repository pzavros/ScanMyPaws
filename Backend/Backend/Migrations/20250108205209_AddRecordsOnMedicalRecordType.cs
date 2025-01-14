using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddRecordsOnMedicalRecordType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MedicalRecordType",
                columns: table => new
                {
                    TypeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TypeName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MedicalRecordType", x => x.TypeID);
                });

            migrationBuilder.CreateTable(
                name: "MedicalRecord",
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
                    table.PrimaryKey("PK_MedicalRecord", x => x.MedicalRecordID);
                    table.ForeignKey(
                        name: "FK_MedicalRecord_MedicalRecordType_TypeID",
                        column: x => x.TypeID,
                        principalTable: "MedicalRecordType",
                        principalColumn: "TypeID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MedicalRecord_PetProfiles_PetID",
                        column: x => x.PetID,
                        principalTable: "PetProfiles",
                        principalColumn: "PetID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "MedicalRecordType",
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

            migrationBuilder.CreateIndex(
                name: "IX_MedicalRecord_PetID",
                table: "MedicalRecord",
                column: "PetID");

            migrationBuilder.CreateIndex(
                name: "IX_MedicalRecord_TypeID",
                table: "MedicalRecord",
                column: "TypeID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MedicalRecord");

            migrationBuilder.DropTable(
                name: "MedicalRecordType");
        }
    }
}

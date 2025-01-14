using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateMedicalRecordModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MedicalRecords_MedicalRecordTypes_MedicalRecordTypeTypeID",
                table: "MedicalRecords");

            migrationBuilder.DropIndex(
                name: "IX_MedicalRecords_MedicalRecordTypeTypeID",
                table: "MedicalRecords");

            migrationBuilder.DropColumn(
                name: "MedicalRecordTypeTypeID",
                table: "MedicalRecords");

            migrationBuilder.CreateIndex(
                name: "IX_MedicalRecords_PetID",
                table: "MedicalRecords",
                column: "PetID");

            migrationBuilder.CreateIndex(
                name: "IX_MedicalRecords_TypeID",
                table: "MedicalRecords",
                column: "TypeID");

            migrationBuilder.AddForeignKey(
                name: "FK_MedicalRecords_MedicalRecordTypes_TypeID",
                table: "MedicalRecords",
                column: "TypeID",
                principalTable: "MedicalRecordTypes",
                principalColumn: "TypeID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MedicalRecords_PetProfiles_PetID",
                table: "MedicalRecords",
                column: "PetID",
                principalTable: "PetProfiles",
                principalColumn: "PetID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MedicalRecords_MedicalRecordTypes_TypeID",
                table: "MedicalRecords");

            migrationBuilder.DropForeignKey(
                name: "FK_MedicalRecords_PetProfiles_PetID",
                table: "MedicalRecords");

            migrationBuilder.DropIndex(
                name: "IX_MedicalRecords_PetID",
                table: "MedicalRecords");

            migrationBuilder.DropIndex(
                name: "IX_MedicalRecords_TypeID",
                table: "MedicalRecords");

            migrationBuilder.AddColumn<int>(
                name: "MedicalRecordTypeTypeID",
                table: "MedicalRecords",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_MedicalRecords_MedicalRecordTypeTypeID",
                table: "MedicalRecords",
                column: "MedicalRecordTypeTypeID");

            migrationBuilder.AddForeignKey(
                name: "FK_MedicalRecords_MedicalRecordTypes_MedicalRecordTypeTypeID",
                table: "MedicalRecords",
                column: "MedicalRecordTypeTypeID",
                principalTable: "MedicalRecordTypes",
                principalColumn: "TypeID");
        }
    }
}

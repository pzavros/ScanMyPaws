using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddMedicalRecordsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MedicalRecord_MedicalRecordType_TypeID",
                table: "MedicalRecord");

            migrationBuilder.DropForeignKey(
                name: "FK_MedicalRecord_PetProfiles_PetID",
                table: "MedicalRecord");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MedicalRecord",
                table: "MedicalRecord");

            migrationBuilder.RenameTable(
                name: "MedicalRecord",
                newName: "MedicalRecords");

            migrationBuilder.RenameIndex(
                name: "IX_MedicalRecord_TypeID",
                table: "MedicalRecords",
                newName: "IX_MedicalRecords_TypeID");

            migrationBuilder.RenameIndex(
                name: "IX_MedicalRecord_PetID",
                table: "MedicalRecords",
                newName: "IX_MedicalRecords_PetID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MedicalRecords",
                table: "MedicalRecords",
                column: "MedicalRecordID");

            migrationBuilder.AddForeignKey(
                name: "FK_MedicalRecords_MedicalRecordType_TypeID",
                table: "MedicalRecords",
                column: "TypeID",
                principalTable: "MedicalRecordType",
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
                name: "FK_MedicalRecords_MedicalRecordType_TypeID",
                table: "MedicalRecords");

            migrationBuilder.DropForeignKey(
                name: "FK_MedicalRecords_PetProfiles_PetID",
                table: "MedicalRecords");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MedicalRecords",
                table: "MedicalRecords");

            migrationBuilder.RenameTable(
                name: "MedicalRecords",
                newName: "MedicalRecord");

            migrationBuilder.RenameIndex(
                name: "IX_MedicalRecords_TypeID",
                table: "MedicalRecord",
                newName: "IX_MedicalRecord_TypeID");

            migrationBuilder.RenameIndex(
                name: "IX_MedicalRecords_PetID",
                table: "MedicalRecord",
                newName: "IX_MedicalRecord_PetID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MedicalRecord",
                table: "MedicalRecord",
                column: "MedicalRecordID");

            migrationBuilder.AddForeignKey(
                name: "FK_MedicalRecord_MedicalRecordType_TypeID",
                table: "MedicalRecord",
                column: "TypeID",
                principalTable: "MedicalRecordType",
                principalColumn: "TypeID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MedicalRecord_PetProfiles_PetID",
                table: "MedicalRecord",
                column: "PetID",
                principalTable: "PetProfiles",
                principalColumn: "PetID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

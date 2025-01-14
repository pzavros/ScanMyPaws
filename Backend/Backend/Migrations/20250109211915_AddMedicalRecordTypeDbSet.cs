using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddMedicalRecordTypeDbSet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MedicalRecords_MedicalRecordType_TypeID",
                table: "MedicalRecords");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MedicalRecordType",
                table: "MedicalRecordType");

            migrationBuilder.RenameTable(
                name: "MedicalRecordType",
                newName: "MedicalRecordTypes");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MedicalRecordTypes",
                table: "MedicalRecordTypes",
                column: "TypeID");

            migrationBuilder.AddForeignKey(
                name: "FK_MedicalRecords_MedicalRecordTypes_TypeID",
                table: "MedicalRecords",
                column: "TypeID",
                principalTable: "MedicalRecordTypes",
                principalColumn: "TypeID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MedicalRecords_MedicalRecordTypes_TypeID",
                table: "MedicalRecords");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MedicalRecordTypes",
                table: "MedicalRecordTypes");

            migrationBuilder.RenameTable(
                name: "MedicalRecordTypes",
                newName: "MedicalRecordType");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MedicalRecordType",
                table: "MedicalRecordType",
                column: "TypeID");

            migrationBuilder.AddForeignKey(
                name: "FK_MedicalRecords_MedicalRecordType_TypeID",
                table: "MedicalRecords",
                column: "TypeID",
                principalTable: "MedicalRecordType",
                principalColumn: "TypeID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

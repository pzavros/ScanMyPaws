using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTables_QRCode_PetProfiles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QRCodes_PetProfiles_PetID",
                table: "QRCodes");

            migrationBuilder.DropIndex(
                name: "IX_QRCodes_PetID",
                table: "QRCodes");

            migrationBuilder.DropColumn(
                name: "PetID",
                table: "QRCodes");

            migrationBuilder.AlterColumn<string>(
                name: "SpecialNotes",
                table: "PetProfiles",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(500)",
                oldMaxLength: 500);

            migrationBuilder.AlterColumn<string>(
                name: "Sex",
                table: "PetProfiles",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10);

            migrationBuilder.AlterColumn<string>(
                name: "PhotoURL",
                table: "PetProfiles",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(500)",
                oldMaxLength: 500);

            migrationBuilder.AlterColumn<string>(
                name: "Breed",
                table: "PetProfiles",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AddColumn<int>(
                name: "QRCodeID",
                table: "PetProfiles",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_PetProfiles_QRCodeID",
                table: "PetProfiles",
                column: "QRCodeID",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_PetProfiles_QRCodes_QRCodeID",
                table: "PetProfiles",
                column: "QRCodeID",
                principalTable: "QRCodes",
                principalColumn: "QRCodeID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PetProfiles_QRCodes_QRCodeID",
                table: "PetProfiles");

            migrationBuilder.DropIndex(
                name: "IX_PetProfiles_QRCodeID",
                table: "PetProfiles");

            migrationBuilder.DropColumn(
                name: "QRCodeID",
                table: "PetProfiles");

            migrationBuilder.AddColumn<int>(
                name: "PetID",
                table: "QRCodes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "SpecialNotes",
                table: "PetProfiles",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Sex",
                table: "PetProfiles",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PhotoURL",
                table: "PetProfiles",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Breed",
                table: "PetProfiles",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_QRCodes_PetID",
                table: "QRCodes",
                column: "PetID",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_QRCodes_PetProfiles_PetID",
                table: "QRCodes",
                column: "PetID",
                principalTable: "PetProfiles",
                principalColumn: "PetID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

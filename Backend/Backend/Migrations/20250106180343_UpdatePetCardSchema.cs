using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdatePetCardSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ContactInformation",
                table: "PetCards",
                newName: "FullName");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "PetCards",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AlternativeContactName",
                table: "PetCards",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AlternativeContactPhone",
                table: "PetCards",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "PetCards");

            migrationBuilder.DropColumn(
                name: "AlternativeContactName",
                table: "PetCards");

            migrationBuilder.DropColumn(
                name: "AlternativeContactPhone",
                table: "PetCards");

            migrationBuilder.RenameColumn(
                name: "FullName",
                table: "PetCards",
                newName: "ContactInformation");
        }
    }
}

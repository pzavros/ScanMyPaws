using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdatePetCardSchema2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Age",
                table: "PetCards",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BreedName",
                table: "PetCards",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PetName",
                table: "PetCards",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<byte[]>(
                name: "Photo",
                table: "PetCards",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Sex",
                table: "PetCards",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SpecialNotes",
                table: "PetCards",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Age",
                table: "PetCards");

            migrationBuilder.DropColumn(
                name: "BreedName",
                table: "PetCards");

            migrationBuilder.DropColumn(
                name: "PetName",
                table: "PetCards");

            migrationBuilder.DropColumn(
                name: "Photo",
                table: "PetCards");

            migrationBuilder.DropColumn(
                name: "Sex",
                table: "PetCards");

            migrationBuilder.DropColumn(
                name: "SpecialNotes",
                table: "PetCards");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class DogBreeds : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BreedID",
                table: "PetProfiles",
                type: "int",
                nullable: true);

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

            migrationBuilder.InsertData(
                table: "DogBreeds",
                columns: new[] { "BreedID", "BreedName" },
                values: new object[,]
                {
                    { 1, "Affenpinscher" },
                    { 2, "Airedale Terrier" },
                    { 3, "Akita" },
                    { 200, "Yorkshire Terrier" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_PetProfiles_BreedID",
                table: "PetProfiles",
                column: "BreedID");

            migrationBuilder.AddForeignKey(
                name: "FK_PetProfiles_DogBreeds_BreedID",
                table: "PetProfiles",
                column: "BreedID",
                principalTable: "DogBreeds",
                principalColumn: "BreedID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PetProfiles_DogBreeds_BreedID",
                table: "PetProfiles");

            migrationBuilder.DropTable(
                name: "DogBreeds");

            migrationBuilder.DropIndex(
                name: "IX_PetProfiles_BreedID",
                table: "PetProfiles");

            migrationBuilder.DropColumn(
                name: "BreedID",
                table: "PetProfiles");
        }
    }
}

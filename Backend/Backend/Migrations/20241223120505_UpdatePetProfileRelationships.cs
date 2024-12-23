using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdatePetProfileRelationships : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PetProfiles_Users_UserID",
                table: "PetProfiles");

            migrationBuilder.AddForeignKey(
                name: "FK_PetProfiles_Users_UserID",
                table: "PetProfiles",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PetProfiles_Users_UserID",
                table: "PetProfiles");

            migrationBuilder.AddForeignKey(
                name: "FK_PetProfiles_Users_UserID",
                table: "PetProfiles",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

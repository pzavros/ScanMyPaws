using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class BytePhoto : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhotoURL",
                table: "PetProfiles");

            migrationBuilder.AddColumn<byte[]>(
                name: "Photo",
                table: "PetProfiles",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Photo",
                table: "PetProfiles");

            migrationBuilder.AddColumn<string>(
                name: "PhotoURL",
                table: "PetProfiles",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}

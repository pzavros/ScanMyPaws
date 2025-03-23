using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddPetLocationHistoryTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PetLocationHistories",
                columns: table => new
                {
                    PetLocationHistoryID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PetCardID = table.Column<int>(type: "int", nullable: false),
                    FinderName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FinderContact = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Latitude = table.Column<double>(type: "float", nullable: true),
                    Longitude = table.Column<double>(type: "float", nullable: true),
                    DateFound = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PetLocationHistories", x => x.PetLocationHistoryID);
                    table.ForeignKey(
                        name: "FK_PetLocationHistories_PetCards_PetCardID",
                        column: x => x.PetCardID,
                        principalTable: "PetCards",
                        principalColumn: "PetCardID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PetLocationHistories_PetCardID",
                table: "PetLocationHistories",
                column: "PetCardID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PetLocationHistories");
        }
    }
}

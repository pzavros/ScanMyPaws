using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class PetCard : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PetCards",
                columns: table => new
                {
                    PetCardID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    PetID = table.Column<int>(type: "int", nullable: false),
                    UserID = table.Column<int>(type: "int", nullable: false),
                    ContactInformation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MobilePhone1 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MobilePhone2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImportantInformation = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    AdditionalInfo = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PetCards", x => x.PetCardID);
                    table.ForeignKey(
                        name: "FK_PetCards_PetProfiles_PetID",
                        column: x => x.PetID,
                        principalTable: "PetProfiles",
                        principalColumn: "PetID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PetCards_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PetCards_PetID",
                table: "PetCards",
                column: "PetID");

            migrationBuilder.CreateIndex(
                name: "IX_PetCards_UserID",
                table: "PetCards",
                column: "UserID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PetCards");
        }
    }
}

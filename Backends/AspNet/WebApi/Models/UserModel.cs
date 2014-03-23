using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QGrid.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Created { get; set; }
    }

    public static class FakeData
    {
        public static IQueryable<UserModel> CreateFakeData()
        {
            return (new List<UserModel>
            {
                new UserModel
                {
                    Id = 1,
                    FirstName = "Olof",
                    LastName = "Dahlbom",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 2,
                    FirstName = "Niclas",
                    LastName = "Johnson",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 3,
                    FirstName = "Brad",
                    LastName = "Simonsson",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 4,
                    FirstName = "George",
                    LastName = "Bush",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 5,
                    FirstName = "Bradley",
                    LastName = "Cooper",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 6,
                    FirstName = "Charles",
                    LastName = "Manson",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 7,
                    FirstName = "Lina",
                    LastName = "Gustavsson",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 8,
                    FirstName = "Maria",
                    LastName = "Fredriksson",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 9,
                    FirstName = "Phil",
                    LastName = "Solomon",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 10,
                    FirstName = "Jerry",
                    LastName = "Seinfeld",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 11,
                    FirstName = "Mårten",
                    LastName = "Britse",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 12,
                    FirstName = "Karl",
                    LastName = "Pilkington",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 13,
                    FirstName = "Johannes",
                    LastName = "Herrman",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 14,
                    FirstName = "Sven",
                    LastName = "Ingvar",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 15,
                    FirstName = "Brad",
                    LastName = "Kasparian",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 16,
                    FirstName = "Jörgen",
                    LastName = "Enström",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 17,
                    FirstName = "Felicia",
                    LastName = "Dahl",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 18,
                    FirstName = "Brendan",
                    LastName = "Eich",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 19,
                    FirstName = "Scott",
                    LastName = "Hanselmann",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 20,
                    FirstName = "Denise",
                    LastName = "Hansen",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 21,
                    FirstName = "Dana",
                    LastName = "Hensen",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 22,
                    FirstName = "Jennrifer",
                    LastName = "Lopez",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 23,
                    FirstName = "James",
                    LastName = "Iha",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 24,
                    FirstName = "Sophie",
                    LastName = "Smith",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 25,
                    FirstName = "Andrew",
                    LastName = "Juric",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 26,
                    FirstName = "Gweneth",
                    LastName = "Paltrow",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 27,
                    FirstName = "Brad",
                    LastName = "Pitt",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 28,
                    FirstName = "Mattew",
                    LastName = "Maconawhey",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 29,
                    FirstName = "Criss",
                    LastName = "Thomsson",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 30,
                    FirstName = "Gwen",
                    LastName = "Glasgow",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 31,
                    FirstName = "Beth",
                    LastName = "Dahlbom",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 32,
                    FirstName = "Henry",
                    LastName = "Jacoby",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 33,
                    FirstName = "Juni",
                    LastName = "Strife",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 34,
                    FirstName = "Carla",
                    LastName = "Clark",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 35,
                    FirstName = "Sebastian",
                    LastName = "Philips",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 36,
                    FirstName = "Boss",
                    LastName = "Buper",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 37,
                    FirstName = "Dick",
                    LastName = "See",
                    Created = DateTime.Now
                },
                new UserModel
                {
                    Id = 38,
                    FirstName = "Betty",
                    LastName = "Ray",
                    Created = DateTime.Now
                }

            }).AsQueryable();
        }
    }
}
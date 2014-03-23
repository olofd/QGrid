using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using QGrid;
using QGrid.Models;

namespace AspNet.Controllers
{
    [RoutePrefix("api/UserGrid")]
    public class UserGridController : ApiController
    {
        private GridFilterer<UserModel> GridFilterer { get; set; }
        public UserGridController()
        {
            GridFilterer = new GridFilterer<UserModel>();
            //ToListAsync can not be used on in memory collections.
            //If you use EntityFramework you can le
            GridFilterer.UseAsync = false;
        }

        [Route("DataRequest")]
        public async Task<JsonResponse<UserModel>> DataRequested(RequestParams reqParams)
        {
            return await GridFilterer.FilterDataSource(MapModel(), reqParams);
        }

        [Route("AutoComplete")]
        public async Task<List<string>> AutoComplete(RequestParams reqParams)
        {
            return await GridFilterer.AutoComplete(MapModel(), reqParams);
        }

        [NonAction]
        private IQueryable<UserModel> MapModel()
        {
            //Normal usecase with entityframework:
            //var db = new Entities();
            //return from user in db.tblUser
            //       orderby user.Id
            //       select new UserModel
            //       {
            //           Id = user.Id,
            //           FirstName = user.FirstName,
            //           LastName = user.LastName,
            //           Created = user.Created
            //       };


            return FakeData.CreateFakeData().AsQueryable();
        }
        [Route("Export")]
        public bool Export(RequestParams reqParams)
        {
            return GridFilterer.InternalExport(MapModel(), reqParams);
        }

    }

}

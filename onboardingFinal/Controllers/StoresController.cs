using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using onboardingFinal.Models;

namespace onboardingFinal.Controllers
{
    public class StoresController : ApiController
    {
        private reactmvcEntities db = new reactmvcEntities();

        // GET: api/Stores
        public IEnumerable<Store> GetStores()
        {
            return db.Stores.ToList();
        }

        // GET: api/Stores/5
        //[ResponseType(typeof(Store))]
        public Store GetStore(int id)
        {
            return db.Stores.FirstOrDefault(e => e.Id == id);
        }

        // PUT: api/Stores/5
        //[ResponseType(typeof(void))]
        public HttpResponseMessage PutStore(int id, [FromBody]Store store)
        {
            try
            {

                var entity = db.Stores.FirstOrDefault(e => e.Id == id);
                if (entity == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound,
                        "Employee with Id " + id.ToString() + " not found to update");
                }
                else
                {
                    entity.Name = store.Name;
                    entity.Address = store.Address;

                    db.SaveChanges();

                    return Request.CreateResponse(HttpStatusCode.OK, entity);
                }

            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        // POST: api/Stores
        //[ResponseType(typeof(Store))]
        public HttpResponseMessage PostStore([FromBody] Store store)
        {

            try
            {

                db.Stores.Add(store);
                db.SaveChanges();

                var message = Request.CreateResponse(HttpStatusCode.Created, store);
                message.Headers.Location = new Uri(Request.RequestUri +
                    store.Id.ToString());

                return message;

            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        // DELETE: api/Stores/5
        //[ResponseType(typeof(Store))]
        public IHttpActionResult DeleteStore(int id)
        {
            Store store = db.Stores.Find(id);
            if (store == null)
            {
                return NotFound();
            }

            db.Stores.Remove(store);
            db.SaveChanges();

            return Ok(store);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool StoreExists(int id)
        {
            return db.Stores.Count(e => e.Id == id) > 0;
        }
    }
}
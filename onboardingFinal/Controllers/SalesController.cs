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
    public class SalesController : ApiController
    {
        private reactmvcEntities db = new reactmvcEntities();

        // GET: api/Sales
        public IEnumerable<Sale> GetSales()
        {
            return db.Sales.ToList();
        }

        // GET: api/Sales/5
        //[ResponseType(typeof(Sale))]
        public Sale GetSale(int id)
        {
            return db.Sales.FirstOrDefault(e => e.Id == id); ;
        }

        // PUT: api/Sales/5
        //[ResponseType(typeof(void))]
        public HttpResponseMessage PutSale(int id, Sale sale)
        {
            try
            {

                var entity = db.Sales.FirstOrDefault(e => e.Id == id);
                if (entity == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound,
                        "Product with Id " + id.ToString() + " not found to update");
                }
                else
                {
                    entity.DateSold = sale.DateSold;
                    entity.CustomerId = sale.CustomerId;
                    entity.ProductId = sale.ProductId;
                    entity.StoreId = sale.StoreId;

                    db.SaveChanges();

                    return Request.CreateResponse(HttpStatusCode.OK, entity);
                }

            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        // POST: api/Sales
        //[ResponseType(typeof(Sale))]
        public HttpResponseMessage PostSale([FromBody] Sale sale)
        {
            try
            {

                db.Sales.Add(sale);
                db.SaveChanges();

                var message = Request.CreateResponse(HttpStatusCode.Created, sale);
                message.Headers.Location = new Uri(Request.RequestUri +
                    sale.Id.ToString());

                return message;

            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        // DELETE: api/Sales/5
        //[ResponseType(typeof(Sale))]
        public HttpResponseMessage DeleteSale(int id)
        {
            try
            {

                var entity = db.Sales.FirstOrDefault(e => e.Id == id);
                if (entity == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound,
                        "Product with Id = " + id.ToString() + " not found to delete");
                }
                else
                {
                    db.Sales.Remove(entity);
                    db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK);
                }

            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SaleExists(int id)
        {
            return db.Sales.Count(e => e.Id == id) > 0;
        }
    }
}
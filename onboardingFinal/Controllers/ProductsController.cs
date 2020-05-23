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
    public class ProductsController : ApiController
    {
        private reactmvcEntities db = new reactmvcEntities();

        // GET: api/Products
        public IEnumerable<Product> GetProducts()
        {
            return db.Products.ToList();
        }

        // GET: api/Products/5
        //[ResponseType(typeof(Product))]
        public Product Get(int id)
        {
            return db.Products.FirstOrDefault(e => e.Id == id); ;
        }
        
        //public IHttpActionResult GetProduct(int id)
        //{
        //    Product product = db.Products.Find(id);
        //    if (product == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(product);
        //}

        // PUT: api/Products/5
        //[ResponseType(typeof(void))]
        public HttpResponseMessage PutProduct(int id, Product product)
        {
            try
            {

                var entity = db.Products.FirstOrDefault(e => e.Id == id);
                if (entity == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound,
                        "Product with Id " + id.ToString() + " not found to update");
                }
                else
                {
                    entity.Name = product.Name;
                    entity.Price = product.Price;

                    db.SaveChanges();

                    return Request.CreateResponse(HttpStatusCode.OK, entity);
                }

            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        // POST: api/Products
        //[ResponseType(typeof(Product))]
        public HttpResponseMessage PostProduct([FromBody] Product product)
        {
            try
            {

                db.Products.Add(product);
                db.SaveChanges();

                var message = Request.CreateResponse(HttpStatusCode.Created, product);
                message.Headers.Location = new Uri(Request.RequestUri +
                    product.Id.ToString());

                return message;

            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        // DELETE: api/Products/5
        //[ResponseType(typeof(Product))]
        public HttpResponseMessage DeleteProduct(int id)
        {
            try
            {

                var entity = db.Products.FirstOrDefault(e => e.Id == id);
                if (entity == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound,
                        "Product with Id = " + id.ToString() + " not found to delete");
                }
                else
                {
                    db.Products.Remove(entity);
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

        private bool ProductExists(int id)
        {
            return db.Products.Count(e => e.Id == id) > 0;
        }
    }
}
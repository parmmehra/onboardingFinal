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
    public class CustomersController : ApiController
    {
        private reactmvcEntities db = new reactmvcEntities();
        // GET: api/customer
        public IEnumerable<Customer> Get()
        {
            return db.Customers.ToList();
            // return new string[] { "value1", "value2" };
        }

        // GET: api/customer/5
        public Customer Get(int id)
        {
            return db.Customers.FirstOrDefault(e => e.Id == id); 
        }

        // POST: api/customer
        public HttpResponseMessage Post([FromBody] Customer customer)
        {
            try
            {

                db.Customers.Add(customer);
                db.SaveChanges();

                var message = Request.CreateResponse(HttpStatusCode.Created, customer);
                message.Headers.Location = new Uri(Request.RequestUri +
                    customer.Id.ToString());

                return message;

            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        // PUT: api/customer/5
        public HttpResponseMessage Put(int id, [FromBody]Customer customer)
        {
            try
            {

                var entity = db.Customers.FirstOrDefault(e => e.Id == id);
                if (entity == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound,
                        "Employee with Id " + id.ToString() + " not found to update");
                }
                else
                {
                    entity.Name = customer.Name;
                    entity.Address = customer.Address;

                    db.SaveChanges();

                    return Request.CreateResponse(HttpStatusCode.OK, entity);
                }

            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        // PUT: api/customer/5
        //[Route("Updatestudent")]
        //[HttpGet]
        //public HttpResponseMessage Updatestudent (int id, string Name, string Address)
        //{
        ////    public HttpResponseMessage Put(int id, [FromBody]Customer customer)
        ////{
        //    try
        //    {

        //        var entity = db.Customers.FirstOrDefault(e => e.Id == id);
        //        if (entity == null)
        //        {
        //            return Request.CreateErrorResponse(HttpStatusCode.NotFound,
        //                "Employee with Id " + id.ToString() + " not found to update");
        //        }
        //        else
        //        {
        //            entity.Name = Name;
        //            entity.Address = Address;

        //            db.SaveChanges();

        //            return Request.CreateResponse(HttpStatusCode.OK, entity);
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
        //    }
        //}


        // DELETE: api/customer/5
        public HttpResponseMessage Delete(int id)
        {
            try
            {

                var entity = db.Customers.FirstOrDefault(e => e.Id == id);
                if (entity == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound,
                        "Employee with Id = " + id.ToString() + " not found to delete");
                }
                else
                {
                    db.Customers.Remove(entity);
                    db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK);
                }

            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}
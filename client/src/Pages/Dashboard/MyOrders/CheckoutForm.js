import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Loader } from '../../Shared/Loader/Loader';
import { toast, ToastContainer } from 'react-toastify';





const CheckoutForm = ({ bike, user }) => {
   const [isLoading, setIsLoading] = useState(false);
   const stripe = useStripe();
   const elements = useElements();
   const { rslPrice } = bike;
   const [cardError, setCardError] = useState('');
   const [clientSecret, setClientSecret] = useState("");
   const id = bike?._id;


   useEffect(() => {
      setIsLoading(true)
      // Create PaymentIntent as soon as the page loads
      fetch("https://bike-one.vercel.app/create-payment-intent", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${localStorage.getItem('accessToken')}`
         },
         body: JSON.stringify({ rslPrice }),
      })
         .then((res) => res.json())
         .then((data) => {
            setClientSecret(data.clientSecret)
            setIsLoading(false)
         });
   }, [rslPrice]);

   if (isLoading) {
      return <Loader />
   }

   const handleSubmit = async (event) => {
      event.preventDefault();

      if (!stripe || !elements) {
         return;
      }

      const card = elements.getElement(CardElement);
      if (card === null) {
         return;
      }
      const { error, paymentMethod } = await stripe.createPaymentMethod({
         type: 'card',
         card,
      });

      if (error) {
         setCardError(error);
         // return;
      } else {
         setCardError('');
      }

      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
         clientSecret,
         {
            payment_method: {
               card: card,
               billing_details: {
                  name: user?.displayName,
                  email: user?.email
               },
            },
         },
      );
      if (confirmError) {
         setCardError(confirmError);
         return;
      }
      console.log(paymentIntent);
      if (paymentIntent.status === "succeeded") {

         fetch(`https://bike-one.vercel.app/bikes/${id}`, {
            method: 'PUT',
            headers: {
               'content-type': 'application/json',
               authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ status: "Sold" })
         })
            .then(res => res.json())
            .then(data => {
               console.log(data);
               if (data.modifiedCount > 0) {
                  successToast("Payment Successful.")
                  event.target.reset();
               }
            })
      }

   }


   const successToast = (er) => {
      toast.success(er, {
         position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "colored",
      });
   }

   return (
      <div>
         <form onSubmit={handleSubmit}>
            {
               cardError &&
               <h4>{cardError}</h4>
            }
            <CardElement
               options={{
                  style: {
                     base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                           color: '#aab7c4',
                        },
                     },
                     invalid: {
                        color: '#9e2146',
                     },
                  },
               }}
            />
            <button className='mt-5 btn btn-info' type="submit" disabled={!stripe || !clientSecret}>
               Pay
            </button>
         </form>
         <ToastContainer />
      </div>
   );
};

export default CheckoutForm;
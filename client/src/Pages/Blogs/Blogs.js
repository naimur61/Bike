import React from 'react';
import useTitle from '../../Hooks/Title/useTitle';
import './Blogs.css'


const Blogs = () => {
   useTitle('Blogs');

   return (
      <div className='bg-blogs'>
         <div className='p-16'>


            <h1 className='blog-textBg text-4xl mx-auto' style={{ fontFamily: "'Acme', sans-serif" }}> You can read our Blogs</h1>


            <div className=' my-10 lg:mx-10 flex flex-col justify-center items-center'>

               <div className='blog-textBg'>
                  <h2 className='text-3xl font-bold  mb-5'>What are the different ways to manage a state in a React application ? </h2>
                  <p>There are four main types of state you need to properly manage in your React apps:

                     1.  Local state <br />
                     2.  Global state<br />
                     3.   Server state<br />
                     4   URL state</p>
               </div>
               <div className='blog-textBg'>
                  <h2 className='text-3xl font-bold  mb-5'>How does prototypical inheritance work? </h2>
                  <p>The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.</p>
               </div>
               <div className='blog-textBg'>
                  <h2 className='text-3xl font-bold  mb-5'>What is a unit test? Why should we write unit tests?</h2>
                  <p>The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.</p>
               </div>
               <div className='blog-textBg'>
                  <h2 className='text-3xl font-bold  mb-5'> React vs. Angular vs. Vue?</h2>
                  <div>
                     <div>
                        <h1 className='text-xl font-bold  mt-5'>React</h1>
                        <p>React doesn’t enforce a specific project structure, and as you can see from the official “Hello World” example below, you can start using React with just a few lines of code.
                           <br />
                           React can be used as a UI library to render elements, without enforcing a specific project structure, and that’s why it’s not strictly a framework.
                           <br />
                           React is based on JavaScript, but it’s mostly combined with JSX (JavaScript XML), a syntax extension that allows you to create elements that contain HTML and JavaScript at the same time.
                        </p>
                     </div>
                     <div>
                        <h1 className='text-xl font-bold  mt-5'>Vue</h1>
                        <p>

                           The Vue.js core library focuses on the View layer only. It’s called a progressive framework because you can extend its functionality with official and third-party packages, such as Vue Router or Vuex, to turn it into an actual framework.
                        </p>
                     </div>
                     <div>
                        <h1 className='text-xl font-bold  mt-5'>Angular</h1>
                        <p>

                           In this article, I’m discussing Angular 2, and not the first version of the framework which is now known as AngularJS.

                           AngularJS, the original framework, is an MVC (Model-View-Controller) framework. But in Angular 2, there’s no strict association with MV*-patterns as it is also component-based.
                        </p>
                     </div>
                  </div>
               </div>


            </div>

         </div>
      </div>
   );
};

export default Blogs;
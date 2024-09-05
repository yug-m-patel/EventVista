import React from 'react';
import { Link } from 'react-router-dom'; // Use this if you are using React Router for navigation
import cseimg from './assets/images/cseevent.jpg';
import cllgimg from './assets/images/cllg.jpg';
import libimg from './assets/images/lib.jpg';

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-gray-100 shadow">
        <Link to="#" className="flex items-center justify-center">
          <CalendarIcon className="h-6 w-6" />
          <span className="text-xl font-bold text-gray-800">
            <span className="text-gray-600">Event</span> <span className="text-gray-800 font-bold">Vista</span>
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
        <a href='#features' className='className="text-sm font-medium text-gray-600 hover:underline underline-offset-4"'>Features</a>
        <a href='#about' className='className="text-sm font-medium text-gray-600 hover:underline underline-offset-4"'>About</a>
        <a href='#contact' className='className="text-sm font-medium text-gray-600 hover:underline underline-offset-4"'>Contact</a>
        <Link to='/login' >
        <span className="text-sm font-medium text-gray-600 hover:underline underline-offset-4">Login</span>
        </Link>
        <Link to='/signup' >
        <span className="text-sm font-medium text-gray-600 hover:underline underline-offset-4">Signup</span>
        </Link>

        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-gray-800 to-gray-100">
          <div className="container px-4 md:px-6 text-gray-100">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Streamline Your Event Management with <span className="text-gray-800 font-bold">Event Vista</span>
                  </h1>
                  <p className="max-w-[600px] text-gray-200 md:text-xl">
                    <span className="text-grey-500 font-bold">Event Vista</span> , an all-in-one event management system that simplifies the planning, registration, and evaluation process for event organizers and attendees.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  
                </div>
              </div>
              <img
                src={cllgimg}
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section id='features' className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div  className="inline-block rounded-lg bg-gray-200 px-3 py-1 text-sm text-gray-800">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Streamline Your Event Management</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  <span className="text-gray-800 font-bold">Event Vista</span> provides a comprehensive suite of tools to simplify the event planning, registration, and evaluation process for organizers and attendees.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  {[
                    {
                      title: 'Personalized Recommendations',
                      description: 'Event Vista uses your interests to provide personalized event recommendations, ensuring you never miss an event you\'ll love.',
                    },
                    {
                      title: 'Automated Notifications',
                      description: 'Stay up-to-date with event details and changes through automated notifications and announcements.',
                    },
                    {
                      title: 'Secure Payments',
                      description: 'Easily manage ticket sales and registrations with our secure payment processing system.',
                    },
                  ].map((feature, index) => (
                    <li key={index}>
                      <div className="grid gap-1">
                        <h3 className="text-xl font-bold">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <img
                src={cllgimg}
                width="550"
                height="310"
                alt="Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-200 px-3 py-1 text-sm text-gray-800">
                  About <span className="text-gray-800 font-bold">Event Vista</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Revolutionizing Event Management
                </h2>
                <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  <span className="text-gray-800 font-bold">Event Vista</span> was founded with the goal of simplifying the event planning and management process for organizers and attendees. Our comprehensive platform streamlines every aspect of event organization, from registration to post-event evaluation.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  
                </div>
              </div>
              <img
                src={cseimg}
                width="500"
                height="500"
                alt="About"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-200 px-3 py-1 text-sm text-gray-800">Contact Us</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get in Touch with Us</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Whether you have questions, need assistance, or want to learn more about our platform, our team is here to help.
                </p>
              </div>
              <form className="w-full max-w-lg space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <textarea
                  placeholder="Your Message"
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                  rows="4"
                />
                <button
                  type="submit"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-800 px-8 text-sm font-medium text-gray-100 shadow transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full bg-gray-800 py-6">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <span className="text-sm text-gray-400">
            © 2024 <span className="text-gray-100 font-bold">Event Vista</span>. All rights reserved.
          </span>
          <nav className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
            <Link to="#" className="text-sm font-medium text-gray-400 hover:underline">
              Terms of Service
            </Link>
            <Link to="#" className="text-sm font-medium text-gray-400 hover:underline">
              Privacy Policy
            </Link>
            <Link to="#" className="text-sm font-medium text-gray-400 hover:underline">
              Cookie Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

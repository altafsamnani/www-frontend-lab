<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
  <div class="bg-primary-700 py-16 sm:py-24 lg:py-32">
    <div class="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
      <div class="max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:col-span-7">
        <h2 class="inline sm:block lg:inline xl:block">Want product news and updates?</h2>
        {{ ' ' }}
        <p class="inline sm:block lg:inline xl:block">Sign up for our newsletter.</p>
      </div>
      <form class="w-full max-w-md lg:col-span-5 lg:pt-2">
        <div class="flex gap-x-4">
          <label for="email-address" class="sr-only">Email address</label>
          <input
            id="email-address"
            name="email"
            type="email"
            autocomplete="email"
            required=""
            class="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-white/10 ring-inset placeholder:text-white/75 focus:ring-2 focus:ring-white focus:ring-inset sm:text-sm sm:leading-6"
            placeholder="Enter your email"
          />
          <button
            type="submit"
            class="text-primary-600 hover:bg-primary-50 flex-none rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Subscribe
          </button>
        </div>
        <p class="text-surface-300 mt-4 text-sm leading-6">
          We care about your data. Read our
          <a href="#" class="hover:text-primary-50 font-semibold text-white">privacy&nbsp;policy</a
          >.
        </p>
      </form>
    </div>
  </div>
</template>

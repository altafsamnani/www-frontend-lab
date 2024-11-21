<template>
  <div>
    <section class="mb-32">
      <div id="map" class="relative h-[300px] overflow-hidden bg-cover bg-[50%] bg-no-repeat">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11672.945750644447!2d-122.42107853750231!3d37.7730507907087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858070cc2fbd55%3A0xa71491d736f62d5c!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1619524992238!5m2!1sen!2sus"
          width="100%" height="480" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
      </div>
      <div class="container px-6 md:px-12">
        <div
          class="block rounded-lg bg-[hsla(0,0%,100%,0.8)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]  md:py-16 md:px-12 -mt-[100px] backdrop-blur-[30px] border border-gray-300">
          <div class="flex flex-wrap">
            <div class="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6">
              <form>
                <div class="relative mb-6" data-te-input-wrapper-init>
                  <input type="text"
                    class="peer block min-h-[auto] w-full rounded border-2 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none "
                    id="exampleInput90" />
                  <label
                    class="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none "
                    for="exampleInput90">Name
                  </label>
                </div>
                <div class="relative mb-6" data-te-input-wrapper-init>
                  <input type="email"
                    class="peer block min-h-[auto] w-full rounded border-2 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none "
                    id="exampleInput91" />
                  <label
                    class="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none "
                    for="exampleInput91">Email address
                  </label>
                </div>
                <div class="relative mb-6" data-te-input-wrapper-init>
                  <textarea
                    class="peer block min-h-[auto] w-full rounded border-2 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none "
                    id="exampleFormControlTextarea1" rows="3"></textarea>
                  <label for="exampleFormControlTextarea1"
                    class="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none ">Message</label>
                </div>
                <div class="mb-6 inline-block min-h-[1.5rem] justify-center pl-[1.5rem] md:flex">
                  <input
                    class="relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent "
                    type="checkbox" value="" id="exampleCheck96" checked />
                  <label class="inline-block pl-[0.15rem] hover:cursor-pointer" for="exampleCheck96">
                    Send me a copy of this message
                  </label>
                </div>
                <button type="button"
                  class="mb-6 w-full rounded bg-sky-500 text-white px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal   lg:mb-0">
                  Send
                </button>
              </form>
            </div>
            <div class="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
              <div class="flex flex-wrap">
                <div class="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:w-6/12">
                  <div class="flex items-start">
                    <div class="srink-0">
                      <div class="inline-block rounded-md bg-sky-200 p-4 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                          stroke="currentColor" class="w-7 h-7">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                        </svg>
                      </div>
                    </div>
                    <div class="ml-6 grow">
                      <p class="mb-2 font-bold ">
                        Address
                      </p>
                      <p class="text-sm text-neutral-500">
                        Signal 84 <br>
                        1446 XA Purmerend <br>
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  class="mb-12 w-full shrink-0 grow-0 basis-auto md:mb-0 md:w-6/12 md:px-3 lg:mb-12 lg:w-full lg:px-6 xl:w-6/12">
                  <div class="align-start flex">
                    <div class="shrink-0">
                      <div class="inline-block rounded-md bg-sky-200 p-4 text-primary">
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" class="w-7 h-7"
                          viewBox="0 0 111.756 122.879" enable-background="new 0 0 111.756 122.879"
                          xml:space="preserve">
                          <g>
                            <path
                              d="M27.953,5.569v96.769h19.792V5.569H37.456H27.953L27.953,5.569z M21.898,105.123V2.785C21.898,1.247,23.254,0,24.926,0 h12.53h13.316C52.443,0,53.8,1.247,53.8,2.785v102.338c0,1.537-1.356,2.783-3.028,2.783H24.926 C23.254,107.906,21.898,106.66,21.898,105.123L21.898,105.123z M13.32,17.704c1.671,0,3.027,1.247,3.027,2.785 s-1.355,2.784-3.027,2.784H7.352c-0.161,0-0.292,0.022-0.39,0.064c-0.129,0.056-0.276,0.166-0.429,0.325 c-0.161,0.167-0.281,0.346-0.353,0.528c-0.083,0.208-0.125,0.465-0.125,0.759v90.803c0,0.287,0.043,0.537,0.125,0.74l0.034,0.092 c0.068,0.135,0.165,0.264,0.284,0.383c0.126,0.125,0.258,0.217,0.39,0.27c0.123,0.051,0.279,0.074,0.466,0.074h97.052 c0.188,0,0.346-0.025,0.467-0.074c0.133-0.053,0.264-0.145,0.389-0.27c3.035-3.035,0.441,1.799,0.441-1.215V24.949 c0-3.667,3.039,2.357-0.477-1.288c-0.143-0.146-0.287-0.254-0.43-0.314c-0.113-0.048-0.246-0.075-0.391-0.075H62.563 c-1.672,0-3.027-1.247-3.027-2.784s1.355-2.785,3.027-2.785h41.842c1.041,0,2.029,0.204,2.943,0.597 c0.895,0.385,1.699,0.945,2.393,1.663c0.664,0.686,1.17,1.468,1.514,2.334c0.332,0.839,0.502,1.726,0.502,2.652v90.803 c0,0.938-0.168,1.826-0.502,2.654c-0.344,0.859-0.865,1.639-1.549,2.324c-0.701,0.703-1.506,1.234-2.398,1.598 c-0.906,0.367-1.879,0.551-2.902,0.551H7.352c-1.022,0-1.995-0.184-2.901-0.551c-0.894-0.363-1.698-0.896-2.399-1.598 c-0.621-0.623-1.107-1.33-1.45-2.107c-0.036-0.07-0.069-0.143-0.099-0.217C0.168,117.574,0,116.684,0,115.752V24.949 c0-0.921,0.17-1.811,0.504-2.652c0.342-0.863,0.849-1.648,1.512-2.334c0.683-0.707,1.488-1.263,2.393-1.652 c0.929-0.401,1.917-0.607,2.943-0.607H13.32L13.32,17.704z M65.902,29.03h27.049c0.803,0,1.566,0.145,2.291,0.431 c0.076,0.03,0.15,0.063,0.223,0.099c0.607,0.269,1.166,0.635,1.666,1.096c0.584,0.533,1.027,1.128,1.326,1.782 c0.047,0.104,0.088,0.21,0.119,0.317c0.225,0.584,0.34,1.189,0.34,1.812v12.611c0,0.744-0.156,1.45-0.459,2.118l-0.004,0.009 l0.004,0.002c-0.291,0.64-0.725,1.224-1.291,1.75c-0.58,0.546-1.227,0.956-1.932,1.231c-0.736,0.287-1.5,0.426-2.283,0.426H65.902 c-0.777,0-1.535-0.14-2.27-0.426c-0.693-0.269-1.33-0.668-1.912-1.198c-0.588-0.539-1.031-1.144-1.326-1.81 c-0.033-0.078-0.063-0.157-0.09-0.235c-0.234-0.605-0.35-1.228-0.35-1.867V34.567c0-0.723,0.146-1.424,0.445-2.099l-0.006-0.002 c0.295-0.666,0.738-1.271,1.326-1.81l0.037-0.032l-0.002-0.001c0.877-0.78,2.039-1.219,2.119-1.244 C64.537,29.147,65.215,29.03,65.902,29.03L65.902,29.03z M93.475,34.599h-28.08v12.547h28.08V34.599L93.475,34.599z M78.877,63.42 c1.072,0,2.01,0.41,2.807,1.207s1.188,1.734,1.188,2.785c0,1.148-0.389,2.104-1.188,2.865c-0.799,0.758-1.734,1.129-2.807,1.129 c-1.129,0-2.084-0.371-2.844-1.129c-0.76-0.762-1.148-1.717-1.148-2.865c0-1.051,0.391-1.988,1.148-2.785 S77.748,63.42,78.877,63.42L78.877,63.42z M90.977,63.42c1.072,0,2.008,0.41,2.805,1.207s1.189,1.734,1.189,2.785 c0,1.148-0.391,2.104-1.189,2.865c-0.799,0.758-1.732,1.129-2.805,1.129c-1.131,0-2.086-0.371-2.846-1.129 c-0.76-0.762-1.148-1.717-1.148-2.865c0-1.051,0.391-1.988,1.148-2.785S89.846,63.42,90.977,63.42L90.977,63.42z M66.662,75.518 c1.15,0,2.105,0.389,2.865,1.148s1.129,1.715,1.129,2.865c0,1.051-0.371,1.988-1.129,2.785s-1.715,1.209-2.865,1.209 c-1.053,0-1.988-0.412-2.785-1.209s-1.209-1.734-1.209-2.785c0-1.15,0.41-2.105,1.209-2.865S65.609,75.518,66.662,75.518 L66.662,75.518z M78.877,75.518c1.072,0,2.008,0.389,2.807,1.148s1.188,1.715,1.188,2.865c0,1.051-0.391,1.988-1.188,2.785 s-1.734,1.209-2.807,1.209c-1.129,0-2.086-0.412-2.844-1.209s-1.148-1.734-1.148-2.785c0-1.15,0.389-2.105,1.148-2.865 S77.748,75.518,78.877,75.518L78.877,75.518z M90.977,75.518c1.072,0,2.006,0.389,2.805,1.148s1.189,1.715,1.189,2.865 c0,1.051-0.393,1.988-1.189,2.785s-1.732,1.209-2.805,1.209c-1.131,0-2.088-0.412-2.846-1.209s-1.148-1.734-1.148-2.785 c0-1.15,0.389-2.105,1.148-2.865S89.846,75.518,90.977,75.518L90.977,75.518z M66.662,87.518c1.15,0,2.107,0.393,2.865,1.189 s1.129,1.773,1.129,2.922c0,1.053-0.369,1.988-1.129,2.787s-1.715,1.207-2.865,1.207c-1.053,0-1.986-0.408-2.785-1.207 s-1.209-1.734-1.209-2.787c0-1.148,0.412-2.125,1.209-2.922S65.609,87.518,66.662,87.518L66.662,87.518z M78.877,87.518 c1.072,0,2.01,0.393,2.807,1.189s1.188,1.773,1.188,2.922c0,1.053-0.389,1.988-1.188,2.787s-1.734,1.207-2.807,1.207 c-1.129,0-2.084-0.408-2.844-1.207s-1.148-1.734-1.148-2.787c0-1.148,0.391-2.125,1.148-2.922S77.748,87.518,78.877,87.518 L78.877,87.518z M90.977,87.518c1.072,0,2.008,0.393,2.805,1.189s1.189,1.773,1.189,2.922c0,1.053-0.391,1.988-1.189,2.787 s-1.732,1.207-2.805,1.207c-1.131,0-2.086-0.408-2.846-1.207s-1.148-1.734-1.148-2.787c0-1.148,0.391-2.125,1.148-2.922 S89.846,87.518,90.977,87.518L90.977,87.518z M78.877,99.617c1.072,0,2.008,0.389,2.807,1.188s1.188,1.734,1.188,2.807 c0,1.129-0.389,2.084-1.188,2.844s-1.734,1.148-2.807,1.148c-1.129,0-2.084-0.389-2.844-1.148s-1.148-1.715-1.148-2.844 c0-1.072,0.389-2.008,1.148-2.807S77.748,99.617,78.877,99.617L78.877,99.617z M66.662,63.42c1.15,0,2.107,0.41,2.865,1.207 s1.129,1.734,1.129,2.785c0,1.148-0.369,2.104-1.129,2.865c-0.76,0.758-1.715,1.129-2.865,1.129c-1.053,0-1.986-0.371-2.785-1.129 c-0.799-0.762-1.209-1.717-1.209-2.865c0-1.051,0.412-1.988,1.209-2.785S65.609,63.42,66.662,63.42L66.662,63.42z" />
                          </g>
                        </svg>

                      </div>
                    </div>
                    <div class="ml-6 grow">
                      <p class="mb-2 font-bold ">Warehouse/RMA return address:</p>
                      <p class="text-sm text-neutral-500">
                        Network 120 <br>
                        1446 WR Purmerend <br>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:mb-12 xl:w-6/12">
                  <div class="align-start flex">
                    <div class="shrink-0">
                      <div class="inline-block rounded-md bg-sky-200 p-4 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                          stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                        </svg>
                      </div>
                    </div>
                    <div class="ml-6 grow">
                      <p class="mb-2 font-bold ">Land Line</p>
                      <p class="text-neutral-500"> 0031 299 666 662
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="bg-white">
      <div v-for="staff in staffs" :key="staff.department" class="mx-auto  px-6 lg:px-8  py-8 sm:py-8">
        <div class="mx-auto max-w-7xl lg:mx-0">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ staff.department }}</h2>
          <p class="mt-6 text-lg leading-8 text-gray-600">{{ staff.description }}</p>
        </div>
        <ul role="list"
          class="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <li v-for="person in staff.people" :key="person.name">
            <img class="aspect-[3/2] w-full rounded-2xl object-cover" :src="person.imageUrl" alt="" />
            <h3 class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{{ person.name }}</h3>
            <p class="text-base leading-7 text-gray-600">{{ person.role }}</p>
            <p class="mt-4 text-base leading-7 text-gray-600">{{ person.bio }}</p>
            <p class="mt-4 text-sm leading-6 text-gray-500"><i class="pi pi-mobile"></i>
              <span class=" overflow-y overflow-x-hidden break-words" v-if="person.phone">{{ person.phone }} {{
                person.phone2 }}</span>

            </p>
            <p v-if="person.email" class="text-sm leading-6 text-gray-500"><i class="pi pi-envelope"></i> {{
              person.email }}</p>
            <ul role="list" class="mt-3 flex gap-x-6">
              <li>
                <a :href="person.xUrl" class="text-gray-400 hover:text-gray-500">
                  <span class="sr-only">X</span>
                  <svg class="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
                  </svg>
                </a>
              </li>
              <li>
                <a :href="person.linkedinUrl" class="text-gray-400 hover:text-gray-500">
                  <span class="sr-only">LinkedIn</span>
                  <svg class="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                      clip-rule="evenodd" />
                  </svg>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
const staffs = [
  {
    department: 'Internal Sales',
    description: 'Our Internal Sales Department is dedicated to driving business growth and success. Led by experienced professionals, they provide expert advice and support to our internal teams. With a deep understanding of our products and services, they help our clients achieve their security goals.',
    people: [
      {
        name: 'Luc Otten',
        role: 'Co-Founder / Head of Internal Sales',
        imageUrl:
          '/images/team/luc.jpeg',
        xUrl: '#',
        linkedinUrl: '#',
        phone: '0299 ​​666 662 (option 1 06 86 865 095)',
        email: 'luc.otten@osec.nl',
        bio: 'As the Head of Internal Sales at osec B.V., Luc Otten leads our sales team to drive growth, provide expert support, and exceed client expectations."'
      },
      {
        name: 'Ryan Beentjes',
        role: 'Staff',
        imageUrl:
          '/images/team/ryan.jpeg',
        xUrl: '#',
        linkedinUrl: '#',
        phone: '0299 ​​666 662 (option 1 06 86 865 095)',
        phone2: '06 86 865 095',
        email: 'r.beentjes@osec.nl',
        bio: 'Meet Ryan Beentjes, our Internal Sales Staff professional at osec B.V. With a passion for security and customer satisfaction, they provide expert guidance and support to our clients, ensuring they find the right solutions for their needs."'
      },
      {
        name: 'Steve Soetekouw',
        role: 'Staff',
        imageUrl:'/images/team/steve.jpeg',
        xUrl: '#',
        linkedinUrl: '#',
        phone: '0299 ​​666 662 option 1',
        email: 's.soetekouw@osec.nl',
        bio: 'Say hello to Steve Soetekouw, our Internal Sales Staff expert at osec B.V. With a deep understanding of security solutions, they work closely with clients to understand their requirements and provide tailored recommendations for their success."'
      },
      {
        name: 'Nathan de Vries',
        role: 'Internal Fire Department',
        imageUrl:
          '/images/team/nathan.jpeg',
        xUrl: '#',
        linkedinUrl: '#',
        phone: '0299 ​​666 662 option 5',
        phone2: '06 23 978 416',
        email: 'n.dvries@osec.nl',
        bio: 'At osec B.V., our Internal Sales Team of the Internal Fire Department is dedicated to providing expert guidance and support to our clients. With a deep understanding of fire safety solutions, they work closely with our internal teams to ensure their needs are met and their success is achieved.'
      },
    ]
  },

  {
    department: 'Sales Field Service',
    description: 'Our Sales Field Service department at osec B.V. is dedicated to providing exceptional customer service and support. With a team of highly skilled professionals, they work closely with our clients to ensure their satisfaction and success. From installation and training to ongoing support, our Sales Field Service team is committed to delivering the highest level of service and expertise.',
    people: [
      {
        name: 'Sander van Wijk',
        role: 'Account manager',
        imageUrl:
          '/images/team/sander.jpeg',
        xUrl: '#',
        linkedinUrl: '#',
        phone: '06 52 336 202',
        email: 's.vanwijk@osec.nl',
        bio: 'Say hello to Sander van Wijk, our Sales Field Service Account Manager at osec B.V. With a focus on customer satisfaction and a commitment to excellence, they work tirelessly to ensure our clients achieve their security goals."'
      },
      {
        name: 'Wesley Kloppenburg',
        role: 'Account manager',
        imageUrl:
          '/images/team/wesley.jpeg',
        xUrl: '#',
        linkedinUrl: '#',
        phone: '06 12 293 865',
        email: 'w.kloppenburg@osec.nl',
        bio: 'Meet Wesley Kloppenburg, our Sales Field Service Account Manager at osec B.V. With a passion for security and a knack for building relationships, they provide exceptional customer service and deliver tailored solutions to our clients.'
      },
      {
        name: 'Wim Jonker',
        role: 'Account manager',
        imageUrl:
          '/images/team/wim.jpeg',
        xUrl: '#',
        linkedinUrl: '#',
        phone: '06 30 162 551',
        email: 'w.jonker@osec.nl',
        bio: 'At osec B.V., Wim Jonker is the Sales Field Service Account Manager. With a proven track record of success, they are dedicated to building strong relationships with clients and delivering top-notch service.'
      },
      {
        name: 'Marco Kramer',
        role: 'Fire specialist',
        imageUrl:
          '/images/team/marco.jpeg',
        xUrl: '#',
        linkedinUrl: '#',
        phone: '06 51 526 436',
        email: 'm.kramer@osec.nl',
        bio: 'Meet our Fire Specialist at osec B.V., ensuring compliance and safety. Their expertise in fire safety solutions guarantees client satisfaction and protection, making us a trusted partner for fire safety needs.'
      },
      {
        name: 'Richard Robert',
        role: 'Sales manager',
        imageUrl:
          '/images/team/richard.jpeg',
        xUrl: '#',
        linkedinUrl: '#',
        phone: '06 30 238 653',
        email: 'r.robert@osec.nl',
        bio: 'At osec B.V., our Sales Manager Richard Robert is responsible for leading and managing the Sales team. With a focus on building strong relationships, they drive sales growth, provide exceptional customer service, and ensure client satisfaction. Their expertise and leadership enable us to achieve our sales goals and deliver high-quality products and services to our clients.'
      },
      {
        name: 'Dennis Joor',
        role: 'Account manager / Fire specialist',
        imageUrl:
          '/images/team/dennis.jpeg',
        xUrl: '#',
        linkedinUrl: '#',
        phone: '06 10 548 204',
        email: 'd.joor@osec.nl',
        bio: 'At osec B.V., our Account Manager and Fire Specialist collaborate to provide expert guidance and tailored fire safety solutions, ensuring client satisfaction and safety compliance.'
      },

    ]
  },
  {
    department: 'General',
    description: 'Our General department is responsible for managing day-to-day operations and ensuring the smooth functioning of the company. Led by experienced professionals, they handle administrative tasks, manage resources, and provide support to all departments. Their expertise and dedication enable us to deliver high-quality products and services to our clients.',
    people: [
      {
        name: 'Paula Roelvink',
        role: 'Administration',
        imageUrl:
          '/images/team/paula.jpeg',
        xUrl: '#',
        linkedinUrl: '#',
        phone: '0299 ​​666 662 option 3',
        email: 'p.roelvink@osec.nl',
        bio: 'At osec B.V., our Administration team is responsible for managing day-to-day operations and ensuring the smooth functioning of the company. They handle administrative tasks, manage resources, and provide support to all departments, enabling us to deliver high-quality products and services to our clients.'
      },
      {
        name: 'Diane de Kruijff',
        role: 'Human Resources',
        imageUrl:
          '/images/team/diane.jpeg',
        xUrl: '#',
        linkedinUrl: '#',
        phone: '0299 ​​666 662 option 3',
        email: 'd.dekruijff@osec.nl',
        bio: 'At osec B.V., our Human Resources team is dedicated to supporting our employees, fostering a positive work environment, and ensuring their well-being. They handle recruitment, onboarding, employee relations, and training, helping our team members grow and thrive.'
      },
      {
        name: 'Frank Hoffer',
        role: 'Purchase',
        imageUrl:
          '/images/team/frank.jpeg',
        xUrl: '#',
        linkedinUrl: '#',
        phone: '06 12 882 373',
        email: 'f.hoffer@osec.nl',
        bio: '"At osec B.V., our Purchase Manager oversees the procurement process, ensuring timely and efficient sourcing of materials and products. With a focus on cost control and quality, they work closely with suppliers to secure the best deals and deliver high-quality goods to our clients.'
      },
      {
        name: 'David Harmsen',
        role: 'Purchase',
        imageUrl:
          '/images/team/david.jpeg',
        xUrl: '#',
        linkedinUrl: '#',
        phone: '06 20 883 406',
        email: 'd.harmsen@osec.nl',
        bio: 'As a Purchase Assistant at osec B.V., you play a vital role in supporting the procurement team. With a keen eye for detail and a passion for improving efficiency, you assist in managing the purchase orders and ensure smooth communication with suppliers, ensuring a seamless supply chain.'
      },
    ]
  },
  {
    department: 'Technology',
    description: 'We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the best results for our clients.',
    people: [
      {
        name: 'Conrad Maayen',
        role: 'CTO ',
        imageUrl:
          '/images/team/conrad.png',
        xUrl: '#',
        linkedinUrl: '#',
        phone: '0299 666 662 option 2',
        email: 'c.maayen@osec.nl',
        bio: 'As the CTO at osec B.V., Conrad Maayen leads our technical strategy, drives innovation, and ensures our technology solutions align with business goals, enabling us to stay ahead in the industry.'
      },
      {
        name: 'Altaf Samnani',
        role: 'Lead developer ',
        imageUrl:
          '/images/team/altaf.jpeg',
        xUrl: '#',
        linkedinUrl: '#',
        phone: '0299 666 662 option 2',
        email: 'a.samnani@osec.nl',
        bio: 'As the Lead Developer at osec B.V., Altaf Samnani leads and drives software development, and ensures high-quality code delivery, fostering innovation and excellence in our projects."'
      },
    ]
  },
  {
    department: 'Meet our leadership',
    description: 'Meet the leadership team at osec B.V. Our founder/CEO, Erwin Otten, drives innovation and excellence in security solutions. Supported by a dedicated team of experts, we are committed to providing top-notch service. Together, we lead with passion and expertise to meet your security needs.',
    people: [
      {
        name: 'Erwin Otten',
        role: 'Founder / CEO',
        imageUrl:
          '/images/team/erwin.jpeg',
        xUrl: '#',
        linkedinUrl: '#',
        phone: '0299 ​​666 662 (option 1 06 86 865 095)',
        email: 'e.otten@osec.nl',
        bio: 'Meet Erwin Otten, the visionary leader behind osec B.V. With a passion for innovation and a drive to make a positive impact'
      }
    ]
  },
];

</script>
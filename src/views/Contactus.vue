<template>
  <div class="flex flex-col gap-y-12 pb-12">
    <div
      class="from-primary-50 to-surface-100 ring-surface-900/5 dark:from-surface-800 dark:via-surface-900 dark:to-surface-800 overflow-hidden rounded-3xl bg-gradient-to-br via-white ring-1 dark:ring-white/10"
    >
      <div class="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <h2 class="text-primary-600 dark:text-primary-400 text-base leading-7 font-semibold">
          {{ t('contact.eyebrow') }}
        </h2>
        <h1
          class="text-surface-900 dark:text-surface-0 mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
        >
          {{ t('contact.title') }}
        </h1>
        <p class="text-surface-600 dark:text-surface-400 mt-6 max-w-2xl text-lg leading-8">
          {{ t('contact.subtitle') }}
        </p>
        <div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div class="flex items-start gap-x-4">
            <div
              class="bg-primary-600/10 text-primary-600 dark:text-primary-400 flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
            >
              <i class="pi pi-building text-lg"></i>
            </div>
            <div>
              <p class="text-surface-900 dark:text-surface-0 font-semibold">
                {{ t('contact.addressTitle') }}
              </p>
              <p class="text-surface-600 dark:text-surface-400 mt-1 text-sm leading-6">
                Signal 84<br />1446 XA Purmerend
              </p>
            </div>
          </div>
          <div class="flex items-start gap-x-4">
            <div
              class="bg-primary-600/10 text-primary-600 dark:text-primary-400 flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
            >
              <i class="pi pi-box text-lg"></i>
            </div>
            <div>
              <p class="text-surface-900 dark:text-surface-0 font-semibold">
                {{ t('contact.warehouseTitle') }}
              </p>
              <p class="text-surface-600 dark:text-surface-400 mt-1 text-sm leading-6">
                Network 120<br />1446 WR Purmerend
              </p>
            </div>
          </div>
          <div class="flex items-start gap-x-4">
            <div
              class="bg-primary-600/10 text-primary-600 dark:text-primary-400 flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
            >
              <i class="pi pi-phone text-lg"></i>
            </div>
            <div>
              <p class="text-surface-900 dark:text-surface-0 font-semibold">
                {{ t('contact.phoneTitle') }}
              </p>
              <p class="text-surface-600 dark:text-surface-400 mt-1 text-sm leading-6">
                0031 299 666 662
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div
        class="bg-surface-50 ring-surface-900/5 dark:bg-surface-800/50 rounded-3xl p-8 ring-1 dark:ring-white/10"
      >
        <h2 class="text-surface-900 dark:text-surface-0 text-xl font-semibold">
          {{ t('contact.form.title') }}
        </h2>
        <vee-form
          class="mt-6 flex flex-col gap-6"
          :validation-schema="validationSchema"
          @submit="handleSubmit"
        >
          <div class="flex flex-col gap-2">
            <label for="name" class="text-surface-900 dark:text-surface-0 font-medium"
              >{{ t('contact.form.name') }} *</label
            >
            <vee-field as="InputText" name="name" id="name" class="w-full" maxlength="100" />
            <ErrorMessage class="error text-sm text-red-500" name="name" />
          </div>
          <div class="flex flex-col gap-2">
            <label for="email" class="text-surface-900 dark:text-surface-0 font-medium"
              >{{ t('contact.form.email') }} *</label
            >
            <vee-field as="InputText" name="email" id="email" class="w-full" maxlength="100" />
            <ErrorMessage class="error text-sm text-red-500" name="email" />
          </div>
          <div class="flex flex-col gap-2">
            <label for="message" class="text-surface-900 dark:text-surface-0 font-medium"
              >{{ t('contact.form.message') }} *</label
            >
            <vee-field as="Textarea" name="message" id="message" rows="5" class="w-full" />
            <ErrorMessage class="error text-sm text-red-500" name="message" />
          </div>
          <Button type="submit">{{ t('contact.form.send') }}</Button>
        </vee-form>
      </div>
      <div
        class="ring-surface-900/5 min-h-[24rem] overflow-hidden rounded-3xl ring-1 dark:ring-white/10"
      >
        <iframe
          src="https://maps.google.com/maps?q=Signaal%2084%2C%201446%20XA%20Purmerend%2C%20Netherlands&z=15&output=embed"
          class="h-full w-full border-0"
          allowfullscreen
          loading="lazy"
        ></iframe>
      </div>
    </div>

    <div class="flex flex-col gap-y-12">
      <div
        v-for="staff in staffs"
        :key="staff.department"
        class="mx-auto w-full max-w-7xl px-6 lg:px-8"
      >
        <div class="mx-auto lg:mx-0">
          <h2 class="text-primary-600 dark:text-primary-400 text-base leading-7 font-semibold">
            {{ t('contact.teamEyebrow') }}
          </h2>
          <p
            class="text-surface-900 dark:text-surface-0 mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {{ staff.department }}
          </p>
          <p class="text-surface-600 dark:text-surface-400 mt-6 text-lg leading-8">
            {{ staff.description }}
          </p>
        </div>
        <ul
          role="list"
          class="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          <li v-for="person in staff.people" :key="person.name">
            <img
              class="ring-surface-900/10 aspect-[3/2] w-full rounded-2xl object-cover ring-1 dark:ring-white/10"
              :src="person.imageUrl"
              alt=""
            />
            <h3
              class="text-surface-900 dark:text-surface-0 mt-6 text-lg leading-8 font-semibold tracking-tight"
            >
              {{ person.name }}
            </h3>
            <p class="text-surface-600 dark:text-surface-400 text-base leading-7">
              {{ person.role }}
            </p>
            <p class="text-surface-600 dark:text-surface-400 mt-4 text-base leading-7">
              {{ person.bio }}
            </p>
            <p class="text-surface-500 dark:text-surface-400 mt-4 text-sm leading-6">
              <i class="pi pi-mobile"></i>
              <span class="overflow-y overflow-x-hidden break-words" v-if="person.phone"
                >{{ person.phone }} {{ person.phone2 }}</span
              >
            </p>
            <p v-if="person.email" class="text-surface-500 dark:text-surface-400 text-sm leading-6">
              <i class="pi pi-envelope"></i> {{ person.email }}
            </p>
            <ul role="list" class="mt-3 flex gap-x-6">
              <li>
                <a
                  :href="person.xUrl"
                  class="text-surface-400 hover:text-surface-500 dark:hover:text-surface-300"
                >
                  <span class="sr-only">X</span>
                  <svg class="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  :href="person.linkedinUrl"
                  class="text-surface-400 hover:text-surface-500 dark:hover:text-surface-300"
                >
                  <span class="sr-only">LinkedIn</span>
                  <svg class="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                      clip-rule="evenodd"
                    />
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
  import { reactive } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useNotifyStore, NotificationType } from '@/stores/notify'
  import type { ContactForm } from '@/types/ContactForm'

  const { t } = useI18n()
  const notifyStore = useNotifyStore()

  const validationSchema = reactive({
    name: 'required|min:2|max:100',
    email: 'required|email',
    message: 'required|min:10|max:2000',
  })

  const handleSubmit = (values: ContactForm, { resetForm }: { resetForm: () => void }) => {
    notifyStore.notify(t('contact.messages.sendSuccess'), NotificationType.Success)
    resetForm()
  }

  const staffs = [
    {
      department: 'Internal Sales',
      description:
        'Our Internal Sales Department is dedicated to driving business growth and success. Led by experienced professionals, they provide expert advice and support to our internal teams. With a deep understanding of our products and services, they help our clients achieve their security goals.',
      people: [
        {
          name: 'Luc Otten',
          role: 'Co-Founder / Head of Internal Sales',
          imageUrl: '/images/team/luc.jpeg',
          xUrl: '#',
          linkedinUrl: '#',
          phone: '0299 ​​666 662 (option 1 06 86 865 095)',
          email: 'luc.otten@osec.nl',
          bio: 'As the Head of Internal Sales at osec B.V., Luc Otten leads our sales team to drive growth, provide expert support, and exceed client expectations."',
        },
        {
          name: 'Ryan Beentjes',
          role: 'Staff',
          imageUrl: '/images/team/ryan.jpeg',
          xUrl: '#',
          linkedinUrl: '#',
          phone: '0299 ​​666 662 (option 1 06 86 865 095)',
          phone2: '06 86 865 095',
          email: 'r.beentjes@osec.nl',
          bio: 'Meet Ryan Beentjes, our Internal Sales Staff professional at osec B.V. With a passion for security and customer satisfaction, they provide expert guidance and support to our clients, ensuring they find the right solutions for their needs."',
        },
        {
          name: 'Steve Soetekouw',
          role: 'Staff',
          imageUrl: '/images/team/steve.jpeg',
          xUrl: '#',
          linkedinUrl: '#',
          phone: '0299 ​​666 662 option 1',
          email: 's.soetekouw@osec.nl',
          bio: 'Say hello to Steve Soetekouw, our Internal Sales Staff expert at osec B.V. With a deep understanding of security solutions, they work closely with clients to understand their requirements and provide tailored recommendations for their success."',
        },
        {
          name: 'Nathan de Vries',
          role: 'Internal Fire Department',
          imageUrl: '/images/team/nathan.jpeg',
          xUrl: '#',
          linkedinUrl: '#',
          phone: '0299 ​​666 662 option 5',
          phone2: '06 23 978 416',
          email: 'n.dvries@osec.nl',
          bio: 'At osec B.V., our Internal Sales Team of the Internal Fire Department is dedicated to providing expert guidance and support to our clients. With a deep understanding of fire safety solutions, they work closely with our internal teams to ensure their needs are met and their success is achieved.',
        },
      ],
    },

    {
      department: 'Sales Field Service',
      description:
        'Our Sales Field Service department at osec B.V. is dedicated to providing exceptional customer service and support. With a team of highly skilled professionals, they work closely with our clients to ensure their satisfaction and success. From installation and training to ongoing support, our Sales Field Service team is committed to delivering the highest level of service and expertise.',
      people: [
        {
          name: 'Sander van Wijk',
          role: 'Account manager',
          imageUrl: '/images/team/sander.jpeg',
          xUrl: '#',
          linkedinUrl: '#',
          phone: '06 52 336 202',
          email: 's.vanwijk@osec.nl',
          bio: 'Say hello to Sander van Wijk, our Sales Field Service Account Manager at osec B.V. With a focus on customer satisfaction and a commitment to excellence, they work tirelessly to ensure our clients achieve their security goals."',
        },
        {
          name: 'Wesley Kloppenburg',
          role: 'Account manager',
          imageUrl: '/images/team/wesley.jpeg',
          xUrl: '#',
          linkedinUrl: '#',
          phone: '06 12 293 865',
          email: 'w.kloppenburg@osec.nl',
          bio: 'Meet Wesley Kloppenburg, our Sales Field Service Account Manager at osec B.V. With a passion for security and a knack for building relationships, they provide exceptional customer service and deliver tailored solutions to our clients.',
        },
        {
          name: 'Wim Jonker',
          role: 'Account manager',
          imageUrl: '/images/team/wim.jpeg',
          xUrl: '#',
          linkedinUrl: '#',
          phone: '06 30 162 551',
          email: 'w.jonker@osec.nl',
          bio: 'At osec B.V., Wim Jonker is the Sales Field Service Account Manager. With a proven track record of success, they are dedicated to building strong relationships with clients and delivering top-notch service.',
        },
        {
          name: 'Marco Kramer',
          role: 'Fire specialist',
          imageUrl: '/images/team/marco.jpeg',
          xUrl: '#',
          linkedinUrl: '#',
          phone: '06 51 526 436',
          email: 'm.kramer@osec.nl',
          bio: 'Meet our Fire Specialist at osec B.V., ensuring compliance and safety. Their expertise in fire safety solutions guarantees client satisfaction and protection, making us a trusted partner for fire safety needs.',
        },
        {
          name: 'Richard Robert',
          role: 'Sales manager',
          imageUrl: '/images/team/richard.jpeg',
          xUrl: '#',
          linkedinUrl: '#',
          phone: '06 30 238 653',
          email: 'r.robert@osec.nl',
          bio: 'At osec B.V., our Sales Manager Richard Robert is responsible for leading and managing the Sales team. With a focus on building strong relationships, they drive sales growth, provide exceptional customer service, and ensure client satisfaction. Their expertise and leadership enable us to achieve our sales goals and deliver high-quality products and services to our clients.',
        },
        {
          name: 'Dennis Joor',
          role: 'Account manager / Fire specialist',
          imageUrl: '/images/team/dennis.jpeg',
          xUrl: '#',
          linkedinUrl: '#',
          phone: '06 10 548 204',
          email: 'd.joor@osec.nl',
          bio: 'At osec B.V., our Account Manager and Fire Specialist collaborate to provide expert guidance and tailored fire safety solutions, ensuring client satisfaction and safety compliance.',
        },
      ],
    },
    {
      department: 'General',
      description:
        'Our General department is responsible for managing day-to-day operations and ensuring the smooth functioning of the company. Led by experienced professionals, they handle administrative tasks, manage resources, and provide support to all departments. Their expertise and dedication enable us to deliver high-quality products and services to our clients.',
      people: [
        {
          name: 'Paula Roelvink',
          role: 'Administration',
          imageUrl: '/images/team/paula.jpeg',
          xUrl: '#',
          linkedinUrl: '#',
          phone: '0299 ​​666 662 option 3',
          email: 'p.roelvink@osec.nl',
          bio: 'At osec B.V., our Administration team is responsible for managing day-to-day operations and ensuring the smooth functioning of the company. They handle administrative tasks, manage resources, and provide support to all departments, enabling us to deliver high-quality products and services to our clients.',
        },
        {
          name: 'Diane de Kruijff',
          role: 'Human Resources',
          imageUrl: '/images/team/diane.jpeg',
          xUrl: '#',
          linkedinUrl: '#',
          phone: '0299 ​​666 662 option 3',
          email: 'd.dekruijff@osec.nl',
          bio: 'At osec B.V., our Human Resources team is dedicated to supporting our employees, fostering a positive work environment, and ensuring their well-being. They handle recruitment, onboarding, employee relations, and training, helping our team members grow and thrive.',
        },
        {
          name: 'Frank Hoffer',
          role: 'Purchase',
          imageUrl: '/images/team/frank.jpeg',
          xUrl: '#',
          linkedinUrl: '#',
          phone: '06 12 882 373',
          email: 'f.hoffer@osec.nl',
          bio: '"At osec B.V., our Purchase Manager oversees the procurement process, ensuring timely and efficient sourcing of materials and products. With a focus on cost control and quality, they work closely with suppliers to secure the best deals and deliver high-quality goods to our clients.',
        },
        {
          name: 'David Harmsen',
          role: 'Purchase',
          imageUrl: '/images/team/david.jpeg',
          xUrl: '#',
          linkedinUrl: '#',
          phone: '06 20 883 406',
          email: 'd.harmsen@osec.nl',
          bio: 'As a Purchase Assistant at osec B.V., you play a vital role in supporting the procurement team. With a keen eye for detail and a passion for improving efficiency, you assist in managing the purchase orders and ensure smooth communication with suppliers, ensuring a seamless supply chain.',
        },
      ],
    },
    {
      department: 'Technology',
      description:
        'We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the best results for our clients.',
      people: [
        {
          name: 'Conrad Maayen',
          role: 'CTO ',
          imageUrl: '/images/team/conrad.png',
          xUrl: '#',
          linkedinUrl: '#',
          phone: '0299 666 662 option 2',
          email: 'c.maayen@osec.nl',
          bio: 'As the CTO at osec B.V., Conrad Maayen leads our technical strategy, drives innovation, and ensures our technology solutions align with business goals, enabling us to stay ahead in the industry.',
        },
        {
          name: 'Altaf Samnani',
          role: 'Lead developer ',
          imageUrl: '/images/team/altaf.jpeg',
          xUrl: '#',
          linkedinUrl: '#',
          phone: '0299 666 662 option 2',
          email: 'a.samnani@osec.nl',
          bio: 'As the Lead Developer at osec B.V., Altaf Samnani leads and drives software development, and ensures high-quality code delivery, fostering innovation and excellence in our projects."',
        },
      ],
    },
    {
      department: 'Meet our leadership',
      description:
        'Meet the leadership team at osec B.V. Our founder/CEO, Erwin Otten, drives innovation and excellence in security solutions. Supported by a dedicated team of experts, we are committed to providing top-notch service. Together, we lead with passion and expertise to meet your security needs.',
      people: [
        {
          name: 'Erwin Otten',
          role: 'Founder / CEO',
          imageUrl: '/images/team/erwin.jpeg',
          xUrl: '#',
          linkedinUrl: '#',
          phone: '0299 ​​666 662 (option 1 06 86 865 095)',
          email: 'e.otten@osec.nl',
          bio: 'Meet Erwin Otten, the visionary leader behind osec B.V. With a passion for innovation and a drive to make a positive impact',
        },
      ],
    },
  ]
</script>

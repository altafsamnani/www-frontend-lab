<template>
  <div class="manuals-container">
    <!-- Header -->
    <header class="manuals-header">
      <h1>Product Documentation</h1>
      <p>Browse manuals, software, firmware, and technical documents</p>
    </header>

    <!-- Filters Section -->
    <div class="filters-section">
      <div class="filter-header">
        <h3>Filter by Category</h3>
        <button @click="clearFilters" class="btn-clear">Clear All</button>
      </div>

      <div class="filter-chips" v-if="selectedCategories.length > 0">
        <span
          v-for="cat in selectedCategories"
          :key="cat"
          class="chip"
          @click="toggleCategory(cat)"
        >
          {{ cat }} ×
        </span>
      </div>

      <div class="category-filters">
        <label v-for="category in categories" :key="category.slug" class="category-item">
          <input
            type="checkbox"
            :value="category.slug"
            v-model="selectedCategories"
            @change="filterDocuments"
          />
          <span>{{ category.name }}</span>
          <span class="count">({{ category.count }})</span>
        </label>
      </div>
    </div>

    <!-- Main Content -->
    <div class="content-wrapper">
      <!-- Empty State -->
      <div
        v-if="
          filteredDocuments.manual.length === 0 &&
          filteredDocuments.software.length === 0 &&
          filteredDocuments.firmware.length === 0 &&
          filteredDocuments.document.length === 0
        "
        class="empty-state"
      >
        <div class="empty-icon">📭</div>
        <h2>No Documents Found</h2>
        <p>Try adjusting your filters or check back later for new content.</p>
        <button @click="clearFilters" class="btn-primary">Clear Filters</button>
      </div>

      <!-- Manuals Section -->
      <section v-if="filteredDocuments.manual.length > 0" class="document-section">
        <div class="section-header">
          <div class="section-title">
            <span class="icon">📖</span>
            <h2>Manuals</h2>
            <span class="badge">{{ filteredDocuments.manual.length }}</span>
          </div>
        </div>

        <div class="documents-grid">
          <div
            v-for="doc in paginatedDocuments(filteredDocuments.manual)"
            :key="doc.id"
            class="document-card"
          >
            <div class="card-header">
              <img :src="doc.icon" :alt="doc.name" class="doc-icon" />
              <div class="doc-info">
                <h3>{{ doc.name }}</h3>
                <div class="metadata">
                  <span v-if="doc.version" class="meta-item">
                    <span class="meta-label">Version:</span> {{ doc.version }}
                  </span>
                  <span v-if="doc.versionUpdate" class="meta-item">
                    <span class="meta-label">Updated:</span> {{ formatDate(doc.versionUpdate) }}
                  </span>
                </div>
              </div>
            </div>

            <div class="card-footer">
              <div class="file-info">
                <span class="file-type">{{ doc.extension.toUpperCase() }}</span>
                <span v-if="doc.size > 0" class="file-size">{{ formatFileSize(doc.size) }}</span>
              </div>
              <div class="actions">
                <button @click="openDocument(doc.url)" class="btn-view">View</button>
                <button @click="downloadDocument(doc.url, doc.name)" class="btn-download">
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Software Section -->
      <section v-if="filteredDocuments.software.length > 0" class="document-section">
        <div class="section-header">
          <div class="section-title">
            <span class="icon">💻</span>
            <h2>Software</h2>
            <span class="badge">{{ filteredDocuments.software.length }}</span>
          </div>
        </div>

        <div class="documents-grid">
          <div
            v-for="doc in paginatedDocuments(filteredDocuments.software)"
            :key="doc.id"
            class="document-card"
          >
            <div class="card-header">
              <img :src="doc.icon" :alt="doc.name" class="doc-icon" />
              <div class="doc-info">
                <h3>{{ doc.name }}</h3>
                <div class="metadata">
                  <span v-if="doc.version" class="meta-item">
                    <span class="meta-label">Version:</span> {{ doc.version }}
                  </span>
                  <span v-if="doc.platformType" class="meta-item">
                    <span class="meta-label">Platform:</span> {{ doc.platformType }}
                  </span>
                </div>
              </div>
            </div>

            <div class="card-footer">
              <div class="file-info">
                <span class="file-type">{{ doc.extension.toUpperCase() }}</span>
                <span v-if="doc.size > 0" class="file-size">{{ formatFileSize(doc.size) }}</span>
              </div>
              <div class="actions">
                <button @click="openDocument(doc.url)" class="btn-view">View</button>
                <button @click="downloadDocument(doc.url, doc.name)" class="btn-download">
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Firmware Section -->
      <section v-if="filteredDocuments.firmware.length > 0" class="document-section">
        <div class="section-header">
          <div class="section-title">
            <span class="icon">🔧</span>
            <h2>Firmware</h2>
            <span class="badge">{{ filteredDocuments.firmware.length }}</span>
          </div>
        </div>

        <div class="documents-grid">
          <div
            v-for="doc in paginatedDocuments(filteredDocuments.firmware)"
            :key="doc.id"
            class="document-card"
          >
            <div class="card-header">
              <img :src="doc.icon" :alt="doc.name" class="doc-icon" />
              <div class="doc-info">
                <h3>{{ doc.name }}</h3>
                <div class="metadata">
                  <span v-if="doc.version" class="meta-item">
                    <span class="meta-label">Version:</span> {{ doc.version }}
                  </span>
                  <span v-if="doc.versionUpdate" class="meta-item">
                    <span class="meta-label">Updated:</span> {{ formatDate(doc.versionUpdate) }}
                  </span>
                </div>
              </div>
            </div>

            <div class="card-footer">
              <div class="file-info">
                <span class="file-type">{{ doc.extension.toUpperCase() }}</span>
                <span v-if="doc.size > 0" class="file-size">{{ formatFileSize(doc.size) }}</span>
              </div>
              <div class="actions">
                <button @click="openDocument(doc.url)" class="btn-view">View</button>
                <button @click="downloadDocument(doc.url, doc.name)" class="btn-download">
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Documents Section -->
      <section v-if="filteredDocuments.document.length > 0" class="document-section">
        <div class="section-header">
          <div class="section-title">
            <span class="icon">📄</span>
            <h2>Documents</h2>
            <span class="badge">{{ filteredDocuments.document.length }}</span>
          </div>
        </div>

        <div class="documents-grid">
          <div
            v-for="doc in paginatedDocuments(filteredDocuments.document)"
            :key="doc.id"
            class="document-card"
          >
            <div class="card-header">
              <img :src="doc.icon" :alt="doc.name" class="doc-icon" />
              <div class="doc-info">
                <h3>{{ doc.name }}</h3>
                <div class="metadata">
                  <span v-if="doc.versionUpdate" class="meta-item">
                    <span class="meta-label">Updated:</span> {{ formatDate(doc.versionUpdate) }}
                  </span>
                </div>
              </div>
            </div>

            <div class="card-footer">
              <div class="file-info">
                <span class="file-type">{{ doc.extension.toUpperCase() }}</span>
                <span v-if="doc.size > 0" class="file-size">{{ formatFileSize(doc.size) }}</span>
              </div>
              <div class="actions">
                <button @click="openDocument(doc.url)" class="btn-view">View</button>
                <button @click="downloadDocument(doc.url, doc.name)" class="btn-download">
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="pagination">
        <button @click="currentPage--" :disabled="currentPage === 1" class="btn-page">
          Previous
        </button>

        <span class="page-info">Page {{ currentPage }} of {{ totalPages }}</span>

        <button @click="currentPage++" :disabled="currentPage === totalPages" class="btn-page">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'

  interface Document {
    id: number
    fileCollectionId: number
    type: string
    name: string
    icon: string
    url: string
    publishedAt: string | null
    deletedAt: string | null
    platformType: string | null
    notificationType: number
    notificationText: string
    version: string
    versionUpdate: string
    extension: string
    size: number
    changelog: string
    category: string
  }

  interface Category {
    slug: string
    name: string
    count: number
  }

  // Demo data
  const demoDocuments = ref<{
    manual: Document[]
    software: Document[]
    firmware: Document[]
    document: Document[]
  }>({
    manual: [
      {
        id: 1,
        fileCollectionId: 188,
        type: 'manual',
        name: 'W&T Web I/O User Manual',
        icon: 'http://localhost/images/defaults/default_pdf.png',
        url: 'http://localhost/files/manual/wut/manual-web-oi4.0e-5773m-10-prus-129.pdf',
        publishedAt: null,
        deletedAt: null,
        platformType: null,
        notificationType: 0,
        notificationText: '',
        version: '1.29',
        versionUpdate: '2018-11-01',
        extension: 'pdf',
        size: 2048576,
        changelog: '',
        category: 'io-modules-534',
      },
      {
        id: 2,
        fileCollectionId: 189,
        type: 'manual',
        name: 'Industrial Ethernet Switch Manual',
        icon: 'http://localhost/images/defaults/default_pdf.png',
        url: 'http://localhost/files/manual/switch-manual-v2.pdf',
        publishedAt: null,
        deletedAt: null,
        platformType: null,
        notificationType: 1,
        notificationText: 'Updated',
        version: '2.5',
        versionUpdate: '2024-01-15',
        extension: 'pdf',
        size: 3145728,
        changelog: '',
        category: 'networking-equipment',
      },
      {
        id: 3,
        fileCollectionId: 190,
        type: 'manual',
        name: 'PLC Controller Guide',
        icon: 'http://localhost/images/defaults/default_pdf.png',
        url: 'http://localhost/files/manual/plc-guide.pdf',
        publishedAt: null,
        deletedAt: null,
        platformType: null,
        notificationType: 0,
        notificationText: '',
        version: '3.1',
        versionUpdate: '2023-09-20',
        extension: 'pdf',
        size: 4194304,
        changelog: '',
        category: 'io-modules-534',
      },
    ],
    software: [
      {
        id: 101,
        fileCollectionId: 201,
        type: 'software',
        name: 'Configuration Tool Windows',
        icon: 'http://localhost/images/defaults/default_exe.png',
        url: 'http://localhost/files/software/config-tool-win.exe',
        publishedAt: null,
        deletedAt: null,
        platformType: 'Windows 10/11',
        notificationType: 0,
        notificationText: '',
        version: '5.2.1',
        versionUpdate: '2024-03-10',
        extension: 'exe',
        size: 52428800,
        changelog: '',
        category: 'io-modules-534',
      },
      {
        id: 102,
        fileCollectionId: 202,
        type: 'software',
        name: 'Network Management Suite',
        icon: 'http://localhost/images/defaults/default_exe.png',
        url: 'http://localhost/files/software/network-mgmt.exe',
        publishedAt: null,
        deletedAt: null,
        platformType: 'Windows/Linux',
        notificationType: 2,
        notificationText: 'Beta Version',
        version: '1.0-beta',
        versionUpdate: '2024-02-28',
        extension: 'zip',
        size: 104857600,
        changelog: '',
        category: 'networking-equipment',
      },
    ],
    firmware: [
      {
        id: 201,
        fileCollectionId: 301,
        type: 'firmware',
        name: 'Web I/O Firmware Update',
        icon: 'http://localhost/images/defaults/default_bin.png',
        url: 'http://localhost/files/firmware/webio-fw-v2.bin',
        publishedAt: null,
        deletedAt: null,
        platformType: null,
        notificationType: 3,
        notificationText: 'Critical Update',
        version: '2.4.5',
        versionUpdate: '2024-03-25',
        extension: 'bin',
        size: 8388608,
        changelog: 'Security fixes and performance improvements',
        category: 'io-modules-534',
      },
      {
        id: 202,
        fileCollectionId: 302,
        type: 'firmware',
        name: 'Switch Firmware v3.2',
        icon: 'http://localhost/images/defaults/default_bin.png',
        url: 'http://localhost/files/firmware/switch-fw-v32.bin',
        publishedAt: null,
        deletedAt: null,
        platformType: null,
        notificationType: 0,
        notificationText: '',
        version: '3.2.0',
        versionUpdate: '2024-01-18',
        extension: 'bin',
        size: 16777216,
        changelog: '',
        category: 'networking-equipment',
      },
    ],
    document: [
      {
        id: 301,
        fileCollectionId: 401,
        type: 'document',
        name: 'Quick Start Guide',
        icon: 'http://localhost/images/defaults/default_pdf.png',
        url: 'http://localhost/files/docs/quick-start.pdf',
        publishedAt: null,
        deletedAt: null,
        platformType: null,
        notificationType: 0,
        notificationText: '',
        version: '',
        versionUpdate: '2024-02-01',
        extension: 'pdf',
        size: 512000,
        changelog: '',
        category: 'io-modules-534',
      },
      {
        id: 302,
        fileCollectionId: 402,
        type: 'document',
        name: 'Technical Specifications',
        icon: 'http://localhost/images/defaults/default_pdf.png',
        url: 'http://localhost/files/docs/tech-specs.pdf',
        publishedAt: null,
        deletedAt: null,
        platformType: null,
        notificationType: 0,
        notificationText: '',
        version: '',
        versionUpdate: '2023-12-15',
        extension: 'pdf',
        size: 1024000,
        changelog: '',
        category: 'networking-equipment',
      },
      {
        id: 303,
        fileCollectionId: 403,
        type: 'document',
        name: 'Safety Instructions',
        icon: 'http://localhost/images/defaults/default_pdf.png',
        url: 'http://localhost/files/docs/safety.pdf',
        publishedAt: null,
        deletedAt: null,
        platformType: null,
        notificationType: 1,
        notificationText: 'Important',
        version: '',
        versionUpdate: '2024-03-01',
        extension: 'pdf',
        size: 768000,
        changelog: '',
        category: 'io-modules-534',
      },
    ],
  })

  const categories = ref<Category[]>([
    { slug: 'io-modules-534', name: 'I/O Modules', count: 5 },
    { slug: 'networking-equipment', name: 'Networking Equipment', count: 4 },
  ])

  const selectedCategories = ref<string[]>([])
  const currentPage = ref(1)
  const itemsPerPage = ref(10)

  const filteredDocuments = computed(() => {
    if (selectedCategories.value.length === 0) {
      return demoDocuments.value
    }

    return {
      manual: demoDocuments.value.manual.filter((doc) =>
        selectedCategories.value.includes(doc.category)
      ),
      software: demoDocuments.value.software.filter((doc) =>
        selectedCategories.value.includes(doc.category)
      ),
      firmware: demoDocuments.value.firmware.filter((doc) =>
        selectedCategories.value.includes(doc.category)
      ),
      document: demoDocuments.value.document.filter((doc) =>
        selectedCategories.value.includes(doc.category)
      ),
    }
  })

  const totalPages = computed(() => {
    const totalItems =
      filteredDocuments.value.manual.length +
      filteredDocuments.value.software.length +
      filteredDocuments.value.firmware.length +
      filteredDocuments.value.document.length
    return Math.ceil(totalItems / itemsPerPage.value)
  })

  const paginatedDocuments = (docs: Document[]) => {
    return docs
  }

  const toggleCategory = (category: string) => {
    const index = selectedCategories.value.indexOf(category)
    if (index > -1) {
      selectedCategories.value.splice(index, 1)
    } else {
      selectedCategories.value.push(category)
    }
    filterDocuments()
  }

  const clearFilters = () => {
    selectedCategories.value = []
    currentPage.value = 1
  }

  const filterDocuments = () => {
    currentPage.value = 1
  }

  const openDocument = (url: string) => {
    window.open(url, '_blank')
  }

  const downloadDocument = (url: string, filename: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const formatDate = (dateString: string): string => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  onMounted(() => {
    console.log('Manuals2 page loaded with demo data')
  })
</script>

<style scoped>
  .manuals-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 40px 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  /* Header */
  .manuals-header {
    margin-bottom: 40px;
    text-align: center;
  }

  .manuals-header h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 10px;
  }

  .manuals-header p {
    font-size: 1.1rem;
    color: #666;
  }

  /* Filters Section */
  .filters-section {
    background: #f8f9fa;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 40px;
  }

  .filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .filter-header h3 {
    font-size: 1.3rem;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0;
  }

  .btn-clear {
    background: none;
    border: 1px solid #dc3545;
    color: #dc3545;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.2s;
  }

  .btn-clear:hover {
    background: #dc3545;
    color: white;
  }

  .filter-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
  }

  .chip {
    background: #007bff;
    color: white;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .chip:hover {
    background: #0056b3;
  }

  .category-filters {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 12px;
  }

  .category-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px;
    background: white;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .category-item:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .category-item input[type='checkbox'] {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }

  .category-item span {
    flex: 1;
    font-size: 1rem;
    color: #333;
  }

  .category-item .count {
    color: #999;
    font-size: 0.9rem;
  }

  /* Content Wrapper */
  .content-wrapper {
    min-height: 400px;
  }

  /* Empty State */
  .empty-state {
    text-align: center;
    padding: 80px 20px;
  }

  .empty-icon {
    font-size: 5rem;
    margin-bottom: 20px;
  }

  .empty-state h2 {
    font-size: 1.8rem;
    color: #1a1a1a;
    margin-bottom: 10px;
  }

  .empty-state p {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 30px;
  }

  /* Document Sections */
  .document-section {
    margin-bottom: 60px;
  }

  .section-header {
    margin-bottom: 24px;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .section-title .icon {
    font-size: 2rem;
  }

  .section-title h2 {
    font-size: 1.8rem;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0;
  }

  .badge {
    background: #e9ecef;
    color: #495057;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 0.9rem;
    font-weight: 600;
  }

  /* Documents Grid */
  .documents-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 24px;
  }

  .document-card {
    background: white;
    border: 1px solid #dee2e6;
    border-radius: 12px;
    padding: 20px;
    transition: all 0.3s;
  }

  .document-card:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    transform: translateY(-4px);
    border-color: #007bff;
  }

  .card-header {
    display: flex;
    gap: 16px;
    margin-bottom: 20px;
  }

  .doc-icon {
    width: 64px;
    height: 64px;
    object-fit: contain;
    flex-shrink: 0;
  }

  .doc-info {
    flex: 1;
    min-width: 0;
  }

  .doc-info h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0 0 10px 0;
    line-height: 1.4;
  }

  .metadata {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .meta-item {
    font-size: 0.85rem;
    color: #6c757d;
  }

  .meta-label {
    font-weight: 600;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 16px;
    border-top: 1px solid #e9ecef;
  }

  .file-info {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .file-type {
    background: #f8f9fa;
    color: #495057;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  .file-size {
    font-size: 0.85rem;
    color: #6c757d;
  }

  .actions {
    display: flex;
    gap: 8px;
  }

  .btn-view,
  .btn-download {
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
  }

  .btn-view {
    background: #f8f9fa;
    color: #495057;
  }

  .btn-view:hover {
    background: #e9ecef;
  }

  .btn-download {
    background: #007bff;
    color: white;
  }

  .btn-download:hover {
    background: #0056b3;
  }

  .btn-primary {
    background: #007bff;
    color: white;
    padding: 12px 32px;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
  }

  .btn-primary:hover {
    background: #0056b3;
  }

  /* Pagination */
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 40px;
    padding: 20px;
  }

  .btn-page {
    padding: 10px 20px;
    border: 1px solid #dee2e6;
    background: white;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 500;
    transition: all 0.2s;
  }

  .btn-page:hover:not(:disabled) {
    background: #007bff;
    color: white;
    border-color: #007bff;
  }

  .btn-page:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .page-info {
    font-size: 1rem;
    color: #495057;
    font-weight: 500;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .manuals-header h1 {
      font-size: 2rem;
    }

    .documents-grid {
      grid-template-columns: 1fr;
    }

    .category-filters {
      grid-template-columns: 1fr;
    }

    .filter-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }

    .actions {
      flex-direction: column;
      width: 100%;
    }

    .btn-view,
    .btn-download {
      width: 100%;
    }
  }
</style>

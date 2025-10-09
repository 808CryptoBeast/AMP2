/**
 * Hawaiian Dictionary - Interactive Hawaiian Language Reference
 * Features:
 * - 100+ Hawaiian words with meanings, pronunciations, and examples
 * - Multiple category filtering
 * - Compact card layout with detailed view
 * - Search functionality
 * - Favorites system
 * - Responsive design
 */

document.addEventListener('DOMContentLoaded', () => {
  class HawaiianDictionary {
    constructor() {
      // DOM Elements
      this.elements = {
        container: document.querySelector('.dictionary-terms'),
        title: document.querySelector('.term-title'),
        emoji: document.querySelector('.term-emoji'),
        pronunciation: document.querySelector('.term-pronunciation'),
        meaning: document.querySelector('.term-meaning'),
        example: document.querySelector('.term-example'),
        filters: document.querySelectorAll('.filter-btn'),
        searchInput: document.querySelector('.dictionary-search input'),
        clearSearch: document.querySelector('.clear-search'),
        favoritesToggle: document.querySelector('.toggle-favorites')
      };

      // State
      this.state = {
        terms: this.getAllTerms(),
        favorites: JSON.parse(localStorage.getItem('hawiianDictFavorites')) || [],
        showFavorites: false,
        currentCategory: 'all',
        searchQuery: ''
      };

      // Initialize
      this.init();
    }

    init() {
      // Set up event listeners
      this.setupEventListeners();
      
      // Render initial view
      this.renderTerms();
      
      // Show first term details if available
      if (this.getFilteredTerms().length > 0) {
        this.showTermDetails(this.getFilteredTerms()[0]);
      }
    }

    // Event Listeners
    setupEventListeners() {
      // Filter buttons
      this.elements.filters.forEach(btn => {
        btn.addEventListener('click', () => {
          this.state.currentCategory = btn.dataset.category;
          this.state.showFavorites = false;
          this.updateActiveFilter();
          this.renderTerms();
        });
      });

      // Search input
      this.elements.searchInput.addEventListener('input', (e) => {
        this.state.searchQuery = e.target.value.toLowerCase();
        this.renderTerms();
      });

      // Clear search
      this.elements.clearSearch?.addEventListener('click', () => {
        this.state.searchQuery = '';
        this.elements.searchInput.value = '';
        this.renderTerms();
      });

      // Favorites toggle
      this.elements.favoritesToggle?.addEventListener('click', () => {
        this.state.showFavorites = !this.state.showFavorites;
        this.elements.favoritesToggle.classList.toggle('active', this.state.showFavorites);
        this.renderTerms();
      });
    }

    // Term Data - Expanded with 100+ terms
    getAllTerms() {
      return [
        // Common Terms (20)
        { term: 'Aloha', emoji: '🤙', meaning: 'Love, affection, peace, compassion, mercy', pronunciation: 'ah-LOH-hah', category: 'common' },
        { term: 'Mahalo', emoji: '🙏', meaning: 'Thanks, gratitude, appreciation', pronunciation: 'mah-HAH-loh', category: 'common' },
        { term: 'ʻOhana', emoji: '👨‍👩‍👧‍👦', meaning: 'Family (including extended family and close friends)', pronunciation: 'oh-HAH-nah', category: 'common' },
        { term: 'Pono', emoji: '⚖️', meaning: 'Righteousness, balance, moral quality', pronunciation: 'POH-noh', category: 'common' },
        { term: 'Keiki', emoji: '👶', meaning: 'Child, children, offspring', pronunciation: 'KAY-kee', category: 'common' },
        { term: 'Kupuna', emoji: '🧓', meaning: 'Grandparent, ancestor, elder', pronunciation: 'koo-POO-nah', category: 'common' },
        { term: 'Hale', emoji: '🏠', meaning: 'House, building, institution', pronunciation: 'HAH-leh', category: 'common' },
        { term: 'Lanai', emoji: '🌴', meaning: 'Porch, veranda, balcony', pronunciation: 'lah-NAI', category: 'common' },
        { term: 'Mauka', emoji: '⛰️', meaning: 'Toward the mountains', pronunciation: 'MAU-kah', category: 'common' },
        { term: 'Makai', emoji: '🌊', meaning: 'Toward the sea', pronunciation: 'mah-KAI', category: 'common' },
        { term: 'Wikiwiki', emoji: '⚡', meaning: 'Quick, fast, speedy', pronunciation: 'vee-kee-VEE-kee', category: 'common' },
        { term: 'Kokua', emoji: '🤝', meaning: 'Help, assistance, cooperation', pronunciation: 'koh-KOO-ah', category: 'common' },
        { term: 'Pau', emoji: '✅', meaning: 'Finished, done, completed', pronunciation: 'POW', category: 'common' },
        { term: 'Hana', emoji: '🛠️', meaning: 'Work, labor, job', pronunciation: 'HAH-nah', category: 'common' },
        { term: 'Maikaʻi', emoji: '👍', meaning: 'Good, fine, well', pronunciation: 'my-KAH-ee', category: 'common' },
        { term: 'Pilikia', emoji: '⚠️', meaning: 'Trouble, problem, difficulty', pronunciation: 'pee-LEE-kee-ah', category: 'common' },
        { term: 'A hui hou', emoji: '👋', meaning: 'Until we meet again', pronunciation: 'ah HOO-ee HOH', category: 'common' },
        { term: 'E komo mai', emoji: '🚪', meaning: 'Welcome, come in', pronunciation: 'eh KOH-moh mai', category: 'common' },
        { term: 'ʻAʻole', emoji: '❌', meaning: 'No, not, never', pronunciation: 'ah-OH-leh', category: 'common' },
        { term: 'ʻAe', emoji: '✔️', meaning: 'Yes, to agree', pronunciation: 'AH-eh', category: 'common' },

        // Greetings (15)
        { term: 'Aloha kakahiaka', emoji: '🌅', meaning: 'Good morning', pronunciation: 'ah-LOH-hah kah-kah-hee-AH-kah', category: 'greeting' },
        { term: 'Aloha awakea', emoji: '☀️', meaning: 'Good midday (10am-2pm)', pronunciation: 'ah-LOH-hah ah-vah-KAY-ah', category: 'greeting' },
        { term: 'Aloha ʻauinalā', emoji: '🌇', meaning: 'Good afternoon (2pm-6pm)', pronunciation: 'ah-LOH-hah ah-wee-nah-LAH', category: 'greeting' },
        { term: 'Aloha ahiahi', emoji: '🌃', meaning: 'Good evening', pronunciation: 'ah-LOH-hah ah-hee-AH-hee', category: 'greeting' },
        { term: 'Aloha pō', emoji: '🌌', meaning: 'Good night', pronunciation: 'ah-LOH-hah POH', category: 'greeting' },
        { term: 'Pehea ʻoe?', emoji: '💬', meaning: 'How are you?', pronunciation: 'peh-HEH-ah OH-eh', category: 'greeting' },
        { term: 'Maikaʻi no au', emoji: '😊', meaning: 'I am fine', pronunciation: 'my-KAH-ee noh ow', category: 'greeting' },
        { term: 'ʻAʻole pilikia', emoji: '🙂', meaning: 'No problem/You\'re welcome', pronunciation: 'ah-OH-leh pee-LEE-kee-ah', category: 'greeting' },
        { term: 'E pili mau nā pōmaikaʻi me ʻoe', emoji: '🍀', meaning: 'Blessings be with you', pronunciation: 'eh PEE-lee mau nah poh-my-KAH-ee meh OH-eh', category: 'greeting' },
        { term: 'Aloha nui loa', emoji: '❤️', meaning: 'Much love', pronunciation: 'ah-LOH-hah NOO-ee LOH-ah', category: 'greeting' },
        { term: 'No ke aha?', emoji: '❓', meaning: 'Why? For what reason?', pronunciation: 'noh keh AH-ha', category: 'greeting' },
        { term: 'Hele mai', emoji: '👉', meaning: 'Come here', pronunciation: 'HEH-leh mai', category: 'greeting' },
        { term: 'Hele aku', emoji: '👈', meaning: 'Go away', pronunciation: 'HEH-leh AH-koo', category: 'greeting' },
        { term: 'E kala mai iaʻu', emoji: '😔', meaning: 'Excuse me/Forgive me', pronunciation: 'eh KAH-lah mai ee-AH-oo', category: 'greeting' },
        { term: 'Hauʻoli lā hānau', emoji: '🎂', meaning: 'Happy birthday', pronunciation: 'how-OH-lee lah HAH-now', category: 'greeting' },

        // Nature (20)
        { term: 'ʻĀina', emoji: '🏝️', meaning: 'Land, earth, that which feeds', pronunciation: 'AH-ee-nah', category: 'nature' },
        { term: 'Kai', emoji: '🌊', meaning: 'Sea, salt water', pronunciation: 'KAI', category: 'nature' },
        { term: 'Mauna', emoji: '🗻', meaning: 'Mountain', pronunciation: 'MOW-nah', category: 'nature' },
        { term: 'Pali', emoji: '🏞️', meaning: 'Cliff, precipice', pronunciation: 'PAH-lee', category: 'nature' },
        { term: 'Lua', emoji: '🌋', meaning: 'Pit, crater, volcano', pronunciation: 'LOO-ah', category: 'nature' },
        { term: 'Nalu', emoji: '🏄', meaning: 'Wave, surf', pronunciation: 'NAH-loo', category: 'nature' },
        { term: 'Ua', emoji: '🌧️', meaning: 'Rain', pronunciation: 'OO-ah', category: 'nature' },
        { term: 'Lā', emoji: '☀️', meaning: 'Sun, day', pronunciation: 'LAH', category: 'nature' },
        { term: 'Mahina', emoji: '🌙', meaning: 'Moon, month', pronunciation: 'mah-HEE-nah', category: 'nature' },
        { term: 'Nā hōkū', emoji: '✨', meaning: 'Stars', pronunciation: 'nah HOH-koo', category: 'nature' },
        { term: 'Makani', emoji: '🌬️', meaning: 'Wind', pronunciation: 'mah-KAH-nee', category: 'nature' },
        { term: 'Wai', emoji: '💧', meaning: 'Fresh water', pronunciation: 'VAI', category: 'nature' },
        { term: 'Moana', emoji: '🌊', meaning: 'Ocean', pronunciation: 'moh-AH-nah', category: 'nature' },
        { term: 'Pōhaku', emoji: '🪨', meaning: 'Rock, stone', pronunciation: 'POH-hah-koo', category: 'nature' },
        { term: 'One', emoji: '🏖️', meaning: 'Sand, beach', pronunciation: 'OH-neh', category: 'nature' },
        { term: 'Nahele', emoji: '🌲', meaning: 'Forest, woods', pronunciation: 'nah-HEH-leh', category: 'nature' },
        { term: 'Lāʻau', emoji: '🌳', meaning: 'Tree, plant, medicine', pronunciation: 'LAH-ow', category: 'nature' },
        { term: 'Pua', emoji: '🌸', meaning: 'Flower', pronunciation: 'POO-ah', category: 'nature' },
        { term: 'ʻĀnuenue', emoji: '🌈', meaning: 'Rainbow', pronunciation: 'AH-noo-eh-NOO-eh', category: 'nature' },
        { term: 'Pō', emoji: '🌑', meaning: 'Night, darkness', pronunciation: 'POH', category: 'nature' },

        // Cultural Terms (20)
        { term: 'Hula', emoji: '💃', meaning: 'Traditional Hawaiian dance', pronunciation: 'HOO-lah', category: 'cultural' },
        { term: 'Mele', emoji: '🎵', meaning: 'Song, chant, poetry', pronunciation: 'MEH-leh', category: 'cultural' },
        { term: 'Lei', emoji: '🌸', meaning: 'Garland, wreath (of flowers, leaves, etc.)', pronunciation: 'LAY', category: 'cultural' },
        { term: 'Luau', emoji: '🍍', meaning: 'Hawaiian feast, party', pronunciation: 'LOO-au', category: 'cultural' },
        { term: 'Kuleana', emoji: '🏋️', meaning: 'Responsibility, privilege', pronunciation: 'koo-leh-AH-nah', category: 'cultural' },
        { term: 'Mālama', emoji: '🌱', meaning: 'To care for, protect', pronunciation: 'MAH-lah-mah', category: 'cultural' },
        { term: 'Kapu', emoji: '🚫', meaning: 'Taboo, prohibition, sacred', pronunciation: 'KAH-poo', category: 'cultural' },
        { term: 'Mana', emoji: '✨', meaning: 'Supernatural or divine power', pronunciation: 'MAH-nah', category: 'cultural' },
        { term: 'Hoʻoponopono', emoji: '🕊️', meaning: 'Traditional conflict resolution process', pronunciation: 'ho-oh-poh-noh-POH-noh', category: 'cultural' },
        { term: 'ʻIke', emoji: '🧠', meaning: 'Knowledge, understanding', pronunciation: 'EE-keh', category: 'cultural' },
        { term: 'Aloha ʻāina', emoji: '❤️🏝️', meaning: 'Love of the land', pronunciation: 'ah-LOH-hah AH-ee-nah', category: 'cultural' },
        { term: 'Haumāna', emoji: '🎓', meaning: 'Student', pronunciation: 'how-MAH-nah', category: 'cultural' },
        { term: 'Kumu', emoji: '👩‍🏫', meaning: 'Teacher, source, foundation', pronunciation: 'KOO-moo', category: 'cultural' },
        { term: 'Lōkahi', emoji: '🕊️', meaning: 'Unity, agreement, harmony', pronunciation: 'LOH-kah-hee', category: 'cultural' },
        { term: 'ʻŌlelo Hawaiʻi', emoji: '🗣️', meaning: 'Hawaiian language', pronunciation: 'oh-LEH-loh ha-VAI-ee', category: 'cultural' },
        { term: 'Pule', emoji: '🙏', meaning: 'Prayer, blessing', pronunciation: 'POO-leh', category: 'cultural' },
        { term: 'Hōʻike', emoji: '🎭', meaning: 'Show, exhibition, demonstration', pronunciation: 'HOH-ee-keh', category: 'cultural' },
        { term: 'ʻAhaʻaina', emoji: '🍽️', meaning: 'Feast, banquet', pronunciation: 'ah-hah-AI-nah', category: 'cultural' },
        { term: 'Hānai', emoji: '👶', meaning: 'Adopted child, foster child', pronunciation: 'HAH-nai', category: 'cultural' },
        { term: 'ʻOhana hānai', emoji: '👨‍👩‍👧‍👦', meaning: 'Adopted/foster family', pronunciation: 'oh-HAH-nah HAH-nai', category: 'cultural' },

        // Food Terms (15)
        { term: 'Poi', emoji: '🍠', meaning: 'Pounded taro root', pronunciation: 'POY', category: 'food' },
        { term: 'Poke', emoji: '🍣', meaning: 'Diced raw fish salad', pronunciation: 'POH-keh', category: 'food' },
        { term: 'Kalua', emoji: '🐖', meaning: 'Traditional underground oven cooking', pronunciation: 'kah-LOO-ah', category: 'food' },
        { term: 'Lau lau', emoji: '🍃', meaning: 'Pork wrapped in taro leaves', pronunciation: 'LAU LAU', category: 'food' },
        { term: 'Haupia', emoji: '🍮', meaning: 'Coconut pudding', pronunciation: 'how-PEE-ah', category: 'food' },
        { term: 'Pūpū', emoji: '🍤', meaning: 'Appetizer, snack', pronunciation: 'POO-POO', category: 'food' },
        { term: 'ʻOno', emoji: '😋', meaning: 'Delicious, tasty', pronunciation: 'OH-noh', category: 'food' },
        { term: 'Pipikaula', emoji: '🥩', meaning: 'Hawaiian beef jerky', pronunciation: 'pee-pee-KOW-lah', category: 'food' },
        { term: 'Lomi lomi salmon', emoji: '🐟', meaning: 'Traditional salmon salad', pronunciation: 'LOH-mee LOH-mee SAH-mohn', category: 'food' },
        { term: 'Kōʻala', emoji: '🍍', meaning: 'Pineapple', pronunciation: 'KOH-ah-lah', category: 'food' },
        { term: 'ʻUlu', emoji: '🍞', meaning: 'Breadfruit', pronunciation: 'OO-loo', category: 'food' },
        { term: 'Kūlolo', emoji: '🍮', meaning: 'Taro and coconut pudding', pronunciation: 'koo-LOH-loh', category: 'food' },
        { term: 'Manapua', emoji: '🥟', meaning: 'Hawaiian version of bao (steamed bun)', pronunciation: 'mah-nah-POO-ah', category: 'food' },
        { term: 'Malasada', emoji: '🍩', meaning: 'Portuguese donut', pronunciation: 'mah-lah-SAH-dah', category: 'food' },
        { term: 'Shave ice', emoji: '🍧', meaning: 'Hawaiian style snow cone', pronunciation: 'SHAYV AIS', category: 'food' },

        // Animals (15)
        { term: 'Honu', emoji: '🐢', meaning: 'Green sea turtle', pronunciation: 'HOH-noo', category: 'animals' },
        { term: 'Naiʻa', emoji: '🐬', meaning: 'Dolphin', pronunciation: 'nah-EE-ah', category: 'animals' },
        { term: 'Manō', emoji: '🦈', meaning: 'Shark', pronunciation: 'mah-NOH', category: 'animals' },
        { term: 'ʻIʻiwi', emoji: '🐦', meaning: 'Scarlet honeycreeper (bird)', pronunciation: 'ee-EE-vee', category: 'animals' },
        { term: 'Pueo', emoji: '🦉', meaning: 'Hawaiian owl', pronunciation: 'poo-EH-oh', category: 'animals' },
        { term: 'ʻIlio', emoji: '🐕', meaning: 'Dog', pronunciation: 'EE-lee-oh', category: 'animals' },
        { term: 'Pōpoki', emoji: '🐈', meaning: 'Cat', pronunciation: 'POH-poh-kee', category: 'animals' },
        { term: 'Moʻo', emoji: '🦎', meaning: 'Lizard, dragon, water spirit', pronunciation: 'MOH-oh', category: 'animals' },
        { term: 'ʻŌpeʻapeʻa', emoji: '🦇', meaning: 'Hawaiian hoary bat', pronunciation: 'oh-peh-AH-peh-AH', category: 'animals' },
        { term: 'ʻIo', emoji: '🦅', meaning: 'Hawaiian hawk', pronunciation: 'EE-oh', category: 'animals' },
        { term: 'Nēnē', emoji: '🦢', meaning: 'Hawaiian goose', pronunciation: 'NEH-neh', category: 'animals' },
        { term: 'ʻŌʻō', emoji: '🐦', meaning: 'Hawaiian honeyeater (extinct)', pronunciation: 'OH-oh', category: 'animals' },
        { term: 'ʻElepaio', emoji: '🐦', meaning: 'Hawaiian flycatcher', pronunciation: 'eh-leh-PAI-oh', category: 'animals' },
        { term: 'ʻAmakihi', emoji: '🐦', meaning: 'Hawaiian honeycreeper', pronunciation: 'ah-mah-KEE-hee', category: 'animals' },
        { term: 'Hīhīmanu', emoji: '🐠', meaning: 'Stingray', pronunciation: 'HEE-hee-MAH-noo', category: 'animals' }
      ];
    }

    // Filter terms based on current state
    getFilteredTerms() {
      let terms = [...this.state.terms];
      
      // Filter by category
      if (this.state.currentCategory !== 'all') {
        terms = terms.filter(term => term.category === this.state.currentCategory);
      }
      
      // Filter by search query
      if (this.state.searchQuery) {
        terms = terms.filter(term => 
          term.term.toLowerCase().includes(this.state.searchQuery) ||
          term.meaning.toLowerCase().includes(this.state.searchQuery)
        );
      }
      
      // Filter by favorites if enabled
      if (this.state.showFavorites) {
        terms = terms.filter(term => this.state.favorites.includes(term.term));
      }
      
      return terms;
    }

    // Update active filter button
    updateActiveFilter() {
      this.elements.filters.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === this.state.currentCategory);
      });
    }

    // Render terms to the DOM
    renderTerms() {
      const terms = this.getFilteredTerms();
      this.elements.container.innerHTML = '';
      
      if (terms.length === 0) {
        this.showNoResults();
        return;
      }
      
      terms.forEach(term => {
        const termEl = this.createTermElement(term);
        this.elements.container.appendChild(termEl);
      });
      
      // Show first term details by default
      this.showTermDetails(terms[0]);
    }

    // Create individual term element
    createTermElement(term) {
      const termEl = document.createElement('div');
      termEl.className = 'term-card';
      termEl.innerHTML = `
        <span class="term-emoji">${term.emoji}</span>
        <h4 class="term-name">${term.term}</h4>
        <button class="favorite-btn" aria-label="Toggle favorite">
          ${this.state.favorites.includes(term.term) ? '★' : '☆'}
        </button>
      `;
      
      // Click handler for term selection
      termEl.addEventListener('click', (e) => {
        if (!e.target.classList.contains('favorite-btn')) {
          this.showTermDetails(term);
          document.querySelectorAll('.term-card').forEach(el => el.classList.remove('active'));
          termEl.classList.add('active');
        }
      });
      
      // Favorite button handler
      const favBtn = termEl.querySelector('.favorite-btn');
      favBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleFavorite(term.term);
        favBtn.innerHTML = this.state.favorites.includes(term.term) ? '★' : '☆';
      });
      
      return termEl;
    }

    // Show term details in the detail panel
    showTermDetails(term) {
      this.elements.title.textContent = term.term;
      this.elements.emoji.textContent = term.emoji;
      this.elements.pronunciation.textContent = `Pronunciation: ${term.pronunciation}`;
      this.elements.meaning.textContent = term.meaning;
      this.elements.example.textContent = term.example || `Example: The word "${term.term}" is commonly used in ${term.category} contexts.`;
      
      // Add animation
      this.elements.title.classList.add('animate-pop');
      setTimeout(() => this.elements.title.classList.remove('animate-pop'), 300);
    }

    // Show no results message
    showNoResults() {
      this.elements.title.textContent = 'No terms found';
      this.elements.emoji.textContent = '🔍';
      this.elements.pronunciation.textContent = '';
      this.elements.meaning.textContent = this.state.showFavorites 
        ? 'You have no favorites yet. Click the ☆ on terms to add them.'
        : 'Try a different search or category.';
      this.elements.example.textContent = '';
    }

    // Toggle term in favorites
    toggleFavorite(term) {
      const index = this.state.favorites.indexOf(term);
      if (index === -1) {
        this.state.favorites.push(term);
      } else {
        this.state.favorites.splice(index, 1);
      }
      
      // Save to localStorage
      localStorage.setItem('hawiianDictFavorites', JSON.stringify(this.state.favorites));
      
      // If in favorites view, update the display
      if (this.state.showFavorites) {
        this.renderTerms();
      }
    }
  }

  // Initialize the dictionary
  new HawaiianDictionary();
});
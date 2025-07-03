// In js/learning-hub.js
import { client } from './sanityClient.js';
import { toHTML } from 'https://esm.sh/@portabletext/to-html';

/**
 * Groups an array of articles/videos by their category.
 * @param {Array} content - The array of documents from Sanity.
 * @returns {Object} - An object where keys are category values and values are arrays of content.
 */
function groupContentByCategory(content) {
  return content.reduce((acc, item) => {
    const category = item.category;
    if (category) {
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
    }
    return acc;
  }, {});
}

/**
 * Renders the content into the corresponding category cards on the page.
 * @param {Object} groupedContent - The content grouped by category.
 */
function renderContent(groupedContent) {
  const categoryCards = document.querySelectorAll('.hub-category-card');

  categoryCards.forEach(card => {
    const categoryValue = card.dataset.category;
    const articleListElement = card.querySelector('.article-list');
    
    articleListElement.innerHTML = '';

    if (groupedContent[categoryValue] && groupedContent[categoryValue].length > 0) {
      const contentForCategory = groupedContent[categoryValue];
      
      contentForCategory.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = item.title;
        a.href = '#';

        if (item._type === 'article') {
          a.dataset.title = item.title;
          a.dataset.content = JSON.stringify(item.content); 
          a.dataset.type = 'article';
        } else if (item._type === 'video') {
          a.href = item.videoUrl;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.dataset.type = 'video';
        }

        li.appendChild(a);
        articleListElement.appendChild(li);
      });
    } else {
        // If there's no content for this category, you can leave it empty
        // or add a message like this:
        // articleListElement.innerHTML = '<li>No articles in this category yet.</li>';
    }
  });
}

/**
 * Sets up event listeners for the modal.
 */
function setupModal() {
    const modal = document.getElementById('article-modal');
    if (!modal) return;

    const closeButton = modal.querySelector('.close-button');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const hubGrid = document.querySelector('.hub-grid');

    if (!hubGrid) return; // Add safety check for the grid

    hubGrid.addEventListener('click', function(event) {
        const link = event.target.closest('a');

        if (link && link.dataset.type === 'article') {
            event.preventDefault(); 
            modalTitle.textContent = link.dataset.title;
            const content = JSON.parse(link.dataset.content);

            modalBody.innerHTML = toHTML(content);
            modal.style.display = 'block';
        }
    });

    closeButton.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

/**
 * Main function to fetch and render all content.
 */
async function loadLearningContent() {
    const hubSpinner = document.getElementById('hub-spinner');
  
    // Safety check: if there's no spinner, exit the function.
    if (!hubSpinner) return;

    console.log("Attempting to fetch data from Sanity...");
    // Spinner is visible by default now, we only need to hide it.
    
    const query = '*[_type == "article" || _type == "video"]{..., "slug": slug.current}';
  
    try {
        const allContent = await client.fetch(query);
        console.log("✅ Data from Sanity has arrived!", allContent);
    
        const groupedContent = groupContentByCategory(allContent);
        console.log("Content grouped by category:", groupedContent);

        renderContent(groupedContent);
        setupModal();

    } catch (err) {
        console.error("🚨 Error fetching data from Sanity:", err);
        // Display an error without destroying the page layout
        const hubGrid = document.querySelector('.hub-grid');
        if (hubGrid) {
            hubGrid.innerHTML = '<p style="text-align: center; color: var(--text-secondary); grid-column: 1 / -1;">Sorry, there was an error loading the content. Please try again later.</p>';
        }
    } finally {
        // This 'finally' block ensures the spinner is always hidden.
        hubSpinner.style.display = 'none';
    }
}

// Run the main function when the page loads
loadLearningContent();
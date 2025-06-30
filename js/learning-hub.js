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
  // Select all category cards from the page
  const categoryCards = document.querySelectorAll('.hub-category-card');

  categoryCards.forEach(card => {
    const categoryValue = card.dataset.category;
    const articleListElement = card.querySelector('.article-list');
    
    // Clear any existing content
    articleListElement.innerHTML = '';

    // Check if we have content for this category
    if (groupedContent[categoryValue]) {
      const contentForCategory = groupedContent[categoryValue];
      
      contentForCategory.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = item.title;
        a.href = '#'; // We will handle clicks via JavaScript

        // Store the content for the modal directly on the link element
        if (item._type === 'article') {
          a.dataset.title = item.title;
          // We stringify the rich text content to store it
          a.dataset.content = JSON.stringify(item.content); 
          a.dataset.type = 'article';
        } else if (item._type === 'video') {
          a.href = item.videoUrl; // For videos, the link goes directly to the URL
          a.target = '_blank'; // Open videos in a new tab
          a.rel = 'noopener noreferrer';
          a.dataset.type = 'video';
        }

        li.appendChild(a);
        articleListElement.appendChild(li);
      });
    } else {
        // If no content, we can display a message, or leave it empty as requested.
        // For now, we leave it empty.
    }
  });
}

/**
 * Sets up event listeners for the modal.
 */

function setupModal() {
    const modal = document.getElementById('article-modal');
    const closeButton = modal.querySelector('.close-button');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const hubGrid = document.querySelector('.hub-grid');

    hubGrid.addEventListener('click', function(event) {
        const link = event.target.closest('a');

        if (link && link.dataset.type === 'article') {
            event.preventDefault(); 
            modalTitle.textContent = link.dataset.title;
            const content = JSON.parse(link.dataset.content);

            // This is now back to the simple, default conversion
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
  console.log("Attempting to fetch data from Sanity...");
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
  }
}

// Run the main function when the page loads
loadLearningContent();
export const modal = (modalBodyContent, modalTitle = 'login') => {
// this modal function accept on DOM eg (document.createElement('div')) node and not tag e.g <h1></h1>
  return {
    show: function (state) {
      const modalOverlay = document.createElement('section');
      modalOverlay.classList.add('modal-overlay');
      modalOverlay.style.display = `${state ? 'block' : 'none'}`;

      const modal = document.createElement('div');
      modal.classList.add('modal');
      modal.id = 'modal';
      modalOverlay.appendChild(modal);

      // modal content
      const modalContent = document.createElement('div');
      modalContent.classList.add('modal-content');
      const modalBody = document.createElement('div');
      modalBody.appendChild(modalBodyContent) ;
      const closeModal = () => (modalOverlay.style.display = 'none');

      const modalHeder = document.createElement('div');
      modalHeder.innerHTML = `
       <div class="modal-header">
          <p class='title'>${modalTitle}</p>
         <button id="closeButton" class="close-button" >
           &#x2715;
         </button>
       </div>`;
      modalHeder
        .querySelector('#closeButton')
        .addEventListener('click', closeModal);

      modalContent.appendChild(modalHeder);
      modalContent.appendChild(modalBody);
      modal.appendChild(modalContent);
      document.body.appendChild(modalOverlay);
    },
  };
};

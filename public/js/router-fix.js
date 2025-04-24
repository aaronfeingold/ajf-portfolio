(function () {
    document.addEventListener('DOMContentLoaded', function () {
        // Patch Magnific Popup to ignore React Router links
        if (jQuery && jQuery.magnificPopup) {
            // Store the original open method
            const originalOpen = jQuery.magnificPopup.open;

            // Override the open method
            jQuery.magnificPopup.open = function (items, index, options) {
                // If this is a router link, let React Router handle it
                if (
                    items &&
                    items.items &&
                    items.items[0] &&
                    items.items[0].el
                ) {
                    const $el = items.items[0].el;
                    if (
                        $el.attr('data-router') === 'true' ||
                        $el.hasClass('router-link')
                    ) {
                        return false; // Prevent Magnific from opening
                    }
                }
                // Otherwise, call the original method
                return originalOpen.apply(this, arguments);
            };

            // Use event delegation to prevent clicks on router links
            jQuery(document).on(
                'click',
                '.router-link, [data-router="true"]',
                function (e) {
                    // Let the React Router Link handle this
                    // No need to call preventDefault as React Router Link will do that

                    // Close any open popups
                    if (
                        jQuery.magnificPopup &&
                        jQuery.magnificPopup.instance.isOpen
                    ) {
                        jQuery.magnificPopup.close();
                    }
                }
            );
        }
    });
})();

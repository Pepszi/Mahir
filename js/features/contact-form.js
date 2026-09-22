function getAjaxEndpoint(formAction) {
  const actionUrl = new URL(formAction, window.location.origin);

  if (actionUrl.hostname !== "formsubmit.co") {
    return formAction;
  }

  if (!actionUrl.pathname.startsWith("/ajax/")) {
    actionUrl.pathname = `/ajax${actionUrl.pathname}`;
  }

  return actionUrl.toString();
}

function getContactFormMessages() {
  const isEnglish = document.documentElement.lang === "en";

  if (isEnglish) {
    return {
      defaultButton: "Send",
      pending: "Sending your message...",
      submitting: "Sending...",
      success: "Thank you! Your message has been sent.",
      error: "Something went wrong while sending. Please try again.",
    };
  }

  return {
    defaultButton: "Küldés",
    pending: "Üzenet küldése folyamatban...",
    submitting: "Küldés...",
    success: "Köszönjük! Az üzenet sikeresen elküldve.",
    error: "Hiba történt küldés közben. Kérlek, próbáld újra.",
  };
}

export function initContactForm() {
  const contactForm = document.querySelector("#contact-form");
  const contactFormStatus = document.querySelector("#contact-form-status");

  if (!contactForm || !contactFormStatus) {
    return;
  }

  const messages = getContactFormMessages();
  const submitButton = contactForm.querySelector(".contact-submit");
  const defaultButtonLabel = submitButton?.textContent || messages.defaultButton;

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    contactFormStatus.classList.remove("is-success", "is-error", "is-pending");
    contactFormStatus.classList.add("is-pending");
    contactFormStatus.textContent = messages.pending;

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = messages.submitting;
    }

    try {
      const formData = new FormData(contactForm);
      const emailValue = formData.get("email");

      if (typeof emailValue === "string" && emailValue.trim()) {
        formData.set("_replyto", emailValue);
      }

      const response = await fetch(getAjaxEndpoint(contactForm.action), {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("FormSubmit request failed");
      }

      contactForm.reset();
      contactFormStatus.classList.add("is-success");
      contactFormStatus.textContent = messages.success;
    } catch (error) {
      contactFormStatus.classList.add("is-error");
      contactFormStatus.textContent = messages.error;
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = defaultButtonLabel;
      }
    }
  });
}

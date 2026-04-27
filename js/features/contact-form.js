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

export function initContactForm() {
  const contactForm = document.querySelector("#contact-form");
  const contactFormStatus = document.querySelector("#contact-form-status");

  if (!contactForm || !contactFormStatus) {
    return;
  }

  const submitButton = contactForm.querySelector(".contact-submit");
  const defaultButtonLabel = submitButton?.textContent || "Küldés";

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    contactFormStatus.classList.remove("is-success", "is-error", "is-pending");
    contactFormStatus.classList.add("is-pending");
    contactFormStatus.textContent = "Üzenet küldése folyamatban...";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Küldés...";
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
      contactFormStatus.textContent = "Köszönjük! Az üzenet sikeresen elküldve.";
    } catch (error) {
      contactFormStatus.classList.add("is-error");
      contactFormStatus.textContent = "Hiba történt küldés közben. Kérlek, próbáld újra.";
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = defaultButtonLabel;
      }
    }
  });
}

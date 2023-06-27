const alphanumericRegex = /^[\p{L}0-9\s]+$/u;
const aphhanumericregex2 = /^[\p{L}0-9\s.,;]+$/u;
const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

export const validateInputs = (input) => {
  let errors = {};

  if (!input.name) {
    errors.name = "Name is required";
  } else if (!alphanumericRegex.test(input.name)) {
    errors.name = "Name should only contain letters and numbers";
  }

  if (!input.description) {
    errors.description = "Description is required";
  } else if (!aphhanumericregex2.test(input.description)) {
    errors.description = "Description should only contain letters and numbers";
  }

  if (!input.released) {
    errors.released = "Released is required";
  }

  if (!input.rating) {
    errors.rating = "Rating is required";
  } else if (isNaN(input.rating)) {
    errors.rating = "Rating must be a number";
  } else if (input.rating < 0 || input.rating > 5) {
    errors.rating = "Rating must be between 0 and 5";
  } else if (!/^\d+(\.\d{1,2})?$/.test(input.rating)) {
    errors.rating = "Rating can have up to 2 decimal places";
  }

  if (!input.genres.length) {
    errors.genres = "Genres is required";
  }

  if (!input.platforms.length) {
    errors.platforms = "Platforms is required";
  }

  if (!input.background_image) {
    errors.background_image = "Background image URL is required";
  } else if (!urlRegex.test(input.background_image)) {
    errors.background_image = "Background image URL is not valid";
  }

  return errors;
};

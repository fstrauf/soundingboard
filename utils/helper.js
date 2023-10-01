export function convertUrlString(name) {
    return name
      .toLowerCase() // convert to lower case
      .replace(/\s+/g, '-') // replace spaces with hyphens
      .replace(/[^a-z0-9-]/g, ''); // remove any special characters
  }
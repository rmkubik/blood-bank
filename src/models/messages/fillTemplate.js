// TODO: We could replace this will handlebars in the
// future if we decide we need more advanced
// message templating.

function fillTemplate(template, values) {
  let updatedTemplate = template;
  const entries = Object.entries(values);

  entries.forEach(([key, value]) => {
    updatedTemplate = updatedTemplate.replaceAll(`{{${key}}}`, value);
  });

  return updatedTemplate;
}

export default fillTemplate;

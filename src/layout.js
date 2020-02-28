

function template({
  title,
  content = ''
}) {
  const page = `<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="utf-8">
            <title> ${title} </title>
          </head>
          <body>
            <div id="app">${content}</div>
          </body>
          <script src="/assets/client.bundle.js" type="text/javascript"></script>
          </html>
          `;
  return page;
}

module.exports = template;
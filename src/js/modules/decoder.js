let decodeHTMLEntities = (text) => {
  let entities = [
    ['amp', '&'],
    ['apos', '\''],
    ['#x27', '\''],
    ['#x2F', '/'],
    ['#39', '\''],
    ['#039', '\''],
    ['#47', '/'],
    ['lt', '<'],
    ['gt', '>'],
    ['nbsp', ' '],
    ['Uuml;', 'Ü'],
    ['Uuml', 'Ü'],
    ['uuml', 'ü'],
    ['uuml;', 'ü'],
    ['quot', '"'],
    ['eacute', 'é'],
    ['Eacute', 'É'],
    ['ntilde', 'ñ'],
    ['ntilde;', 'ñ'],
    ['Ntilde', 'ñ'],
    ['Ntilde;', 'ñ'],
    ['oslash', 'ø'],
    ['szlig', 'ß']
  ]

  for (let i = 0, max = entities.length; i < max; ++i) {
    text = text.replace(new RegExp('&' + entities[i][0] + ';', 'g'), entities[i][1])
  }
  return text
}

export default decodeHTMLEntities

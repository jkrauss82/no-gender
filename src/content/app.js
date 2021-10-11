(function (global) {
  global.noGender = global.noGender || {}

  const APP = global.noGender
  const INNEN_EXPR = '([:*_]innen|!nnen|Innen)'
  const IN_EXPR = '([:*_]in|!n|In)'
  const INNEN_UND_EXPR = '[A-Za-zÄÖÜäöüß]+innen (?:und|oder) ([A-Za-zÄÖÜäöü]+)'
  const SPECIAL_EXPR = '(jede[:*_]r)'

  /* configuration */
  APP.config = {
    regularExpressions: {
      innen: new RegExp(INNEN_EXPR),
      wordInnen: new RegExp('[A-Za-zÄÖÜäöüß]' + INNEN_EXPR),
      in: new RegExp(IN_EXPR),
      wordIn: new RegExp('[A-Za-zÄÖÜäöüß]' + IN_EXPR),
      innenUnd: new RegExp(INNEN_UND_EXPR),
      special: new RegExp(SPECIAL_EXPR),
    },
  }

  /* helper functions */
  APP.helpers = {
    /**
     * Creates a new replace-object with a regular expression
     * ending with "innen" and a replace string
     *
     * @example
     * ```
     * const obj = getInnenRegExp('Kommissar', 'Kommissare');
     * expect(obj).toEqual({
     *   regExp: /Kommissar([:*_]innen|!nnen)/g,
     *   replace: 'Kommissare',
     * });
     * ```
     *
     * @param search {string|string[]} the search term
     * @param replace {string|function} the replace term or function
     * @returns {{replace, regExp: RegExp}} replace-object
     */
    getInnenRegExp: function (search, replace) {
      const pattern = getPattern(search, INNEN_EXPR)
      const regExp = new RegExp(pattern, 'g')
      return { regExp, replace }
    },
    /**
     * Creates a new replace-object with a regular expression
     * ending with "in" and a replace string
     *
     * @example
     * ```
     * const obj = getInRegExp('Kirgis', 'Kirgise');
     * expect(obj).toEqual({
     *   regExp: /Kirgis([:*_]in|!n)/g,
     *   replace: 'Kirgise',
     * });
     * ```
     *
     * @param search {string|string[]} the search term
     * @param replace {string|function} the replace term or function
     * @returns {{replace, regExp: RegExp}} replace-object
     */
    getInRegExp: function (search, replace) {
      const pattern = getPattern(search, IN_EXPR)
      const regExp = new RegExp(pattern, 'g')
      return { regExp, replace }
    },

    /**
     *
     * @returns {{replace, regExp: RegExp}} replace-object
     */
    getInnenUndRegExp: function () {
      const regExp = new RegExp(INNEN_UND_EXPR, 'g')
      const replace = (term, word) => word
      return { regExp, replace }
    },

    /**
     * Creates a new replace-object with a regular expression
     * for special gender terms
     *
     * @returns {{replace: (function(*, *): *), regExp: RegExp}}
     */
    getSpecialRegExp: function () {
      const regExp = new RegExp(SPECIAL_EXPR, 'g')
      const replace = term => term.replace(/[:*_]/, '')
      return { regExp, replace}
    },
  }

  /**
   *
   * @param search {string|string[]} search term as string or list of strings
   * @param expression {RegExp} regular expression attached to pattern
   * @returns {string}
   */
  function getPattern (search, expression) {
    if (Array.isArray(search)) {
      const terms = search.join('|')
      return `(${terms})` + expression
    } else {
      return search + expression
    }
  }
}(typeof window !== 'undefined' ? window : this))

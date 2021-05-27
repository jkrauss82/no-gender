(function (global) {
  global.noGender = global.noGender || {}

  const APP = global.noGender
  const INNEN_EXPR = '([:*_]innen|!nnen)'
  const IN_EXPR = '([:*_]in|!n)'

  /* configuration */
  APP.config = {
    active: true,
    expressions: {
      innen: INNEN_EXPR,
      in: IN_EXPR,
    },
    regularExpressions: {
      innen: new RegExp(INNEN_EXPR),
      in: new RegExp(IN_EXPR),
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

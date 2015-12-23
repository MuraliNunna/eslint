/**
 * @fileoverview Rule to flag the use of redundant constructors in classes.
 * @author Alberto Rodríguez
 * @copyright 2015 Alberto Rodríguez. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    /**
     * Checks whether the constructor body is a redundant super call.
     * @param {ASTNode} node - constructor body.
     * @param {Array} ctorParams - The params to check against super call.
     * @returns {boolean} true if the construtor body is redundant
     */
    function isRedundantSuperCall(node, ctorParams) {
        if (node.length !== 1 ||
            node[0].type !== "ExpressionStatement" ||
            node[0].expression.callee.type !== "Super") {
            return false;
        }


        return node[0].expression.arguments.every(function(arg, index) {
            return (arg.type === "Identifier" && arg.name === ctorParams[index].name) ||
            (
                arg.type === "SpreadElement" &&
                ctorParams[index].type === "RestElement" &&
                arg.argument.name === ctorParams[index].argument.name
            );
        });
    }

    /**
     * Checks whether a node is a redundant construtor
     * @param {ASTNode} node - node to check
     * @returns {void}
     */
    function checkForConstructor(node) {
        if (node.key.name !== "constructor") {
            return;
        }

        var body = node.value.body.body;

        if (body.length === 0 || isRedundantSuperCall(body, node.value.params)) {
            context.report(node, "Useless constructor.");
        }
    }


    return {
        "MethodDefinition": checkForConstructor
    };
};

module.exports.schema = [];

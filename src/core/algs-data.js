/**
 * algs-data.js
 * Comprehensive Rubik's Cube Algorithm Library
 * Sources: SpeedCubeDB.com & Complete Chi-Chu BLD 3-Style Formula Matrix
 * Contains 1519 cases with complete 24-letter sticker commutators.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
        if (typeof global !== 'undefined') global.RUBIKS_ALGORITHM_DATASET = module.exports;
    } else {
        root.RUBIKS_ALGORITHM_DATASET = factory();
    }
}(typeof self !== 'undefined' ? self : this, function() {
    'use strict';
    return [
  {
    "id": "trig_sexy",
    "name": "Sexy Move",
    "group": "Triggers",
    "alg": "R U R' U'",
    "algs": [
      "R U R' U'",
      "y R U R' U'",
      "y' L' U' L U"
    ],
    "moves": 4,
    "desc": "Core fundamental speedcubing trigger"
  },
  {
    "id": "trig_rev_sexy",
    "name": "Reverse Sexy",
    "group": "Triggers",
    "alg": "U R U' R'",
    "algs": [
      "U R U' R'",
      "y' U' L' U L"
    ],
    "moves": 4,
    "desc": "Inverse sequence of Sexy Move"
  },
  {
    "id": "trig_inv_sexy",
    "name": "Inverse Sexy",
    "group": "Triggers",
    "alg": "U' R U R'",
    "algs": [
      "U' R U R'",
      "y U L' U' L"
    ],
    "moves": 4,
    "desc": "Setup variation for F2L inserts"
  },
  {
    "id": "trig_sledge",
    "name": "Sledgehammer",
    "group": "Triggers",
    "alg": "R' F R F'",
    "algs": [
      "R' F R F'",
      "y' L F' L' F"
    ],
    "moves": 4,
    "desc": "Corner insertion & edge orientation trigger"
  },
  {
    "id": "trig_hedge",
    "name": "Hedgeslammer",
    "group": "Triggers",
    "alg": "F R' F' R",
    "algs": [
      "F R' F' R",
      "y' F' L F L'"
    ],
    "moves": 4,
    "desc": "Inverse of Sledgehammer"
  },
  {
    "id": "trig_triple_s",
    "name": "Triple Sexy",
    "group": "Triggers",
    "alg": "R U R' U' R U R' U' R U R' U'",
    "algs": [
      "R U R' U' R U R' U' R U R' U'"
    ],
    "moves": 12,
    "desc": "3x Sexy Move cycle (OLL 33 / CP preservation)"
  },
  {
    "id": "trig_fat_sune",
    "name": "Fat Sune",
    "group": "Triggers",
    "alg": "r U R' U' r' F R F'",
    "algs": [
      "r U R' U' r' F R F'"
    ],
    "moves": 8,
    "desc": "Wide Sune variation"
  },
  {
    "id": "trig_suicide",
    "name": "Suicide Move",
    "group": "Triggers",
    "alg": "R U2 R' U' R U' R'",
    "algs": [
      "R U2 R' U' R U' R'"
    ],
    "moves": 7,
    "desc": "Anti-Sune trigger"
  },
  {
    "id": "pll_aa",
    "name": "Aa",
    "title": "3x3 - PLL - Aa",
    "group": "PLL - Adj Swap",
    "alg": "x R' U R' D2 R U' R' D2 R2 x'",
    "algs": [
      "x R' U R' D2 R U' R' D2 R2 x'",
      "y' x L2 D2 L' U' L D2 L' U L'",
      "l' U R' D2 R U' R' D2 R2 x'",
      "y x' R2 D2 R' U' R D2 R' U R' x"
    ],
    "moves": 11,
    "desc": "3x3 - PLL - Aa (Adj Swap)"
  },
  {
    "id": "pll_ab",
    "name": "Ab",
    "title": "3x3 - PLL - Ab",
    "group": "PLL - Adj Swap",
    "alg": "x R2 D2 R U R' D2 R U' R x'",
    "algs": [
      "x R2 D2 R U R' D2 R U' R x'",
      "y' x L U' L D2 L' U L D2 L2",
      "y x' R U' R D2 R' U R D2 R2 x",
      "R' B' R U' R D R' U R D' R2 B R"
    ],
    "moves": 11,
    "desc": "3x3 - PLL - Ab (Adj Swap)"
  },
  {
    "id": "pll_e",
    "name": "E",
    "title": "3x3 - PLL - E",
    "group": "PLL - Opp Swap",
    "alg": "y x' R U' R' D R U R' D' R U R' D R U' R' D' x",
    "algs": [
      "y x' R U' R' D R U R' D' R U R' D R U' R' D' x",
      "y R' U' R' D' R U' R' D R U R' D' R U R' D R2",
      "R2 U F' R' U R U' R' U R U' R' U R U' F U' R2",
      "y x' L' U L D' L' U' L D L' U' L D' L' U L D"
    ],
    "moves": 19,
    "desc": "3x3 - PLL - E (Opp Swap)"
  },
  {
    "id": "pll_f",
    "name": "F",
    "title": "3x3 - PLL - F",
    "group": "PLL - Adj Swap",
    "alg": "y R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R",
    "algs": [
      "y R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R",
      "y R' F R f' R' F R2 U R' U' R' F' R2 U R' S",
      "R' U R U' R2 F' U' F U R F R' F' R2",
      "y R2 F R F' R' U' F' U F R2 U R' U' R"
    ],
    "moves": 19,
    "desc": "3x3 - PLL - F (Adj Swap)"
  },
  {
    "id": "pll_ga",
    "name": "Ga",
    "title": "3x3 - PLL - Ga",
    "group": "PLL - Adj Swap",
    "alg": "R2 U R' U R' U' R U' R2 D U' R' U R D'",
    "algs": [
      "R2 U R' U R' U' R U' R2 D U' R' U R D'",
      "R2 u R' U R' U' R u' R2 F' U F",
      "y R U R' F' R U R' U' R' F R U' R' F R2 U' R' U' R U R' F'",
      "D' R2 U R' U R' U' R U' R2 U' D R' U R"
    ],
    "moves": 15,
    "desc": "3x3 - PLL - Ga (Adj Swap)"
  },
  {
    "id": "pll_gb",
    "name": "Gb",
    "title": "3x3 - PLL - Gb",
    "group": "PLL - Adj Swap",
    "alg": "D R' U' R U D' R2 U R' U R U' R U' R2",
    "algs": [
      "D R' U' R U D' R2 U R' U R U' R U' R2",
      "R' U' R U D' R2 U R' U R U' R U' R2 D",
      "y F' U' F R2 u R' U R U' R u' R2",
      "R' d' F R2 u R' U R U' R u' R2"
    ],
    "moves": 15,
    "desc": "3x3 - PLL - Gb (Adj Swap)"
  },
  {
    "id": "pll_gc",
    "name": "Gc",
    "title": "3x3 - PLL - Gc",
    "group": "PLL - Adj Swap",
    "alg": "R2 U' R U' R U R' U R2 D' U R U' R' D",
    "algs": [
      "R2 U' R U' R U R' U R2 D' U R U' R' D",
      "y2 R2 F2 R U2 R U2 R' F R U R' U' R' F R2",
      "D R2 U' R U' R U R' U R2 D' U R U' R'",
      "R2 u' R U' R U R' u R2 f R' f'"
    ],
    "moves": 15,
    "desc": "3x3 - PLL - Gc (Adj Swap)"
  },
  {
    "id": "pll_gd",
    "name": "Gd",
    "title": "3x3 - PLL - Gd",
    "group": "PLL - Adj Swap",
    "alg": "R U R' U' D R2 U' R U' R' U R' U R2 D'",
    "algs": [
      "R U R' U' D R2 U' R U' R' U R' U R2 D'",
      "D' R U R' U' D R2 U' R U' R' U R' U R2",
      "R U R' y' R2 u' R U' R' U R' u R2",
      "y R2 F' R U R U' R' F' R U2 R' U2 R' F2 R2"
    ],
    "moves": 15,
    "desc": "3x3 - PLL - Gd (Adj Swap)"
  },
  {
    "id": "pll_h",
    "name": "H",
    "title": "3x3 - PLL - H",
    "group": "PLL - EPLL",
    "alg": "M2 U M2 U2 M2 U M2",
    "algs": [
      "M2 U M2 U2 M2 U M2",
      "M2 U' M2 U2 M2 U' M2",
      "R2 S2 R2 U' R2 S2 R2",
      "M2 U2 M2 U M2 U2 M2"
    ],
    "moves": 7,
    "desc": "3x3 - PLL - H (EPLL)"
  },
  {
    "id": "pll_ja",
    "name": "Ja",
    "title": "3x3 - PLL - Ja",
    "group": "PLL - Adj Swap",
    "alg": "y2 x R2 F R F' R U2 r' U r U2 x'",
    "algs": [
      "y2 x R2 F R F' R U2 r' U r U2 x'",
      "y R' U L' U2 R U' R' U2 R L",
      "L' U' L F L' U' L U L F' L2 U L",
      "R U' L' U R' U2 L U' L' U2 L"
    ],
    "moves": 13,
    "desc": "3x3 - PLL - Ja (Adj Swap)"
  },
  {
    "id": "pll_jb",
    "name": "Jb",
    "title": "3x3 - PLL - Jb",
    "group": "PLL - Adj Swap",
    "alg": "R U R' F' R U R' U' R' F R2 U' R'",
    "algs": [
      "R U R' F' R U R' U' R' F R2 U' R'",
      "R U2 R' U' R U2 L' U R' U' L",
      "r' F R F' r U2 R' U R U2 R'",
      "L' U R U' L U2 R' U R U2 R'"
    ],
    "moves": 13,
    "desc": "3x3 - PLL - Jb (Adj Swap)"
  },
  {
    "id": "pll_na",
    "name": "Na",
    "title": "3x3 - PLL - Na",
    "group": "PLL - Opp Swap",
    "alg": "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'",
    "algs": [
      "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'",
      "F' R U R' U' R' F R2 F U' R' U' R U F' R'",
      "R F U' R' U R U F' R2 F' R U R U' R' F",
      "r' D r U2 r' D r U2 r' D r U2 r' D r U2 r' D r"
    ],
    "moves": 21,
    "desc": "3x3 - PLL - Na (Opp Swap)"
  },
  {
    "id": "pll_nb",
    "name": "Nb",
    "title": "3x3 - PLL - Nb",
    "group": "PLL - Opp Swap",
    "alg": "R' U R U' R' F' U' F R U R' F R' F' R U' R",
    "algs": [
      "R' U R U' R' F' U' F R U R' F R' F' R U' R",
      "r' D' F r U' r' F' D r2 U r' U' r' F r F'",
      "R' U L' U2 R U' L R' U L' U2 R U' L",
      "R' U R U' R' F' U' F R U R' U' R U' f R f'"
    ],
    "moves": 17,
    "desc": "3x3 - PLL - Nb (Opp Swap)"
  },
  {
    "id": "pll_ra",
    "name": "Ra",
    "title": "3x3 - PLL - Ra",
    "group": "PLL - Adj Swap",
    "alg": "y R U' R' U' R U R D R' U' R D' R' U2 R'",
    "algs": [
      "y R U' R' U' R U R D R' U' R D' R' U2 R'",
      "y R U R' F' R U2 R' U2 R' F R U R U2 R'",
      "L U2 L' U2 L F' L' U' L U L F L2",
      "y R U' R' U' R U R' U R' D' R U' R' D R2 U R'"
    ],
    "moves": 16,
    "desc": "3x3 - PLL - Ra (Adj Swap)"
  },
  {
    "id": "pll_rb",
    "name": "Rb",
    "title": "3x3 - PLL - Rb",
    "group": "PLL - Adj Swap",
    "alg": "R' U2 R U2 R' F R U R' U' R' F' R2",
    "algs": [
      "R' U2 R U2 R' F R U R' U' R' F' R2",
      "y R2 F R U R U' R' F' R U2 R' U2 R",
      "R' U2 R' D' R U' R' D R U R U' R' U' R",
      "y R' U R U R' U' R' D' R U R' D R U2 R"
    ],
    "moves": 13,
    "desc": "3x3 - PLL - Rb (Adj Swap)"
  },
  {
    "id": "pll_t",
    "name": "T",
    "title": "3x3 - PLL - T",
    "group": "PLL - Adj Swap",
    "alg": "R U R' U' R' F R2 U' R' U' R U R' F'",
    "algs": [
      "R U R' U' R' F R2 U' R' U' R U R' F'",
      "l b d' L' U' F U2 L' U' L' U L U' f' S M r u E U' R'",
      "R U R' U' R' F R2 U' R' U F' L' U L",
      "R2 u R2 u' R2 F2 u' F2 u F2"
    ],
    "moves": 14,
    "desc": "3x3 - PLL - T (Adj Swap)"
  },
  {
    "id": "pll_ua",
    "name": "Ua",
    "title": "3x3 - PLL - Ua",
    "group": "PLL - EPLL",
    "alg": "y2 M2 U M U2 M' U M2",
    "algs": [
      "y2 M2 U M U2 M' U M2",
      "R U R' U R' U' R2 U' R' U R' U R",
      "y R2 U' S' U2 S U' R2",
      "y2 R U' R U R U R U' R' U' R2"
    ],
    "moves": 8,
    "desc": "3x3 - PLL - Ua (EPLL)"
  },
  {
    "id": "pll_ub",
    "name": "Ub",
    "title": "3x3 - PLL - Ub",
    "group": "PLL - EPLL",
    "alg": "y2 M2 U' M U2 M' U' M2",
    "algs": [
      "y2 M2 U' M U2 M' U' M2",
      "R' U R' U' R' U' R' U R U R2",
      "R2' U R U R' U' R3 U' R' U R'",
      "y2 R2 U R U R' U' R' U' R' U R'"
    ],
    "moves": 8,
    "desc": "3x3 - PLL - Ub (EPLL)"
  },
  {
    "id": "pll_v",
    "name": "V",
    "title": "3x3 - PLL - V",
    "group": "PLL - Opp Swap",
    "alg": "R' U R' U' R D' R' D R' U D' R2 U' R2 D R2",
    "algs": [
      "R' U R' U' R D' R' D R' U D' R2 U' R2 D R2",
      "R' U R U' R' f' U' R U2 R' U' R U' R' f R",
      "R' U R' U' y R' F' R2 U' R' U R' F R F",
      "y R U' R U R' D R D' R U' D R2 U R2 D' R2"
    ],
    "moves": 16,
    "desc": "3x3 - PLL - V (Opp Swap)"
  },
  {
    "id": "pll_y",
    "name": "Y",
    "title": "3x3 - PLL - Y",
    "group": "PLL - Opp Swap",
    "alg": "F R U' R' U' R U R' F' R U R' U' R' F R F'",
    "algs": [
      "F R U' R' U' R U R' F' R U R' U' R' F R F'",
      "F R' F R2 U' R' U' R U R' F' R U R' U' F'",
      "R2 U' R2 U' R2 U F U F' R2 F U' F'",
      "F R' F' R U R U' R2 U' R U R f' U' f"
    ],
    "moves": 17,
    "desc": "3x3 - PLL - Y (Opp Swap)"
  },
  {
    "id": "pll_z",
    "name": "Z",
    "title": "3x3 - PLL - Z",
    "group": "PLL - EPLL",
    "alg": "M' U' M2 U' M2 U' M' U2 M2",
    "algs": [
      "M' U' M2 U' M2 U' M' U2 M2",
      "M2 U M2 U M' U2 M2 U2 M'",
      "y M2 U' M2 U' M' U2 M2 U2 M'",
      "y M' U M2 U M2 U M' U2 M2"
    ],
    "moves": 9,
    "desc": "3x3 - PLL - Z (EPLL)"
  },
  {
    "id": "oll_oll_1",
    "name": "OLL 1",
    "title": "3x3 - OLL - OLL 1",
    "group": "OLL - Dot Case",
    "alg": "R U2 R' R' F R F' U2 R' F R F'",
    "algs": [
      "R U2 R' R' F R F' U2 R' F R F'",
      "R U2 R2 F R F' U2 R' F R F'",
      "y R U' R2 D' r U' r' D R2 U R'",
      "f R U R' U' R f' U' r' U' R U M'",
      "L' U2 L2 F' L' F U2 L F' L' F"
    ],
    "moves": 12,
    "desc": "3x3 - OLL - OLL 1 (Dot Case)"
  },
  {
    "id": "oll_oll_2",
    "name": "OLL 2",
    "title": "3x3 - OLL - OLL 2",
    "group": "OLL - Dot Case",
    "alg": "y' R U' R2 D' r U r' D R2 U R'",
    "algs": [
      "y' R U' R2 D' r U r' D R2 U R'",
      "F R U R' U' S R U R' U' f'",
      "F R U R' U' F' f R U R' U' f'",
      "y r U r' U2 R U2 R' U2 r U' r'"
    ],
    "moves": 12,
    "desc": "3x3 - OLL - OLL 2 (Dot Case)"
  },
  {
    "id": "oll_oll_3",
    "name": "OLL 3",
    "title": "3x3 - OLL - OLL 3",
    "group": "OLL - Dot Case",
    "alg": "y' f R U R' U' f' U' F R U R' U' F'",
    "algs": [
      "y' f R U R' U' f' U' F R U R' U' F'",
      "y R' F2 R2 U2 R' F R U2 R2 F2 R",
      "r' R2 U R' U r U2 r' U M'",
      "M R U R' U r U2 r' U M'"
    ],
    "moves": 14,
    "desc": "3x3 - OLL - OLL 3 (Dot Case)"
  },
  {
    "id": "oll_oll_4",
    "name": "OLL 4",
    "title": "3x3 - OLL - OLL 4",
    "group": "OLL - Dot Case",
    "alg": "y' R' F2 R2 U2 R' F' R U2 R2 F2 R",
    "algs": [
      "y' R' F2 R2 U2 R' F' R U2 R2 F2 R",
      "y' f R U R' U' f' U F R U R' U' F'",
      "R' F R F' U' S R' U' R U R S'",
      "y F U R U' R' F' U' F R U R' U' F'"
    ],
    "moves": 12,
    "desc": "3x3 - OLL - OLL 4 (Dot Case)"
  },
  {
    "id": "oll_oll_5",
    "name": "OLL 5",
    "title": "3x3 - OLL - OLL 5",
    "group": "OLL - Square Shapes",
    "alg": "r' U2 R U R' U r",
    "algs": [
      "r' U2 R U R' U r",
      "y2 l' U2 L U L' U l",
      "y2 R' F2 r U r' F R",
      "y2 R' F2 L F L' F R"
    ],
    "moves": 7,
    "desc": "3x3 - OLL - OLL 5 (Square Shapes)"
  },
  {
    "id": "oll_oll_6",
    "name": "OLL 6",
    "title": "3x3 - OLL - OLL 6",
    "group": "OLL - Square Shapes",
    "alg": "r U2 R' U' R U' r'",
    "algs": [
      "r U2 R' U' R U' r'",
      "F U' R2 D R' U' R D' R2 U F'",
      "y2 l U2 L' U' L U' l'",
      "L F2 l' U' l F' L'"
    ],
    "moves": 7,
    "desc": "3x3 - OLL - OLL 6 (Square Shapes)"
  },
  {
    "id": "oll_oll_7",
    "name": "OLL 7",
    "title": "3x3 - OLL - OLL 7",
    "group": "OLL - Lightning Shapes",
    "alg": "r U R' U R U2 r'",
    "algs": [
      "r U R' U R U2 r'",
      "S' R U R' U R U2 R' U S",
      "L' U2 L U2 L F' L' F",
      "y2 f R U R' U' f' y2 F R' F' r U R U' r'"
    ],
    "moves": 7,
    "desc": "3x3 - OLL - OLL 7 (Lightning Shapes)"
  },
  {
    "id": "oll_oll_8",
    "name": "OLL 8",
    "title": "3x3 - OLL - OLL 8",
    "group": "OLL - Lightning Shapes",
    "alg": "y2 r' U' R U' R' U2 r",
    "algs": [
      "y2 r' U' R U' R' U2 r",
      "l' U' L U' L' U2 l",
      "R U2 R' U2 R' F R F'",
      "R' F' r U' r' F2 R"
    ],
    "moves": 8,
    "desc": "3x3 - OLL - OLL 8 (Lightning Shapes)"
  },
  {
    "id": "oll_oll_9",
    "name": "OLL 9",
    "title": "3x3 - OLL - OLL 9",
    "group": "OLL - Fish Shapes",
    "alg": "y R U R' U' R' F R R U R' U' F'",
    "algs": [
      "y R U R' U' R' F R R U R' U' F'",
      "y R U R' U' R' F R2 U R' U' F'",
      "R U2 R' U' S' R U' R' S",
      "y2 F' U' F r U' r' U r U r'",
      "y' L' U' L U' L F' L' F L' U2 L"
    ],
    "moves": 13,
    "desc": "3x3 - OLL - OLL 9 (Fish Shapes)"
  },
  {
    "id": "oll_oll_10",
    "name": "OLL 10",
    "title": "3x3 - OLL - OLL 10",
    "group": "OLL - Fish Shapes",
    "alg": "R U R' U R' F R F' R U2 R'",
    "algs": [
      "R U R' U R' F R F' R U2 R'",
      "y F U F' R' F R U' R' F' R",
      "y M' R' U2 R U R' U R U M",
      "y2 L' U' L U L F' L2 U' L U F"
    ],
    "moves": 11,
    "desc": "3x3 - OLL - OLL 10 (Fish Shapes)"
  },
  {
    "id": "oll_oll_11",
    "name": "OLL 11",
    "title": "3x3 - OLL - OLL 11",
    "group": "OLL - Lightning Shapes",
    "alg": "r' R2 U R' U R U2 R' U M'",
    "algs": [
      "r' R2 U R' U R U2 R' U M'",
      "y2 r U R' U R' F R F' R U2 r'",
      "S R U R' U R U2 R' U2 S'",
      "M R U R' U R U2 R' U M'"
    ],
    "moves": 10,
    "desc": "3x3 - OLL - OLL 11 (Lightning Shapes)"
  },
  {
    "id": "oll_oll_12",
    "name": "OLL 12",
    "title": "3x3 - OLL - OLL 12",
    "group": "OLL - Lightning Shapes",
    "alg": "y' M' R' U' R U' R' U2 R U' M",
    "algs": [
      "y' M' R' U' R U' R' U2 R U' M",
      "F R U R' U' F' U F R U R' U' F'",
      "y' S R' U' R U' R' U2 R U2 S'",
      "y M L' U' L U' L' U2 L U' M'"
    ],
    "moves": 11,
    "desc": "3x3 - OLL - OLL 12 (Lightning Shapes)"
  },
  {
    "id": "oll_oll_13",
    "name": "OLL 13",
    "title": "3x3 - OLL - OLL 13",
    "group": "OLL - Knight Move Shapes",
    "alg": "F U R U2 R' U' R U R' F'",
    "algs": [
      "F U R U2 R' U' R U R' F'",
      "F U R U' R2 F' R U R U' R'",
      "r U' r' U' r U r' F' U F",
      "y2 f R U R2 U' R' U R U' f'"
    ],
    "moves": 10,
    "desc": "3x3 - OLL - OLL 13 (Knight Move Shapes)"
  },
  {
    "id": "oll_oll_14",
    "name": "OLL 14",
    "title": "3x3 - OLL - OLL 14",
    "group": "OLL - Knight Move Shapes",
    "alg": "R' F R U R' F' R F U' F'",
    "algs": [
      "R' F R U R' F' R F U' F'",
      "r U R' U' r' F R2 U R' U' F'",
      "l' U l U l' U' l F U' F'",
      "S R U R' U' R' F R2 U R' U' f'"
    ],
    "moves": 10,
    "desc": "3x3 - OLL - OLL 14 (Knight Move Shapes)"
  },
  {
    "id": "oll_oll_15",
    "name": "OLL 15",
    "title": "3x3 - OLL - OLL 15",
    "group": "OLL - Knight Move Shapes",
    "alg": "r' U' r R' U' R U r' U r",
    "algs": [
      "r' U' r R' U' R U r' U r",
      "y2 l' U' l L' U' L U l' U l",
      "r' U' M' U' R U r' U r",
      "y2 R' F' R L' U' L U R' F R"
    ],
    "moves": 10,
    "desc": "3x3 - OLL - OLL 15 (Knight Move Shapes)"
  },
  {
    "id": "oll_oll_16",
    "name": "OLL 16",
    "title": "3x3 - OLL - OLL 16",
    "group": "OLL - Knight Move Shapes",
    "alg": "r U r' R U R' U' r U' r'",
    "algs": [
      "r U r' R U R' U' r U' r'",
      "r U M U R' U' r U' r'",
      "y2 R' F R U R' U' F' R U' R' U2 R",
      "y2 l U l' L U L' U' l U' l'"
    ],
    "moves": 10,
    "desc": "3x3 - OLL - OLL 16 (Knight Move Shapes)"
  },
  {
    "id": "oll_oll_17",
    "name": "OLL 17",
    "title": "3x3 - OLL - OLL 17",
    "group": "OLL - Dot Case",
    "alg": "R U R' U R' F R F' U2 R' F R F'",
    "algs": [
      "R U R' U R' F R F' U2 R' F R F'",
      "y2 F R' F' R U S' R U' R' S",
      "y2 F R' F' R2 r' U R U' R' U' M'",
      "y' F' r U r' U' S r' F r S'"
    ],
    "moves": 13,
    "desc": "3x3 - OLL - OLL 17 (Dot Case)"
  },
  {
    "id": "oll_oll_18",
    "name": "OLL 18",
    "title": "3x3 - OLL - OLL 18",
    "group": "OLL - Dot Case",
    "alg": "y R U2 R' R' F R F' U2 M' U R U' r'",
    "algs": [
      "y R U2 R' R' F R F' U2 M' U R U' r'",
      "y R U2 R2 F R F' U2 M' U R U' r'",
      "r U R' U R U2 r2 U' R U' R' U2 r",
      "y F S' R U' R' S R U2 R' U' F'",
      "R D r' U' r D' R' U' R2 F R F' R"
    ],
    "moves": 14,
    "desc": "3x3 - OLL - OLL 18 (Dot Case)"
  },
  {
    "id": "oll_oll_19",
    "name": "OLL 19",
    "title": "3x3 - OLL - OLL 19",
    "group": "OLL - Dot Case",
    "alg": "y S' R U R' S U' R' F R F'",
    "algs": [
      "y S' R U R' S U' R' F R F'",
      "M U R U R' U' M' R' F R F'",
      "R' U2 F R U R' U' F2 U2 F R",
      "r' R U R U R' U' r R2 F R F'"
    ],
    "moves": 11,
    "desc": "3x3 - OLL - OLL 19 (Dot Case)"
  },
  {
    "id": "oll_oll_20",
    "name": "OLL 20",
    "title": "3x3 - OLL - OLL 20",
    "group": "OLL - Dot Case",
    "alg": "r U R' U' M2 U R U' R' U' M'",
    "algs": [
      "r U R' U' M2 U R U' R' U' M'",
      "M' U2 M U2 M' U M U2 M' U2 M",
      "S' R U R' S U' M' U R U' r'",
      "S R' U' R U R U R U' R' S'"
    ],
    "moves": 11,
    "desc": "3x3 - OLL - OLL 20 (Dot Case)"
  },
  {
    "id": "oll_oll_21",
    "name": "OLL 21",
    "title": "3x3 - OLL - OLL 21",
    "group": "OLL - OCLL",
    "alg": "R U R' U R U' R' U R U2 R'",
    "algs": [
      "R U R' U R U' R' U R U2 R'",
      "y R U2 R' U' R U R' U' R U' R'",
      "y F R U R' U' R U R' U' R U R' U' F'",
      "R' U' R U' R' U R U' R' U2 R"
    ],
    "moves": 11,
    "desc": "3x3 - OLL - OLL 21 (OCLL)"
  },
  {
    "id": "oll_oll_22",
    "name": "OLL 22",
    "title": "3x3 - OLL - OLL 22",
    "group": "OLL - OCLL",
    "alg": "R U2 R2' U' R2 U' R2' U' U' R",
    "algs": [
      "R U2 R2' U' R2 U' R2' U' U' R",
      "R U2 R2 U' R2 U' R2 U2 R",
      "R' U2 R2 U R2 U R2 U2 R'",
      "f R U R' U' S' R U R' U' F'",
      "f R U R' U' f' F R U R' U' F'"
    ],
    "moves": 10,
    "desc": "3x3 - OLL - OLL 22 (OCLL)"
  },
  {
    "id": "oll_oll_23",
    "name": "OLL 23",
    "title": "3x3 - OLL - OLL 23",
    "group": "OLL - OCLL",
    "alg": "R2 D R' U2 R D' R' U2 R'",
    "algs": [
      "R2 D R' U2 R D' R' U2 R'",
      "y2 R2 D' R U2 R' D R U2 R",
      "R U R' U R U2 R2 U' R U' R' U2 R",
      "y R U R' U' R U' R' U2 R U' R' U2 R U R'"
    ],
    "moves": 9,
    "desc": "3x3 - OLL - OLL 23 (OCLL)"
  },
  {
    "id": "oll_oll_24",
    "name": "OLL 24",
    "title": "3x3 - OLL - OLL 24",
    "group": "OLL - OCLL",
    "alg": "r U R' U' r' F R F'",
    "algs": [
      "r U R' U' r' F R F'",
      "y2 R' F' r U R U' r' F",
      "y' x' R U R' D R U' R' D' x",
      "y R U R D R' U' R D' R2"
    ],
    "moves": 8,
    "desc": "3x3 - OLL - OLL 24 (OCLL)"
  },
  {
    "id": "oll_oll_25",
    "name": "OLL 25",
    "title": "3x3 - OLL - OLL 25",
    "group": "OLL - OCLL",
    "alg": "R U2 R D R' U2 R D' R2",
    "algs": [
      "R U2 R D R' U2 R D' R2",
      "y F' r U R' U' r' F R",
      "F R' F' r U R U' r'",
      "x R' U R D' R' U' R D x'"
    ],
    "moves": 9,
    "desc": "3x3 - OLL - OLL 25 (OCLL)"
  },
  {
    "id": "oll_oll_26",
    "name": "OLL 26",
    "title": "3x3 - OLL - OLL 26",
    "group": "OLL - OCLL",
    "alg": "y R U2 R' U' R U' R'",
    "algs": [
      "y R U2 R' U' R U' R'",
      "R' U' R U' R' U2 R",
      "y2 L' U' L U' L' U2 L",
      "y2 L' U R U' L U R'"
    ],
    "moves": 8,
    "desc": "3x3 - OLL - OLL 26 (OCLL)"
  },
  {
    "id": "oll_oll_27",
    "name": "OLL 27",
    "title": "3x3 - OLL - OLL 27",
    "group": "OLL - OCLL",
    "alg": "R U R' U R U2 R'",
    "algs": [
      "R U R' U R U2 R'",
      "y' R' U2 R U R' U R",
      "y L' U2 L U L' U L",
      "y2 L U L' U L U2 L'"
    ],
    "moves": 7,
    "desc": "3x3 - OLL - OLL 27 (OCLL)"
  },
  {
    "id": "oll_oll_28",
    "name": "OLL 28",
    "title": "3x3 - OLL - OLL 28",
    "group": "OLL - All Corners Oriented",
    "alg": "r U R' U' M U R U' R'",
    "algs": [
      "r U R' U' M U R U' R'",
      "r U R' U' r' R U R U' R'",
      "R' F R S R' F' R S'",
      "y2 M' U M U2 M' U M"
    ],
    "moves": 9,
    "desc": "3x3 - OLL - OLL 28 (All Corners Oriented)"
  },
  {
    "id": "oll_oll_29",
    "name": "OLL 29",
    "title": "3x3 - OLL - OLL 29",
    "group": "OLL - Awkward Shapes",
    "alg": "r2 D' r U r' D r2 U' r' U' r",
    "algs": [
      "r2 D' r U r' D r2 U' r' U' r",
      "y R U R' U' R U' R' F' U' F R U R'",
      "y S' R U R' U' R' F R F' U S",
      "M U R U R' U' R' F R F' M'"
    ],
    "moves": 11,
    "desc": "3x3 - OLL - OLL 29 (Awkward Shapes)"
  },
  {
    "id": "oll_oll_30",
    "name": "OLL 30",
    "title": "3x3 - OLL - OLL 30",
    "group": "OLL - Awkward Shapes",
    "alg": "y' r' D' r U' r' D r2 U' r' U r U r'",
    "algs": [
      "y' r' D' r U' r' D r2 U' r' U r U r'",
      "y2 F U R U2 R' U' R U2 R' U' F'",
      "y2 F R' F R2 U' R' U' R U R' F2",
      "y S' R' U' R f R' U R U' F'"
    ],
    "moves": 14,
    "desc": "3x3 - OLL - OLL 30 (Awkward Shapes)"
  },
  {
    "id": "oll_oll_31",
    "name": "OLL 31",
    "title": "3x3 - OLL - OLL 31",
    "group": "OLL - P Shapes",
    "alg": "R' U' F U R U' R' F' R",
    "algs": [
      "R' U' F U R U' R' F' R",
      "y2 S' L' U' L U L F' L' f",
      "y S R U R' U' f' U' F",
      "y' F R' F' R U R U R' U' R U' R'"
    ],
    "moves": 9,
    "desc": "3x3 - OLL - OLL 31 (P Shapes)"
  },
  {
    "id": "oll_oll_32",
    "name": "OLL 32",
    "title": "3x3 - OLL - OLL 32",
    "group": "OLL - P Shapes",
    "alg": "S R U R' U' R' F R f'",
    "algs": [
      "S R U R' U' R' F R f'",
      "y2 L U F' U' L' U L F L'",
      "R U B' U' R' U R B R'",
      "y' R' F R F' U' r U' r' U r U r'"
    ],
    "moves": 9,
    "desc": "3x3 - OLL - OLL 32 (P Shapes)"
  },
  {
    "id": "oll_oll_33",
    "name": "OLL 33",
    "title": "3x3 - OLL - OLL 33",
    "group": "OLL - T Shapes",
    "alg": "R U R' U' R' F R F'",
    "algs": [
      "R U R' U' R' F R F'",
      "y2 L' U' L U L F' L' F",
      "y2 r' F' r U r U' r' F",
      "R U R' F' U' F R U' R'"
    ],
    "moves": 8,
    "desc": "3x3 - OLL - OLL 33 (T Shapes)"
  },
  {
    "id": "oll_oll_34",
    "name": "OLL 34",
    "title": "3x3 - OLL - OLL 34",
    "group": "OLL - C Shapes",
    "alg": "y f R f' U' r' U' R U M'",
    "algs": [
      "y f R f' U' r' U' R U M'",
      "y2 R U R2 U' R' F R U R U' F'",
      "F R U R' U' R' F' r U R U' r'",
      "y2 R U R' U' B' R' F R F' B"
    ],
    "moves": 10,
    "desc": "3x3 - OLL - OLL 34 (C Shapes)"
  },
  {
    "id": "oll_oll_35",
    "name": "OLL 35",
    "title": "3x3 - OLL - OLL 35",
    "group": "OLL - Fish Shapes",
    "alg": "R U2 R' R' F R F' R U2 R'",
    "algs": [
      "R U2 R' R' F R F' R U2 R'",
      "R U2 R2 F R F' R U2 R'",
      "f R U R' U' f' R U R' U R U2 R'",
      "R U2 R' d' R' F R U' R' F' R",
      "y L' U2 L2 F' L' F L' U2 L"
    ],
    "moves": 10,
    "desc": "3x3 - OLL - OLL 35 (Fish Shapes)"
  },
  {
    "id": "oll_oll_36",
    "name": "OLL 36",
    "title": "3x3 - OLL - OLL 36",
    "group": "OLL - W Shapes",
    "alg": "y R U R2 F' U' F U R2 U2 R'",
    "algs": [
      "y R U R2 F' U' F U R2 U2 R'",
      "y2 L' U' L U' L' U L U L F' L' F",
      "y2 R U R' F' R U R' U' R' F R U' R' F R F'",
      "R U R' U' F' U2 F U R U R'"
    ],
    "moves": 11,
    "desc": "3x3 - OLL - OLL 36 (W Shapes)"
  },
  {
    "id": "oll_oll_37",
    "name": "OLL 37",
    "title": "3x3 - OLL - OLL 37",
    "group": "OLL - Fish Shapes",
    "alg": "F R' F' R U R U' R'",
    "algs": [
      "F R' F' R U R U' R'",
      "F R U' R' U' R U R' F'",
      "y F' r U r' U' r' F r",
      "y2 r2 D' r U' r' D r U r"
    ],
    "moves": 8,
    "desc": "3x3 - OLL - OLL 37 (Fish Shapes)"
  },
  {
    "id": "oll_oll_38",
    "name": "OLL 38",
    "title": "3x3 - OLL - OLL 38",
    "group": "OLL - W Shapes",
    "alg": "R U R' U R U' R' U' R' F R F'",
    "algs": [
      "R U R' U R U' R' U' R' F R F'",
      "y F R U' R' S U' R U R' f'",
      "r U R' U' r' F R U R U' R' F'",
      "y2 L U L' U L U' L' U' L' B L B'"
    ],
    "moves": 12,
    "desc": "3x3 - OLL - OLL 38 (W Shapes)"
  },
  {
    "id": "oll_oll_39",
    "name": "OLL 39",
    "title": "3x3 - OLL - OLL 39",
    "group": "OLL - Lightning Shapes",
    "alg": "y' f' r U r' U' r' F r S",
    "algs": [
      "y' f' r U r' U' r' F r S",
      "y' R U R' F' U' F U R U2 R'",
      "y L F' L' U' L U F U' L'",
      "y' f' L F L' U' L' U L S"
    ],
    "moves": 10,
    "desc": "3x3 - OLL - OLL 39 (Lightning Shapes)"
  },
  {
    "id": "oll_oll_40",
    "name": "OLL 40",
    "title": "3x3 - OLL - OLL 40",
    "group": "OLL - Lightning Shapes",
    "alg": "y R' F R U R' U' F' U R",
    "algs": [
      "y R' F R U R' U' F' U R",
      "y' f R' F' R U R U' R' S'",
      "R r D r' U r D' r' U' R'",
      "y' L' U' L F U F' U' L' U2 L"
    ],
    "moves": 10,
    "desc": "3x3 - OLL - OLL 40 (Lightning Shapes)"
  },
  {
    "id": "oll_oll_41",
    "name": "OLL 41",
    "title": "3x3 - OLL - OLL 41",
    "group": "OLL - Awkward Shapes",
    "alg": "y2 R U R' U R U2 R' F R U R' U' F'",
    "algs": [
      "y2 R U R' U R U2 R' F R U R' U' F'",
      "y2 F U R2 D R' U' R D' R2 F'",
      "y' S U' R' F' U' F U R S'",
      "M U' F' L' U' L U F M'"
    ],
    "moves": 14,
    "desc": "3x3 - OLL - OLL 41 (Awkward Shapes)"
  },
  {
    "id": "oll_oll_42",
    "name": "OLL 42",
    "title": "3x3 - OLL - OLL 42",
    "group": "OLL - Awkward Shapes",
    "alg": "R' U' R U' R' U2 R F R U R' U' F'",
    "algs": [
      "R' U' R U' R' U2 R F R U R' U' F'",
      "y F S' R U R' U' F' U S",
      "y R' F R F' R' F R F' R U R' U' R U R'",
      "y R' U' F2 u' R U R' D R2 B"
    ],
    "moves": 13,
    "desc": "3x3 - OLL - OLL 42 (Awkward Shapes)"
  },
  {
    "id": "oll_oll_43",
    "name": "OLL 43",
    "title": "3x3 - OLL - OLL 43",
    "group": "OLL - P Shapes",
    "alg": "y R' U' F' U F R",
    "algs": [
      "y R' U' F' U F R",
      "y2 F' U' L' U L F",
      "f' L' U' L U f",
      "B' U' R' U R B"
    ],
    "moves": 7,
    "desc": "3x3 - OLL - OLL 43 (P Shapes)"
  },
  {
    "id": "oll_oll_44",
    "name": "OLL 44",
    "title": "3x3 - OLL - OLL 44",
    "group": "OLL - P Shapes",
    "alg": "f R U R' U' f'",
    "algs": [
      "f R U R' U' f'",
      "y2 F U R U' R' F'",
      "y R U B U' B' R'",
      "y' L U F U' F' L'"
    ],
    "moves": 6,
    "desc": "3x3 - OLL - OLL 44 (P Shapes)"
  },
  {
    "id": "oll_oll_45",
    "name": "OLL 45",
    "title": "3x3 - OLL - OLL 45",
    "group": "OLL - T Shapes",
    "alg": "F R U R' U' F'",
    "algs": [
      "F R U R' U' F'",
      "y R' F' U' F U R",
      "y2 f U R U' R' f'",
      "y2 F' L' U' L U F"
    ],
    "moves": 6,
    "desc": "3x3 - OLL - OLL 45 (T Shapes)"
  },
  {
    "id": "oll_oll_46",
    "name": "OLL 46",
    "title": "3x3 - OLL - OLL 46",
    "group": "OLL - C Shapes",
    "alg": "R' U' R' F R F' U R",
    "algs": [
      "R' U' R' F R F' U R",
      "R' F' U' F R U' R' U2 R",
      "y F R U R' U' F' U' R U R' U R U2 R'",
      "l' U2 L2 F' L' F U L' U l"
    ],
    "moves": 8,
    "desc": "3x3 - OLL - OLL 46 (C Shapes)"
  },
  {
    "id": "oll_oll_47",
    "name": "OLL 47",
    "title": "3x3 - OLL - OLL 47",
    "group": "OLL - L Shapes",
    "alg": "y' F R' F' R U2 R U' R' U R U2 R'",
    "algs": [
      "y' F R' F' R U2 R U' R' U R U2 R'",
      "F' L' U' L U L' U' L U F",
      "R' U' R' F R F' R' F R F' U R",
      "y' R' F' U' F U F' U' F U R"
    ],
    "moves": 13,
    "desc": "3x3 - OLL - OLL 47 (L Shapes)"
  },
  {
    "id": "oll_oll_48",
    "name": "OLL 48",
    "title": "3x3 - OLL - OLL 48",
    "group": "OLL - L Shapes",
    "alg": "F R U R' U' R U R' U' F'",
    "algs": [
      "F R U R' U' R U R' U' F'",
      "y2 f U R U' R' U R U' R' f'",
      "R U2 R' U' R U R' U2 R' F R F'",
      "F R' F' U2 R U R' U R2 U2 R'"
    ],
    "moves": 10,
    "desc": "3x3 - OLL - OLL 48 (L Shapes)"
  },
  {
    "id": "oll_oll_49",
    "name": "OLL 49",
    "title": "3x3 - OLL - OLL 49",
    "group": "OLL - L Shapes",
    "alg": "y2 r U' r2 U r2 U r2 U' r",
    "algs": [
      "y2 r U' r2 U r2 U r2 U' r",
      "l U' l2 U l2 U l2 U' l",
      "R B' R2 F R2 B R2 F' R",
      "y2 R' F R' F' R2 U2 B' R B R'"
    ],
    "moves": 10,
    "desc": "3x3 - OLL - OLL 49 (L Shapes)"
  },
  {
    "id": "oll_oll_50",
    "name": "OLL 50",
    "title": "3x3 - OLL - OLL 50",
    "group": "OLL - L Shapes",
    "alg": "r' U r2 U' r2 U' r2 U r'",
    "algs": [
      "r' U r2 U' r2 U' r2 U r'",
      "y2 R' F R2 B' R2 F' R2 B R'",
      "y' R U2 R' U' R U' R' F R U R' U' F'",
      "y2 l' U l2 U' l2 U' l2 U l'"
    ],
    "moves": 9,
    "desc": "3x3 - OLL - OLL 50 (L Shapes)"
  },
  {
    "id": "oll_oll_51",
    "name": "OLL 51",
    "title": "3x3 - OLL - OLL 51",
    "group": "OLL - Line Shapes",
    "alg": "y2 F U R U' R' U R U' R' F'",
    "algs": [
      "y2 F U R U' R' U R U' R' F'",
      "f R U R' U' R U R' U' f'",
      "y' R' U' R' F R F' R U' R' U2 R",
      "y r' F' U' F U F' U' F U r"
    ],
    "moves": 11,
    "desc": "3x3 - OLL - OLL 51 (Line Shapes)"
  },
  {
    "id": "oll_oll_52",
    "name": "OLL 52",
    "title": "3x3 - OLL - OLL 52",
    "group": "OLL - Line Shapes",
    "alg": "y2 R' F' U' F U' R U R' U R",
    "algs": [
      "y2 R' F' U' F U' R U R' U R",
      "R U R' U R U' B U' B' R'",
      "R U R' U R d' R U' R' F'",
      "R U R' U R U' y R U' R' F'"
    ],
    "moves": 11,
    "desc": "3x3 - OLL - OLL 52 (Line Shapes)"
  },
  {
    "id": "oll_oll_53",
    "name": "OLL 53",
    "title": "3x3 - OLL - OLL 53",
    "group": "OLL - L Shapes",
    "alg": "r' U' R U' R' U R U' R' U2 r",
    "algs": [
      "r' U' R U' R' U R U' R' U2 r",
      "y2 l' U' L U' L' U L U' L' U2 l",
      "y r' U2 R U R' U' R U R' U r",
      "y' l' U2 L U L' U' L U L' U l"
    ],
    "moves": 11,
    "desc": "3x3 - OLL - OLL 53 (L Shapes)"
  },
  {
    "id": "oll_oll_54",
    "name": "OLL 54",
    "title": "3x3 - OLL - OLL 54",
    "group": "OLL - L Shapes",
    "alg": "r U R' U R U' R' U R U2 r'",
    "algs": [
      "r U R' U R U' R' U R U2 r'",
      "y' r U2 R' U' R U R' U' R U' r'",
      "y' r U r' R U R' U' R U R' U' r U' r'",
      "y2 l U L' U L U' L' U L U2 l'"
    ],
    "moves": 11,
    "desc": "3x3 - OLL - OLL 54 (L Shapes)"
  },
  {
    "id": "oll_oll_55",
    "name": "OLL 55",
    "title": "3x3 - OLL - OLL 55",
    "group": "OLL - Line Shapes",
    "alg": "y R' F U R U' R2 F' R2 U R' U' R",
    "algs": [
      "y R' F U R U' R2 F' R2 U R' U' R",
      "y R' F R U R U' R2 F' R2 U' R' U R U R'",
      "R U2 R2 U' R U' R' U2 F R F'",
      "r U2 R2 F R F' U2 r' F R F'"
    ],
    "moves": 13,
    "desc": "3x3 - OLL - OLL 55 (Line Shapes)"
  },
  {
    "id": "oll_oll_56",
    "name": "OLL 56",
    "title": "3x3 - OLL - OLL 56",
    "group": "OLL - Line Shapes",
    "alg": "r U r' U R U' R' U R U' R' r U' r'",
    "algs": [
      "r U r' U R U' R' U R U' R' r U' r'",
      "r U r' U R U' R' M' U R U2 r'",
      "F R U R' U' R F' r U R' U' r'",
      "r' U' r U' R' U R U' R' U R r' U r"
    ],
    "moves": 14,
    "desc": "3x3 - OLL - OLL 56 (Line Shapes)"
  },
  {
    "id": "oll_oll_57",
    "name": "OLL 57",
    "title": "3x3 - OLL - OLL 57",
    "group": "OLL - All Corners Oriented",
    "alg": "R U R' U' M' U R U' r'",
    "algs": [
      "R U R' U' M' U R U' r'",
      "y R U' R' S' R U R' S",
      "y R U R' S' R U' R' S",
      "R U R' U' R' r U R U' r'"
    ],
    "moves": 9,
    "desc": "3x3 - OLL - OLL 57 (All Corners Oriented)"
  },
  {
    "id": "f2l_f2l_1",
    "name": "F2L 1",
    "title": "3x3 - F2L - F2L 1",
    "group": "F2L - Free Pairs",
    "alg": "U R U' R'",
    "algs": [
      "U R U' R'",
      "R' F R F'",
      "y' r' U' R U M'",
      "y U F' L F L2 U L",
      "F' r U r'",
      "d R U' R'",
      "F' L F L'",
      "y' U R U' R'",
      "U L U' L'",
      "L' f U f'",
      "U2 L U2 L'",
      "U' r U B' U' B r'",
      "U f R' f'",
      "r' U' R U M'",
      "d L U' L'",
      "y' U L U' L'"
    ],
    "moves": 4,
    "desc": "3x3 - F2L - F2L 1 (Free Pairs)"
  },
  {
    "id": "f2l_f2l_2",
    "name": "F2L 2",
    "title": "3x3 - F2L - F2L 2",
    "group": "F2L - Free Pairs",
    "alg": "F R' F' R",
    "algs": [
      "F R' F' R",
      "y' U' R' U R",
      "U' F' U F",
      "y U' L' U L",
      "U' L' U L",
      "L F' L' F",
      "r U' r' F",
      "U r' U' F U F' r",
      "l U L' U' M'",
      "U' f' L f",
      "d' R' U R",
      "y' U' L' U L",
      "U' R' U R",
      "R f' U' f",
      "U2 R' U2 R",
      "U R' F' U F U' R"
    ],
    "moves": 4,
    "desc": "3x3 - F2L - F2L 2 (Free Pairs)"
  },
  {
    "id": "f2l_f2l_3",
    "name": "F2L 3",
    "title": "3x3 - F2L - F2L 3",
    "group": "F2L - Free Pairs",
    "alg": "F' U' F",
    "algs": [
      "F' U' F",
      "y' R' U' R",
      "y L' U' L",
      "S U R U' R' S'",
      "L' U' L",
      "U2 R' F R U R' F' R",
      "y' S U R U' R' S'",
      "U S' F U' F' U S",
      "y R' U' R",
      "f' L' f",
      "f' r' U z",
      "U' R U B' U' B R'",
      "R' U' R",
      "U2 r' R' F R F' r",
      "U S f R' f' U S'",
      "U f2 F' R' f' U S'"
    ],
    "moves": 3,
    "desc": "3x3 - F2L - F2L 3 (Free Pairs)"
  },
  {
    "id": "f2l_f2l_4",
    "name": "F2L 4",
    "title": "3x3 - F2L - F2L 4",
    "group": "F2L - Free Pairs",
    "alg": "R U R'",
    "algs": [
      "R U R'",
      "y' f R f'",
      "y F U F'",
      "y2 L U L'",
      "F U F'",
      "y L U L'",
      "S' L F' L' f",
      "U' M L' U L U' M'",
      "L U L'",
      "r B r'",
      "U f R U R' U2 f' r x'",
      "y2 R U R'",
      "f R f'",
      "y' L U L'",
      "y R U R'",
      "U' r R2 U R U' M"
    ],
    "moves": 3,
    "desc": "3x3 - F2L - F2L 4 (Free Pairs)"
  },
  {
    "id": "f2l_f2l_5",
    "name": "F2L 5",
    "title": "3x3 - F2L - F2L 5",
    "group": "F2L - Disconnected Pairs",
    "alg": "U' R U R' U2 R U' R'",
    "algs": [
      "U' R U R' U2 R U' R'",
      "F2 L' U' L U F2",
      "U' R U R' U' R U2 R'",
      "U' R U R' U R' F R F'",
      "U R' F r U' r' F' R",
      "U2 F R U R' U2 F'",
      "U l' U L U' L' U' l",
      "y' U' R U R' U2 R U' R'",
      "U' L U L' U2 L U' L'",
      "U' L U L' U' L U2 L'",
      "y2 U' R U R' U2 R U' R'",
      "U y' l' U L U' L' U' l",
      "U' R' F R U R' U' F' R",
      "R2 F' U' F U R2",
      "U r' U R U' R' U' r",
      "d' R U R' U2 R U' R'"
    ],
    "moves": 8,
    "desc": "3x3 - F2L - F2L 5 (Disconnected Pairs)"
  },
  {
    "id": "f2l_f2l_6",
    "name": "F2L 6",
    "title": "3x3 - F2L - F2L 6",
    "group": "F2L - Disconnected Pairs",
    "alg": "U' r U' R' U R U r'",
    "algs": [
      "U' r U' R' U R U r'",
      "y' U R' U' R U2 R' U R",
      "d R' U' R U2 R' U R",
      "y U L' U' L U2 L' U L",
      "U L' U' L U2 L' U L",
      "F2 R U R' U' F2",
      "R' F2 R U R' U' F2 U R",
      "U L' U' L U L' U2 L",
      "U r U' r' U' L U F L'",
      "y U R' U' R U R' U2 R",
      "U' l U' L' U L U l'",
      "U L F' L' U' L U F L'",
      "U R' U' R U2 R' U R",
      "U2 R' F' U' F U2 R",
      "y2 U L' U' L U2 L' U L",
      "U' y r U' R' U R U r'"
    ],
    "moves": 8,
    "desc": "3x3 - F2L - F2L 6 (Disconnected Pairs)"
  },
  {
    "id": "f2l_f2l_7",
    "name": "F2L 7",
    "title": "3x3 - F2L - F2L 7",
    "group": "F2L - Disconnected Pairs",
    "alg": "U' R U2 R' U' R U2 R'",
    "algs": [
      "U' R U2 R' U' R U2 R'",
      "M' U' M U2 r U' r'",
      "U' R U2 R' U2 R U' R'",
      "U' R U2 R' U R' F R F'",
      "F U R U2 R' U F'",
      "d' L U2 L' U2 L U' L'",
      "U' F U2 R U' R' U F'",
      "l U2 L2 U' L2 U' l'",
      "U' L U2 L' U2 L U' L'",
      "U' L U2 L' U' L U2 L'",
      "M U' M' U2 l U' l'",
      "r U2 R2 U' R2 U' r'",
      "F R U R2 U' R F'",
      "y' U' L U2 L' U2 L U' L'",
      "y U' R U2 R' U2 R U' R'"
    ],
    "moves": 8,
    "desc": "3x3 - F2L - F2L 7 (Disconnected Pairs)"
  },
  {
    "id": "f2l_f2l_8",
    "name": "F2L 8",
    "title": "3x3 - F2L - F2L 8",
    "group": "F2L - Disconnected Pairs",
    "alg": "r' U2 R2 U R2 U r",
    "algs": [
      "r' U2 R2 U R2 U r",
      "d R' U2 R U R' U2 R",
      "y' U R' U2 R U2 R' U R",
      "y U L' U2 L U2 L' U L",
      "U L' U2 L U L' U2 L",
      "U r' F2 r U2 r' F r",
      "U' R' U2 R U R' U R U2 L' U L",
      "U L' U2 L U' L F' L' F",
      "l' U2 L2 U L2 U l",
      "y U R' U2 R U R' U2 R",
      "d L' U2 L U2 L' U L",
      "f' L' U' L2 U L' f",
      "U R' U2 R U R' U2 R",
      "U R' U2 R U2 R' U R"
    ],
    "moves": 7,
    "desc": "3x3 - F2L - F2L 8 (Disconnected Pairs)"
  },
  {
    "id": "f2l_f2l_9",
    "name": "F2L 9",
    "title": "3x3 - F2L - F2L 9",
    "group": "F2L - Disconnected Pairs",
    "alg": "U' R U' R' U F' U' F",
    "algs": [
      "U' R U' R' U F' U' F",
      "F R U R' U' F' R U' R'",
      "U' R U' R' d R' U' R",
      "d R' U' R U' R' U' R",
      "U L' U' L U' L' U' L",
      "F2 U R U' R' F2",
      "U' F U' F' U L' U' L",
      "L' U L U' L' U' L U2 L' U L",
      "y U R' U' R U' R' U' R",
      "U' L U' L' U f' L' f",
      "d L' U' L U' L' U' L",
      "y U2 R' U R U R' U' R",
      "U R' U' R U' R' U' R",
      "R' U R U' R' U' R U2 R' U R",
      "U2 R' U R U R' U' R",
      "U2 r U R' U R' U' R2 U' r'"
    ],
    "moves": 8,
    "desc": "3x3 - F2L - F2L 9 (Disconnected Pairs)"
  },
  {
    "id": "f2l_f2l_10",
    "name": "F2L 10",
    "title": "3x3 - F2L - F2L 10",
    "group": "F2L - Disconnected Pairs",
    "alg": "U' R U R' U R U R'",
    "algs": [
      "U' R U R' U R U R'",
      "U2 R U' R' U' R U R'",
      "d R' U R d' R U R'",
      "y' U R' U R U' f R f'",
      "U L' U L U' F U F'",
      "F U' R U R' U2 F'",
      "d' L U L' U L U L'",
      "y' U' R U R' U R U R'",
      "U' L U L' U L U L'",
      "U2 L U' L' U' L U L'",
      "L U' L' U L U L' U2 L U' L'",
      "y2 U' R U R' U R U R'",
      "U R' U R U' f R f'",
      "R2 U' F' U F R2",
      "y U' R U R' U R U R'",
      "d' R U R' U R U R'"
    ],
    "moves": 8,
    "desc": "3x3 - F2L - F2L 10 (Disconnected Pairs)"
  },
  {
    "id": "f2l_f2l_11",
    "name": "F2L 11",
    "title": "3x3 - F2L - F2L 11",
    "group": "F2L - Connected Pairs",
    "alg": "U' R U2 R' U F' U' F",
    "algs": [
      "U' R U2 R' U F' U' F",
      "y' R U2 R2 U' R2 U' R'",
      "U' R U2 R' d R' U' R",
      "F' U L' U2 L U2 F",
      "L' U L U' L' U L U2 L' U L",
      "L U2 L2 U' L2 U' L'",
      "F U R U' R' U R U' R' U F'",
      "U' F U2 F' U r' F' r",
      "U' L U2 L' U f' L' f",
      "U' L U2 L' d L' U' L",
      "L U2 L' U' l U' l' U2 l U l'",
      "y R U2 R2 U' R2 U' R'",
      "R U2 R2 U' R2 U' R'",
      "R' U R U' R' U R U2 R' U R",
      "R' U R U' R' U R U R' U2 R",
      "d' R U2 R' U F' U' F"
    ],
    "moves": 8,
    "desc": "3x3 - F2L - F2L 11 (Connected Pairs)"
  },
  {
    "id": "f2l_f2l_12",
    "name": "F2L 12",
    "title": "3x3 - F2L - F2L 12",
    "group": "F2L - Connected Pairs",
    "alg": "R U' R' U R U' R' U2 R U' R'",
    "algs": [
      "R U' R' U R U' R' U2 R U' R'",
      "R' U2 R2 U R2 U R",
      "U F' U2 F U' R U R'",
      "U R U' R' U' R U R' U' R U R'",
      "U L' U2 L U' F U F'",
      "U L' U2 L d' L U L'",
      "L' U2 L U l' U l U2 l' U' l",
      "y' R' U2 R2 U R2 U R",
      "L' U2 L2 U L2 U L",
      "d L' U2 L U' F U F'",
      "U2 R' U2 R U2 L U L' U2 R' U R",
      "L U' L' U L U' L' U2 L U' L'",
      "U R' U2 R U' f R f'",
      "f R' U R2 U' R2 f'",
      "U R' U2 R M U2 R' U R U M'",
      "U R' U2 R d' R U R'"
    ],
    "moves": 11,
    "desc": "3x3 - F2L - F2L 12 (Connected Pairs)"
  },
  {
    "id": "f2l_f2l_13",
    "name": "F2L 13",
    "title": "3x3 - F2L - F2L 13",
    "group": "F2L - Connected Pairs",
    "alg": "y' U R' U R U' R' U' R",
    "algs": [
      "y' U R' U R U' R' U' R",
      "M' U' R U R' U2 R U' r'",
      "R U' R' U R' F R F' R U' R'",
      "d R' U R U' R' U' R",
      "U L' U L U' L' U' L",
      "y' R U' R' U2 R U' R' U F' U F",
      "U L' U L U' L' U L U L' U L",
      "U L F' L2 U' L U L F L'",
      "d L' U L U' L' U' L",
      "y U R' U R U' R' U' R",
      "U f' L f U' f' L' f",
      "U L U' L F' L2 U' L U F U L'",
      "U R' U R U' R' U' R",
      "U R' U R U' R' U R U R' U R"
    ],
    "moves": 9,
    "desc": "3x3 - F2L - F2L 13 (Connected Pairs)"
  },
  {
    "id": "f2l_f2l_14",
    "name": "F2L 14",
    "title": "3x3 - F2L - F2L 14",
    "group": "F2L - Connected Pairs",
    "alg": "U' R U' R' U R U R'",
    "algs": [
      "U' R U' R' U R U R'",
      "R U2 R' U2 R U R' U2 R U' R'",
      "U' R2 D R' U R D' R2",
      "U2 R2 U R' U R U2 R2",
      "d' L U' L' U L U L'",
      "y U' L U' L' U L U L'",
      "y' U' R U' R' U R U R'",
      "M' U L' U' L U2 L' U l",
      "U' L U' L' U L U L'",
      "U' L U' L' U L U' L' U' L U' L'",
      "y U' R U' R' U R U R'",
      "d' R U' R' U R U R'",
      "U' f R' f' U f R f'",
      "y' U' L U' L' U L U L'"
    ],
    "moves": 8,
    "desc": "3x3 - F2L - F2L 14 (Connected Pairs)"
  },
  {
    "id": "f2l_f2l_15",
    "name": "F2L 15",
    "title": "3x3 - F2L - F2L 15",
    "group": "F2L - Connected Pairs",
    "alg": "M U r U' r' U' M'",
    "algs": [
      "M U r U' r' U' M'",
      "R' D' R U' R' D R U R U' R'",
      "R U R' U2 R U' R' U R U' R'",
      "F' U F U2 R U R'",
      "F U2 R U R' U F'",
      "L' U L U2 F U F'",
      "L' U L U2 y L U L'",
      "U L' l U' l' U l U l' U L",
      "L U L' U2 L U' L' U L U' L'",
      "M' U l U' l' U' M",
      "f' L f U2 L U L'",
      "L U2 L' U L U L' U L U' L'",
      "R' U R U2 f R f'",
      "R2 F R F' R U R' U2 R",
      "R' U R U' d' R U R'",
      "R2 F R F' R U2 R' U R"
    ],
    "moves": 7,
    "desc": "3x3 - F2L - F2L 15 (Connected Pairs)"
  },
  {
    "id": "f2l_f2l_16",
    "name": "F2L 16",
    "title": "3x3 - F2L - F2L 16",
    "group": "F2L - Connected Pairs",
    "alg": "R U' R' U2 F' U' F",
    "algs": [
      "R U' R' U2 F' U' F",
      "R U' R' U2 y' R' U' R",
      "U M' U R U' r' U' R U R'",
      "U F U R U' R' F' R U R'",
      "F U' R U' R' U2 F'",
      "L' U' L U2 L' U L U' L' U L",
      "L' U2 L U' L' U' L U' L' U L",
      "M U' l' U l U M'",
      "L U' L' U2 f' L' f",
      "L2 F' L' F L' U2 L U' L'",
      "L U' L' y U2 R' U' R",
      "L U' L' U' d' R' U' R",
      "R' U' R U2 R' U R U' R' U R",
      "M' U' r' U r U M",
      "U2 R' U' R U R D R' U' R D' R'",
      "F R' F' R U2 R' U' R2 U' R'"
    ],
    "moves": 7,
    "desc": "3x3 - F2L - F2L 16 (Connected Pairs)"
  },
  {
    "id": "f2l_f2l_17",
    "name": "F2L 17",
    "title": "3x3 - F2L - F2L 17",
    "group": "F2L - Connected Pairs",
    "alg": "R U2 R' U' R U R'",
    "algs": [
      "R U2 R' U' R U R'",
      "y2 L U2 L' U' L U L'",
      "R U R' U' R U2 R' U2 R U R'",
      "y L F' L' F L' U L U' L' U L",
      "L F' L' F L' U L U' L' U L",
      "y L U2 L' U' L U L'",
      "L' U2 L U2 l' U L U' L' U' l",
      "y' R U2 R' U' R U R'",
      "L U2 L' U' L U L'",
      "L U L' U' L U2 L' U2 L U L'",
      "R' U2 F R U R' U' F' R",
      "y' L U2 L' U' L U L'",
      "y R U2 R' U' R U R'",
      "l U' R' U l' U R U' R' U R"
    ],
    "moves": 7,
    "desc": "3x3 - F2L - F2L 17 (Connected Pairs)"
  },
  {
    "id": "f2l_f2l_18",
    "name": "F2L 18",
    "title": "3x3 - F2L - F2L 18",
    "group": "F2L - Connected Pairs",
    "alg": "y' R' U2 R U R' U' R",
    "algs": [
      "y' R' U2 R U R' U' R",
      "y L' U2 L U L' U' L",
      "F' U2 F U F' U' F",
      "R' F R F' R U' R' U R U' R'",
      "L' U2 L U L' U' L",
      "y R' U2 R U R' U' R",
      "U F U R U' R' F' L U L'",
      "L U2 F' L' U' L U F L'",
      "L U2 L' U2 l U' L' U L U l'",
      "R' U2 R U R' U' R"
    ],
    "moves": 8,
    "desc": "3x3 - F2L - F2L 18 (Connected Pairs)"
  },
  {
    "id": "f2l_f2l_19",
    "name": "F2L 19",
    "title": "3x3 - F2L - F2L 19",
    "group": "F2L - Disconnected Pairs",
    "alg": "U R U2 R' U R U' R'",
    "algs": [
      "U R U2 R' U R U' R'",
      "U R U2 R2 F R F'",
      "d f R2 f' U f R' f'",
      "R U' R' U R U' R' U R U R'",
      "U L' U L2 F' L' F L' U L",
      "d R U2 R' U R U' R'",
      "y' U R U2 R' U R U' R'",
      "y U L U2 L' U L U' L'",
      "U L U2 L' U L U' L'",
      "L U' L' U L U' L' U L U L'",
      "y U R U2 R' U R U' R'",
      "U R' F' U2 F R U R' U' R",
      "d L U2 L' U L U' L'",
      "U2 f R2 U R2 U' R f'"
    ],
    "moves": 8,
    "desc": "3x3 - F2L - F2L 19 (Disconnected Pairs)"
  },
  {
    "id": "f2l_f2l_20",
    "name": "F2L 20",
    "title": "3x3 - F2L - F2L 20",
    "group": "F2L - Disconnected Pairs",
    "alg": "y' U' R' U2 R U' R' U R",
    "algs": [
      "y' U' R' U2 R U' R' U R",
      "U' R U' R2 F R F' R U' R'",
      "y U' L' U2 L U' L' U L",
      "U' F' U2 F U' F' U F",
      "U' L' U2 L U' L' U L",
      "L' U L U' L' U L U' L' U' L",
      "U' L' U2 L2 F' L' F",
      "y U' R' U2 R U' R' U R",
      "U' L F U2 F' L' U' L U L'",
      "d' R' U2 R U' R' U R",
      "U' L U L' U l U' l' U2 l U l'",
      "U' R' U2 R U' R' U R",
      "R' U R U' R' U R U' R' U' R"
    ],
    "moves": 9,
    "desc": "3x3 - F2L - F2L 20 (Disconnected Pairs)"
  },
  {
    "id": "f2l_f2l_21",
    "name": "F2L 21",
    "title": "3x3 - F2L - F2L 21",
    "group": "F2L - Disconnected Pairs",
    "alg": "U2 R U R' U R U' R'",
    "algs": [
      "U2 R U R' U R U' R'",
      "R U' R' U2 R U R'",
      "R B U2 B' R'",
      "y' f R' f' U2 f R f'",
      "l' U l U2 l' U' l",
      "F R U2 R' F'",
      "y U2 L U L' U L U' L'",
      "y L U' L' U2 L U L'",
      "L U' L' U2 L U L'",
      "U2 L U L' U L U' L'",
      "l U' L' U2 L U l'",
      "L F U2 F' L'",
      "r' U r U2 r' U' r",
      "y' U2 L U L' U L U' L'",
      "U2 R' U' R S R f' U' F",
      "U f U R U' R f'"
    ],
    "moves": 8,
    "desc": "3x3 - F2L - F2L 21 (Disconnected Pairs)"
  },
  {
    "id": "f2l_f2l_22",
    "name": "F2L 22",
    "title": "3x3 - F2L - F2L 22",
    "group": "F2L - Disconnected Pairs",
    "alg": "r U' r' U2 r U r'",
    "algs": [
      "r U' r' U2 r U r'",
      "F' L' U2 L F",
      "y' U2 R' U' R U' R' U R",
      "y U2 L' U' L U' L' U L",
      "L' U L U2 L' U' L",
      "U2 L' U' L U' L' U L",
      "r' U' F2 U r",
      "U' L' U L U2 L' U L U' L' U L",
      "l U' l' U2 l U l'",
      "f' U' L2 U f",
      "y R' U R U2 R' U' R",
      "y U2 R' U' R U' R' U R",
      "R' U R U2 R' U' R",
      "U2 R' U' R U' R' U R",
      "R' F' U2 F R",
      "U' R' U R U2 R' U R U' R' U R"
    ],
    "moves": 7,
    "desc": "3x3 - F2L - F2L 22 (Disconnected Pairs)"
  },
  {
    "id": "f2l_f2l_23",
    "name": "F2L 23",
    "title": "3x3 - F2L - F2L 23",
    "group": "F2L - Connected Pairs",
    "alg": "U R U' R' U' R U' R' U R U' R'",
    "algs": [
      "U R U' R' U' R U' R' U R U' R'",
      "R U R' U2 R U R' U' R U R'",
      "U2 R2 U2 R' U' R U' R2",
      "R U' R2 D' R U2 R' D R",
      "F' U' L' U L F L' U L",
      "U L' U' L2 F' L' F L' U L",
      "F U' R U R' U R U2 R' F'",
      "U' F R U' R' F' L' U' L",
      "U L U' L' U' L U' L' U L U' L'",
      "L U L' U2 L U L' U' L U L'",
      "L' U' L U' L' U2 L2 U2 L'",
      "U2 L2 U2 L' U' L U' L2",
      "U R' F R' F' R2 U' R' U R",
      "U2 l' U' L U' L' U2 B' l",
      "R' F' U' F U2 R U' R' U' R",
      "U R' U' F' U F R U' R' U R"
    ],
    "moves": 12,
    "desc": "3x3 - F2L - F2L 23 (Connected Pairs)"
  },
  {
    "id": "f2l_f2l_24",
    "name": "F2L 24",
    "title": "3x3 - F2L - F2L 24",
    "group": "F2L - Connected Pairs",
    "alg": "F U R U' R' F' R U' R'",
    "algs": [
      "F U R U' R' F' R U' R'",
      "U' R U R2 F R F' R U' R'",
      "y' R' U' R U2 R' U' R U R' U' R",
      "U F' L' U L F R U R'",
      "U' L' U L U L' U L U' L' U L",
      "U' F' r U r' U' L' U' L",
      "L' U L U L' U' L U2 L' U' L",
      "F U' R U2 R' U R U2 R' F'",
      "U2 r U R' U R U2 B r'",
      "U' L F' L F L2 U L U' L'",
      "U2 F U R U' R' F' U2 L U' L'",
      "y U' R' U R U R' U R U' R' U R",
      "R' U' R U2 R' U' R U R' U' R",
      "U2 R2 U2 R U R' U R2",
      "R U R' U R U2 R2 U2 R",
      "U' R' U R U R' U R U' R' U R"
    ],
    "moves": 9,
    "desc": "3x3 - F2L - F2L 24 (Connected Pairs)"
  },
  {
    "id": "f2l_f2l_25",
    "name": "F2L 25",
    "title": "3x3 - F2L - F2L 25",
    "group": "F2L - Corner In Slot",
    "alg": "U' R' F R F' R U R'",
    "algs": [
      "U' R' F R F' R U R'",
      "R' F' R U R U' R' F",
      "U' F' U F U R U' R'",
      "l' U' l U l F' l' F",
      "U' L' U L F' r U r'",
      "U' L' U L d R U' R'",
      "U' L' U L F' L F L'",
      "U' L' U L y U L U' L'",
      "R D' R' U' R D R' L U L'",
      "L U' L' U' L U' L' U L U L'",
      "U' f' L' f U L U L'",
      "L' U' L' U' L' U L U L",
      "U' R' U M U' R U M'",
      "R' S' R U' R' S R",
      "U' R' U R r' U' R U M'",
      "d' R' F R F' R U R'"
    ],
    "moves": 8,
    "desc": "3x3 - F2L - F2L 25 (Corner In Slot)"
  },
  {
    "id": "f2l_f2l_26",
    "name": "F2L 26",
    "title": "3x3 - F2L - F2L 26",
    "group": "F2L - Corner In Slot",
    "alg": "U R U' R' F R' F' R",
    "algs": [
      "U R U' R' F R' F' R",
      "R S' R' U R S R'",
      "U R U R' U' y L' U' L",
      "U R U' R' U' F' U F",
      "r U r' U' r' F r F'",
      "U L F' L' F L' U' L",
      "U F L' U' L U L F' L'",
      "U F r' F' r U r U' r'",
      "L S L' U L S' L'",
      "F R2 u R u' R2 F'",
      "U' R u R' U R U' u' R'",
      "R E' R' U R E R'",
      "U f R f' U' R' U' R",
      "R' U R U R' U R U' R' U' R",
      "R U R U R U' R' U' R'",
      "U' R S2 R' U' R S2 R'"
    ],
    "moves": 8,
    "desc": "3x3 - F2L - F2L 26 (Corner In Slot)"
  },
  {
    "id": "f2l_f2l_27",
    "name": "F2L 27",
    "title": "3x3 - F2L - F2L 27",
    "group": "F2L - Corner In Slot",
    "alg": "R U' R' U R U' R'",
    "algs": [
      "R U' R' U R U' R'",
      "F' U' F U2 R U' R'",
      "y' f R' f' U f R' f'",
      "y' f R' f' r' U' R U M'",
      "L' U' L U F' r U r'",
      "L' U' L U F' L F L'",
      "y' R U' R' U R U' R'",
      "U' F R U2 R' U F'",
      "L U' L' U L U' L'",
      "R' U2 R' F R F' R",
      "R' U' R U r' U' R U M'",
      "y R U' R' U R U' R'",
      "R' U' R U f' U f R'"
    ],
    "moves": 7,
    "desc": "3x3 - F2L - F2L 27 (Corner In Slot)"
  },
  {
    "id": "f2l_f2l_28",
    "name": "F2L 28",
    "title": "3x3 - F2L - F2L 28",
    "group": "F2L - Corner In Slot",
    "alg": "R U R' U' F R' F' R",
    "algs": [
      "R U R' U' F R' F' R",
      "y L' U L U' L' U L",
      "F' U F U' F' U F",
      "y' R' U R U' R' U R",
      "L' U L U' L' U L",
      "L' U L2 F' L' F",
      "L U2 L F' L' F L'",
      "y R' U R U' R' U R",
      "L U L' U' l U L' U' M'",
      "L U2 L' U f' L f",
      "R' U R U' R' U R"
    ],
    "moves": 8,
    "desc": "3x3 - F2L - F2L 28 (Corner In Slot)"
  },
  {
    "id": "f2l_f2l_29",
    "name": "F2L 29",
    "title": "3x3 - F2L - F2L 29",
    "group": "F2L - Corner In Slot",
    "alg": "R' F R F' U R U' R'",
    "algs": [
      "R' F R F' U R U' R'",
      "y L' U' L U L' U' L",
      "y' R' U' R U R' U' R",
      "R' F R F' R' F R F'",
      "L' U' L U L' U' L",
      "U L' U2 L U2 L' U' L",
      "U F' L F L2 U' L",
      "F' L F L' F' L F L'",
      "y R' U' R U R' U' R",
      "U2 L U' L' f' L' f",
      "f' L' f U f' L' f",
      "x' U' F' U F U' F' U x",
      "R' U' R U R' U' R",
      "U R' U2 R U2 R' U' R",
      "U f' U f R2 U' R"
    ],
    "moves": 8,
    "desc": "3x3 - F2L - F2L 29 (Corner In Slot)"
  },
  {
    "id": "f2l_f2l_30",
    "name": "F2L 30",
    "title": "3x3 - F2L - F2L 30",
    "group": "F2L - Corner In Slot",
    "alg": "R U R' U' R U R'",
    "algs": [
      "R U R' U' R U R'",
      "U' R U2 R' U2 R U R'",
      "U' F R' F' R2 U R'",
      "U2 F' U F R U R'",
      "L F' L' F U' L' U L",
      "y' R U R' U' R U R'",
      "U' F U' R U2 R' F'",
      "y L U L' U' L U L'",
      "L U L' U' L U L'",
      "U' L U2 L' U2 L U L'",
      "y' L U L' U' L U L'",
      "f R f' U' f R f'",
      "U2 R' U R f R f'",
      "y R U R' U' R U R'"
    ],
    "moves": 7,
    "desc": "3x3 - F2L - F2L 30 (Corner In Slot)"
  },
  {
    "id": "f2l_f2l_31",
    "name": "F2L 31",
    "title": "3x3 - F2L - F2L 31",
    "group": "F2L - Edge In Slot",
    "alg": "U' R' F R F' R U' R'",
    "algs": [
      "U' R' F R F' R U' R'",
      "R U' R' U y' R' U R",
      "F' U F R U2 R'",
      "R U' R' U y L' U L",
      "U L F' L' F L' U L",
      "L' U L U' y L U' L'",
      "L' U L F U2 F'",
      "U' F' L F L' F U' F'",
      "L U' L F' L' F L'",
      "f' L f U' L U' L'",
      "B' U B L U2 L'",
      "L U2 L' U' l U L' U' M'",
      "R' U R' F R F' R",
      "R' U R f R2 f'",
      "R' U R y R U2 R'",
      "f R' f' U R' U R"
    ],
    "moves": 8,
    "desc": "3x3 - F2L - F2L 31 (Edge In Slot)"
  },
  {
    "id": "f2l_f2l_32",
    "name": "F2L 32",
    "title": "3x3 - F2L - F2L 32",
    "group": "F2L - Edge In Slot",
    "alg": "U R U' R' U R U' R' U R U' R'",
    "algs": [
      "U R U' R' U R U' R' U R U' R'",
      "R U R' U' R U R' U' R U R'",
      "R2 U R2 U R2 U2 R2",
      "U' F R' F' R U' R U R'",
      "U' L' U L U' L' U L U' L' U L",
      "U L' U L U' L' U2 L U L' U' L",
      "U2 F U' R U R' U F'",
      "L' U' L U L' U' L U L' U' L",
      "L U L' U' L U L' U' L U L'",
      "U L U' L' U L U' L' U L U' L'",
      "L2 U L2 U L2 U2 L2",
      "U' L U' L' U L U2 L' U' L U L'",
      "U' R' U R U' R' U R U' R' U R",
      "R' U' R U R' U' R U R' U' R",
      "U2 f R' U R U' R f'",
      "R2 U' R2 U' R2 U2 R2"
    ],
    "moves": 12,
    "desc": "3x3 - F2L - F2L 32 (Edge In Slot)"
  },
  {
    "id": "f2l_f2l_33",
    "name": "F2L 33",
    "title": "3x3 - F2L - F2L 33",
    "group": "F2L - Edge In Slot",
    "alg": "U' R U' R' U2 R U' R'",
    "algs": [
      "U' R U' R' U2 R U' R'",
      "y R' D R U' R' D' R",
      "R U R' U' R U' R' U R U' R'",
      "U' R U' R' U' R U2 R'",
      "R' D R U' R' D' R",
      "U L' U2 L U' L' U' L",
      "U' L D L' U L D' L'",
      "U' L' U' L U2 L' U' L",
      "U' L U' L' U2 L U' L'",
      "U' L U' L' U' L U2 L'",
      "D' R D R' U R D' R' D",
      "U' R D R' U R D' R'",
      "U R' U2 R U' R' U' R",
      "U' R' U' R U2 R' U' R",
      "U R D R' U' R D' R'"
    ],
    "moves": 8,
    "desc": "3x3 - F2L - F2L 33 (Edge In Slot)"
  },
  {
    "id": "f2l_f2l_34",
    "name": "F2L 34",
    "title": "3x3 - F2L - F2L 34",
    "group": "F2L - Edge In Slot",
    "alg": "U R U R' U2 R U R'",
    "algs": [
      "U R U R' U2 R U R'",
      "U' R U2 R' U R U R'",
      "U R' D' R U' R' D R",
      "y U L' U L U2 L' U L",
      "U L' U L U2 L' U L",
      "U L' U L U L' U2 L",
      "L' U' L U L' U L U' L' U L",
      "U L U L' U2 L U L'",
      "U L' D' L U' L' D L",
      "U' L U2 L' U L U L'",
      "U2 R D' R' U' R D R'",
      "U R' U R U R' U2 R",
      "U f R2 U R2 U' f'",
      "U R2 F R F' R U' R' U R",
      "U R' U R U2 R' U R"
    ],
    "moves": 8,
    "desc": "3x3 - F2L - F2L 34 (Edge In Slot)"
  },
  {
    "id": "f2l_f2l_35",
    "name": "F2L 35",
    "title": "3x3 - F2L - F2L 35",
    "group": "F2L - Edge In Slot",
    "alg": "U' R U R' U F' U' F",
    "algs": [
      "U' R U R' U F' U' F",
      "U' R U R' d R' U' R",
      "U2 R U R' F R' F' R",
      "U' R U R' U y' R' U' R",
      "U2 F U F' U' L' U L",
      "U2 L F' L' F U2 L' U' L",
      "U' F R' F R F' U F'",
      "U' F U F' U L' U' L",
      "U' L U L' U f' L' f",
      "U2 L U L' U' L F U F' L'",
      "L U L' y R' U' R U R' U' R",
      "U2 L U M U L' U' M'",
      "U' f R f' U R' U' R",
      "R' F R' F' R U R U' R' U' R",
      "U2 f R f' U' R' U R",
      "U' R' F' U F U' R U R' U' R"
    ],
    "moves": 8,
    "desc": "3x3 - F2L - F2L 35 (Edge In Slot)"
  },
  {
    "id": "f2l_f2l_36",
    "name": "F2L 36",
    "title": "3x3 - F2L - F2L 36",
    "group": "F2L - Edge In Slot",
    "alg": "U F' U' F U' R U R'",
    "algs": [
      "U F' U' F U' R U R'",
      "U2 R' F R F' U2 R U R'",
      "R U R' U R U R' U' F' U' F",
      "R2 u R U R' U' u' R' U R'",
      "U L' U' L d' L U L'",
      "U L' U' L U' F U F'",
      "U2 L' U L U F U F'",
      "U2 L' U' L F' r U r'",
      "U f' L' f U' L U L'",
      "U2 f' L' f U L U' L'",
      "L F' L F L' U' L' U L U L'",
      "y U R' U' R U' f R f'",
      "U R' U' R U' f R f'",
      "U2 R' U' R U R' F' U' F R",
      "U R' U' R y U' R U R'",
      "U R' U' R U' y R U R'"
    ],
    "moves": 8,
    "desc": "3x3 - F2L - F2L 36 (Edge In Slot)"
  },
  {
    "id": "f2l_f2l_37",
    "name": "F2L 37",
    "title": "3x3 - F2L - F2L 37",
    "group": "F2L - Pieces In Slot",
    "alg": "R2 U2 F R2 F' U2 R' U R'",
    "algs": [
      "R2 U2 F R2 F' U2 R' U R'",
      "R' F R F' R U' R' U R U' R' U2 R U' R'",
      "R U2 R' U R U2 R' U F' U' F",
      "R U R' U2 R U2 R' U y' R' U' R",
      "L2 U2 F' L2 F U2 L U' L",
      "L' U2 L U' L' U2 L U' F U F'",
      "L' U' L U2 L' U2 L U' y' R U R'",
      "R' F R L' U' L U' R' F R L' U' L",
      "L U' L' l' U2 L2 U L2 U l",
      "f' L f U' L U2 L' U2 L U' L'",
      "L U2 L' U L U2 L' U f' L' f",
      "L' f U f' L' U2 L2 U L2 U L",
      "R' U R r U2 R2 U' R2 U' r'",
      "R' U2 R U' R' U2 R U' f R f'",
      "R' U R f R U R2 U' R f'",
      "R' U' R U2 R' U2 R U' f R f'"
    ],
    "moves": 9,
    "desc": "3x3 - F2L - F2L 37 (Pieces In Slot)"
  },
  {
    "id": "f2l_f2l_38",
    "name": "F2L 38",
    "title": "3x3 - F2L - F2L 38",
    "group": "F2L - Pieces In Slot",
    "alg": "R U' R' U' R U R' U2 R U' R'",
    "algs": [
      "R U' R' U' R U R' U2 R U' R'",
      "R U R' U' R U2 R' U' R U R'",
      "R2 U2 R' U' R U' R' U2 R'",
      "R U' R' U' R U R' U' R U2 R'",
      "L' U L U' L' U2 L U' L' U L",
      "F R U2 R' U' R U R' U2 F'",
      "L' U2 L' U' L U' L' U2 L2",
      "F U' R U2 R' U' R U2 R' F'",
      "L U L' U' L U2 L' U' L U L'",
      "L2 U2 L' U' L U' L' U2 L'",
      "L U' L' U' L U L' U' L U2 L'",
      "L U' L' U' L U L' U2 L U' L'",
      "R' U' R U2 R' U R U' R' U' R",
      "R' U R U' R' U2 R U' R' U R",
      "R' U2 R' U' R U' R' U2 R2"
    ],
    "moves": 11,
    "desc": "3x3 - F2L - F2L 38 (Pieces In Slot)"
  },
  {
    "id": "f2l_f2l_39",
    "name": "F2L 39",
    "title": "3x3 - F2L - F2L 39",
    "group": "F2L - Pieces In Slot",
    "alg": "R U' R' U R U2 R' U R U' R'",
    "algs": [
      "R U' R' U R U2 R' U R U' R'",
      "R U2 R U R' U R U2 R2",
      "R U R' U2 R U' R' U R U R'",
      "R U2 R' U R U' R' U R U R'",
      "L' U' L U L' U2 L U L' U' L",
      "F' L F L2 U2 L U L' U' L",
      "L' U L U L' U' L U2 L' U L",
      "F U2 R U' R' U R U2 R' F'",
      "L U L' U2 L U' L' U L U L'",
      "L U' L' U L U2 L' U L U' L'",
      "L U2 L' U L U' L' U L U L'",
      "L U2 L U L' U L U2 L2",
      "R' U' R U R' U2 R U R' U' R",
      "R' U R U R' U' R U2 R' U R",
      "f R2 U R' U' F R' f' U F'",
      "R2 U2 R U R' U R U2 R"
    ],
    "moves": 11,
    "desc": "3x3 - F2L - F2L 39 (Pieces In Slot)"
  },
  {
    "id": "f2l_f2l_40",
    "name": "F2L 40",
    "title": "3x3 - F2L - F2L 40",
    "group": "F2L - Pieces In Slot",
    "alg": "r U' r' U2 r U r' R U R'",
    "algs": [
      "r U' r' U2 r U r' R U R'",
      "F' L' U2 L F R U R'",
      "R U' R' F R U R' U' F' R U' R'",
      "R U' R' U' R U' R' U y' R' U' R",
      "L' U L F R U2 R' F'",
      "L' U L l' U l U2 l' U' l",
      "L' U L R' F R U2 R' F' R",
      "L' U L U2 y L U L' U L U' L'",
      "l U' l' U2 l U l' L U L'",
      "f' L f L F U2 F' L'",
      "f' L f U2 L U L' U L U' L'",
      "f' L f U2 L U L' U2 L U2 L'",
      "R' U R r' U r U2 r' U' r",
      "R' F' U2 F R f R f'",
      "R' U R f U R2 U' f'",
      "R2 F' U' F U R U' R"
    ],
    "moves": 10,
    "desc": "3x3 - F2L - F2L 40 (Pieces In Slot)"
  },
  {
    "id": "f2l_f2l_41",
    "name": "F2L 41",
    "title": "3x3 - F2L - F2L 41",
    "group": "F2L - Pieces In Slot",
    "alg": "R U' R' r U' r' U2 r U r'",
    "algs": [
      "R U' R' r U' r' U2 r U r'",
      "R U' R' F' L' U2 L F",
      "R U R' U' y M U' R' F R U M'",
      "R U R' U' R U' R' U2 y' R' U' R",
      "l' U l U2 l' U' l L' U' L",
      "L' U L U L' U L U' y' R U R'",
      "F R U2 R' F' L' U' L",
      "R' F R U2 R' F' R L' U' L",
      "f' L f U' L U L' U L U L'",
      "L2 F U F' U' L' U L'",
      "L F U2 F' L' f' L' f",
      "L U' L' d' U' R' U' R U' R' U R",
      "r' U r U2 r' U' r R' U' R",
      "R' U R' U' F' U F R2",
      "f R' f' U2 R' U' R U' R' U R",
      "f R' f' U2 R' U' R U2 R' U2 R"
    ],
    "moves": 10,
    "desc": "3x3 - F2L - F2L 41 (Pieces In Slot)"
  },
  {
    "id": "af2l_af2l_1",
    "name": "AF2L 1",
    "title": "3x3 - Advanced F2L - AF2L 1",
    "group": "Advanced F2L - Trapped Corner",
    "alg": "S R' S'",
    "algs": [
      "S R' S'",
      "R U' R' y R U' R'",
      "R U' R' f R' f'",
      "R U' R' U R2 F R F' R",
      "L' U' L U R U' R'",
      "M F' M'",
      "L' R U' R' L",
      "R L' U' L R'",
      "S' L' S",
      "L U' L' y L U' L'",
      "y' L' U' L U R U' R'",
      "L U' L' y' R U' R'",
      "R' U' R U L U' L'",
      "L R' U' R L'",
      "M' f' E",
      "y R U' R2 F' U' F R"
    ],
    "moves": 3,
    "desc": "3x3 - Advanced F2L - AF2L 1 (Trapped Corner)"
  },
  {
    "id": "af2l_af2l_2",
    "name": "AF2L 2",
    "title": "3x3 - Advanced F2L - AF2L 2",
    "group": "Advanced F2L - Trapped Corner",
    "alg": "L F' U2 F L'",
    "algs": [
      "L F' U2 F L'",
      "R U' R' L U2 L'",
      "L R U' R' U2 L'",
      "F' L U2 L' F",
      "y' R U' R' L U2 L'",
      "r' U F2 U' r",
      "L' U' L y R U' R'",
      "L' U' L Fw R' Fw'",
      "l U' F2 U l'",
      "L U' L' U' R U' R'",
      "L U' L' R U2 R'",
      "y' r' U F2 U' r",
      "F R' U2 R F'",
      "R' U' R F U' F'",
      "R' U' R y' R U' R'",
      "y R U' R' L U2 L'"
    ],
    "moves": 5,
    "desc": "3x3 - Advanced F2L - AF2L 2 (Trapped Corner)"
  },
  {
    "id": "af2l_af2l_3",
    "name": "AF2L 3",
    "title": "3x3 - Advanced F2L - AF2L 3",
    "group": "Advanced F2L - Trapped Corner",
    "alg": "R U' R' U F' r U r'",
    "algs": [
      "R U' R' U F' r U r'",
      "R U' R' U F' L F L'",
      "y' R' U2 R2 U' R'",
      "R U' F R' U R F' R'",
      "L' U' L2 U2 L'",
      "L' U2 L2 U' L'",
      "y R' U' R U' R U' R'",
      "L U' L' y' U2 L U' L'",
      "y R' U' R2 U2 R'",
      "y' L' U' L2 U2 L'",
      "R' U' R2 U2 R'",
      "R' U2 R2 U' R'"
    ],
    "moves": 8,
    "desc": "3x3 - Advanced F2L - AF2L 3 (Trapped Corner)"
  },
  {
    "id": "af2l_af2l_4",
    "name": "AF2L 4",
    "title": "3x3 - Advanced F2L - AF2L 4",
    "group": "Advanced F2L - Trapped Corner",
    "alg": "F R' F' R U R' U2 R",
    "algs": [
      "F R' F' R U R' U2 R",
      "R U R' U2 f R f'",
      "R U R' U2 S U' R' U R S'",
      "y U2 L' U L U' R U R'",
      "U2 L' U L U' R U R'",
      "F U F' U2 R U R'",
      "U' F U' R U R2 F' R",
      "y' R U R' U2 y R U R'",
      "L U L' y U2 L U L'",
      "B L' B' L U L' U2 L",
      "L U L' U2 F U F'",
      "L U L' y' U2 R U R'",
      "U2 R' U R U' L U L'"
    ],
    "moves": 8,
    "desc": "3x3 - Advanced F2L - AF2L 4 (Trapped Corner)"
  },
  {
    "id": "af2l_af2l_5",
    "name": "AF2L 5",
    "title": "3x3 - Advanced F2L - AF2L 5",
    "group": "Advanced F2L - Trapped Corner",
    "alg": "R U R' U L U L'",
    "algs": [
      "R U R' U L U L'",
      "U' R U2 M' B r'",
      "U' R U2 R' L U L'",
      "y U2 L' U L U2 f R f'",
      "r U' r' F R' U2 R",
      "L F' L' F R' U2 R",
      "y' R U R' U L U L'",
      "y' U' R U2 R' L U L'",
      "L U L' U R U R'",
      "U2 R' U R U2 F U F'",
      "y R U R' U L U L'",
      "U2 R' U R y' U2 R U R'"
    ],
    "moves": 7,
    "desc": "3x3 - Advanced F2L - AF2L 5 (Trapped Corner)"
  },
  {
    "id": "af2l_af2l_6",
    "name": "AF2L 6",
    "title": "3x3 - Advanced F2L - AF2L 6",
    "group": "Advanced F2L - Trapped Corner",
    "alg": "R U R' F U F'",
    "algs": [
      "R U R' F U F'",
      "F R' F' R L' U L",
      "R U R' b L b'",
      "R U R' y L U L'",
      "U2 L' U L U L U L'",
      "F U F' L U L'",
      "L F' L' S' L f",
      "L' U L U L' U' L2 U L'",
      "y U2 R' U R U R U R'",
      "L U L' f R f'",
      "L U L' y' L U L'",
      "B L' B' L R' U R",
      "U2 R' U R U R U R'",
      "y R U R' F U F'",
      "f R f' R U R'"
    ],
    "moves": 6,
    "desc": "3x3 - Advanced F2L - AF2L 6 (Trapped Corner)"
  },
  {
    "id": "af2l_af2l_7",
    "name": "AF2L 7",
    "title": "3x3 - Advanced F2L - AF2L 7",
    "group": "Advanced F2L - Trapped Corner",
    "alg": "U' F' U' f R S'",
    "algs": [
      "U' F' U' f R S'",
      "y U' L' U' L R U R'",
      "R U' R' U' R U' R' f R f'",
      "F R' F' U R U' R' U' R",
      "U' L' U L R U' R'",
      "U' L' U' L R U R'",
      "y' U' L' U L R U' R'",
      "U' f' r' D r S",
      "U' f' L' F L S",
      "U' R' U R L U' L'",
      "U' R' U' R L U L'"
    ],
    "moves": 6,
    "desc": "3x3 - Advanced F2L - AF2L 7 (Trapped Corner)"
  },
  {
    "id": "af2l_af2l_8",
    "name": "AF2L 8",
    "title": "3x3 - Advanced F2L - AF2L 8",
    "group": "Advanced F2L - Trapped Corner",
    "alg": "U' F' U2 L U L' F",
    "algs": [
      "U' F' U2 L U L' F",
      "U' R' F R F' U2 L U L'",
      "y' U R' U2 R F U F'",
      "R U' R' U L U' L' U L U L'",
      "U L' U2 L f R f'",
      "F U2 R U R2 U' R F'",
      "U' L' U L y' L U2 L'",
      "U' L' U' L d' R U R'",
      "R D' R' U R U D R'",
      "U' f' L' f U' R U R'",
      "y' U' L' U L y' L U2 L'",
      "y U' R' U R y' R U2 R'",
      "U' R' U R d' L U' L'",
      "U' R' U R U2 F' r U r'",
      "U' R' U' R d' L U L'",
      "U' R' U R F U2 F'"
    ],
    "moves": 7,
    "desc": "3x3 - Advanced F2L - AF2L 8 (Trapped Corner)"
  },
  {
    "id": "af2l_af2l_9",
    "name": "AF2L 9",
    "title": "3x3 - Advanced F2L - AF2L 9",
    "group": "Advanced F2L - Trapped Corner",
    "alg": "y' U R' U2 R U' R U R'",
    "algs": [
      "y' U R' U2 R U' R U R'",
      "U R' F' R F' R' F R",
      "U R' F R F' R U' R' U' L' U' L",
      "y U L' U2 L U' L U L'",
      "U L' U2 L U' L U L'",
      "U' L' U L U2 L U' L'",
      "y' U' R' F R F' U F U F'",
      "U' L' U L U' L U2 L'",
      "U L' B' L B' L' B L",
      "y' U' L' U L U2 L U' L'",
      "U R' U2 R U' R U R'",
      "U' R' U R U2 R U' R'"
    ],
    "moves": 9,
    "desc": "3x3 - Advanced F2L - AF2L 9 (Trapped Corner)"
  },
  {
    "id": "af2l_af2l_10",
    "name": "AF2L 10",
    "title": "3x3 - Advanced F2L - AF2L 10",
    "group": "Advanced F2L - Trapped Edge",
    "alg": "U' R U R2 U' R",
    "algs": [
      "U' R U R2 U' R",
      "y L' U L R U' R' U R U R'",
      "U2 R U R' U2 R' U R",
      "y U' L F2 L' F2",
      "U' F U F2 U' F",
      "y' U' R U R2 U' R",
      "y U' L U L2 U' L",
      "U' L F2 L' F2",
      "U' L U L2 U' L",
      "R' U R L U' L' U L U L'",
      "y U' R U R2 U' R",
      "y' U' L U L2 U' L"
    ],
    "moves": 6,
    "desc": "3x3 - Advanced F2L - AF2L 10 (Trapped Edge)"
  },
  {
    "id": "af2l_af2l_11",
    "name": "AF2L 11",
    "title": "3x3 - Advanced F2L - AF2L 11",
    "group": "Advanced F2L - Trapped Edge",
    "alg": "U' R U' R' L U' L'",
    "algs": [
      "U' R U' R' L U' L'",
      "U' R U' M' B' r'",
      "U' R U' R' U L U2 L'",
      "U' L' U' L R' U' R",
      "U L' U2 L U R' U' R",
      "U' L' U' R' U' R L",
      "U' L U' L' R U' R'",
      "y U' R' U' L' U' L R",
      "U' R' U' R L' U' L"
    ],
    "moves": 7,
    "desc": "3x3 - Advanced F2L - AF2L 11 (Trapped Edge)"
  },
  {
    "id": "af2l_af2l_12",
    "name": "AF2L 12",
    "title": "3x3 - Advanced F2L - AF2L 12",
    "group": "Advanced F2L - Trapped Edge",
    "alg": "U2 R U R' L' U L",
    "algs": [
      "U2 R U R' L' U L",
      "U' R U R2 F R U F'",
      "U' R U R' U2 L' U' L",
      "F U' F' U2 R U' R' L' U' L",
      "U' L U L2 U' L2 U L'",
      "L' U' L U' L' U L U' L U2 L'",
      "U' L S U2 S' L'",
      "y' U' R U R2 F R U R' F' R",
      "U2 L U' L' R' U' R",
      "U' L U L' U2 R' U' R",
      "U2 L U L' R' U R",
      "U2 R U2 R2 U' R2 U R'",
      "U' R S' U2 S R'",
      "U' R U R2 U' R2 U R'"
    ],
    "moves": 7,
    "desc": "3x3 - Advanced F2L - AF2L 12 (Trapped Edge)"
  },
  {
    "id": "af2l_af2l_13",
    "name": "AF2L 13",
    "title": "3x3 - Advanced F2L - AF2L 13",
    "group": "Advanced F2L - Trapped Edge",
    "alg": "U R' F R F' R' U' R",
    "algs": [
      "U R' F R F' R' U' R",
      "U R U' R' U S R' S'",
      "U R U' R' U R U' R' f R' f'",
      "U R U' R' U R U' R' y' L U' L'",
      "U' L F' L2 U L U2 F",
      "d R' F R F' R' U' R",
      "U' L F' L' F U2 R U R'",
      "y' U' L F' L' F U2 R U R'",
      "U r' U L U' x L' U' L",
      "U L U' L' U S' L' S",
      "y U R' F R F' R' U' R",
      "U' l U' R' U x U2 L U L'",
      "U' R B' R2 U R U2 R B R'"
    ],
    "moves": 8,
    "desc": "3x3 - Advanced F2L - AF2L 13 (Trapped Edge)"
  },
  {
    "id": "af2l_af2l_14",
    "name": "AF2L 14",
    "title": "3x3 - Advanced F2L - AF2L 14",
    "group": "Advanced F2L - Trapped Edge",
    "alg": "U' F R' F' R U L U L'",
    "algs": [
      "U' F R' F' R U L U L'",
      "U2 r2 U B2 U' r2",
      "U2 L2 u L2 u' L2",
      "U R U' R' U R U' R' L U2 L'",
      "U2 R2 D' F2 D R2",
      "U' L' U L U' L' U L R' U2 R",
      "U2 R2 u' R2 u R2",
      "L' U' L U L' U' L U' R' U' R",
      "L U L' U' L U L' U R U R'",
      "U2 R2 D B2 D' R2",
      "U2 R2 u R2 u' R2",
      "U L U' L' U L U' L' R U2 R'",
      "R' U' R U R' U' R U' L' U' L",
      "U2 L2 D' B2 D L2",
      "U2 r2 U' F2 U r2",
      "U2 L2 u' L2 u L2"
    ],
    "moves": 9,
    "desc": "3x3 - Advanced F2L - AF2L 14 (Trapped Edge)"
  },
  {
    "id": "af2l_af2l_15",
    "name": "AF2L 15",
    "title": "3x3 - Advanced F2L - AF2L 15",
    "group": "Advanced F2L - Trapped Edge",
    "alg": "U R' F R2 U' R' U2 F'",
    "algs": [
      "U R' F R2 U' R' U2 F'",
      "U R' F R F' U2 L' U' L",
      "R U R' U' R U R' F U F'",
      "U R' F R2 U' R' U2 R' F' R",
      "U' L F' L' F L U L'",
      "U' L' U L U' S' L S",
      "y' U' L F' L' F L U L'",
      "U' R' U' R2 u R u' R'",
      "U' R' U R U' S R S'",
      "y U R' F R2 U' R' U2 F'",
      "y U R' F R F' U2 L' U' L"
    ],
    "moves": 8,
    "desc": "3x3 - Advanced F2L - AF2L 15 (Trapped Edge)"
  },
  {
    "id": "af2l_af2l_16",
    "name": "AF2L 16",
    "title": "3x3 - Advanced F2L - AF2L 16",
    "group": "Advanced F2L - Trapped Edge",
    "alg": "U' F' R' U' R F",
    "algs": [
      "U' F' R' U' R F",
      "d' R' u' R' u R",
      "U' R U' R' r' U' R U M'",
      "U' R U' R' B' R B R'",
      "U' R' D' F' D R",
      "U' R' u' R' u R",
      "U' L' F' U' F L",
      "U' r' D' F' D r",
      "U' L U' L' F' L F L'",
      "d' L' u' L' u L",
      "U' R' U' R y U R' U' R",
      "U' R' U' R U f' L' f",
      "U' L' u' L' u L",
      "y' U' F' D' L' D F"
    ],
    "moves": 6,
    "desc": "3x3 - Advanced F2L - AF2L 16 (Trapped Edge)"
  },
  {
    "id": "af2l_af2l_17",
    "name": "AF2L 17",
    "title": "3x3 - Advanced F2L - AF2L 17",
    "group": "Advanced F2L - Trapped Edge",
    "alg": "U2 R B' U' B R'",
    "algs": [
      "U2 R B' U' B R'",
      "y U2 F R' U' R F'",
      "U' R U R' U' f' L' f",
      "U2 l U' F' U l'",
      "U2 F R' U' R F'",
      "U2 F U' F' U R' U' R",
      "U2 L F' L' F R' U' R",
      "U2 F U F' R' U2 R",
      "U2 R d' R' U R F'",
      "U2 L F' U' F L'",
      "U2 f R' f' U L' U' L",
      "U2 f U' R' U f'",
      "U2 F U' R' U R F'",
      "U2 f R f' L' U2 L"
    ],
    "moves": 6,
    "desc": "3x3 - Advanced F2L - AF2L 17 (Trapped Edge)"
  },
  {
    "id": "af2l_af2l_18",
    "name": "AF2L 18",
    "title": "3x3 - Advanced F2L - AF2L 18",
    "group": "Advanced F2L - Trapped Edge",
    "alg": "U F' U2 F L' U' L",
    "algs": [
      "U F' U2 F L' U' L",
      "U r' F' D' F D r",
      "U' R U' R' F U2 F'",
      "U' R U' R' U2 F' L F L'",
      "U' L' U' L d' R' U' R",
      "U L' U2 L f' L' f",
      "U' F U' F' L U2 L'",
      "F U R U' R' U' R U' R' L U2 L' F'",
      "U' L U' L' d' R U' R'",
      "U' L U' L' R2 F R F' R",
      "U' L U' L' U' f R' f'",
      "U' L U' L' y R U2 R'",
      "U R' U2 R F' U' F",
      "U' R' U' R d' L' U' L",
      "U' f R' f' U' R U' R'",
      "U' R' U' R U' F' U' F"
    ],
    "moves": 7,
    "desc": "3x3 - Advanced F2L - AF2L 18 (Trapped Edge)"
  },
  {
    "id": "af2l_af2l_19",
    "name": "AF2L 19",
    "title": "3x3 - Advanced F2L - AF2L 19",
    "group": "Advanced F2L - Trapped Edge",
    "alg": "U' R U2 R' f R f'",
    "algs": [
      "U' R U2 R' f R f'",
      "R' F R F' R U2 R2 U R",
      "U R U R' U y R U R'",
      "U R U R' U f R f'",
      "U' F U2 F' R U R'",
      "U' R U F U' F' R'",
      "U F U2 R U R2 F' R",
      "U L' U L F' U2 F",
      "U' L U2 L' F U F'",
      "U L U L' d R U R'",
      "U f' L f L' U2 L",
      "U L U L' U F U F'",
      "U R' U R d L' U L",
      "U R' U R U f' L f",
      "U R' U R y R' U2 R",
      "U R' U R y' L' U2 L"
    ],
    "moves": 7,
    "desc": "3x3 - Advanced F2L - AF2L 19 (Trapped Edge)"
  },
  {
    "id": "af2l_af2l_20",
    "name": "AF2L 20",
    "title": "3x3 - Advanced F2L - AF2L 20",
    "group": "Advanced F2L - Trapped Edge",
    "alg": "U R U R' L U L'",
    "algs": [
      "U R U R' L U L'",
      "U' R U2 R' U' L U L'",
      "U R U M' B r'",
      "U L' U L R' U R",
      "U L U L' R U R'",
      "U' L U2 L' U' R U R'",
      "U R' U R L' U L"
    ],
    "moves": 7,
    "desc": "3x3 - Advanced F2L - AF2L 20 (Trapped Edge)"
  },
  {
    "id": "af2l_af2l_21",
    "name": "AF2L 21",
    "title": "3x3 - Advanced F2L - AF2L 21",
    "group": "Advanced F2L - Trapped Edge",
    "alg": "U R F U F' R'",
    "algs": [
      "U R F U F' R'",
      "U L u L u' L'",
      "U L D F D' L'",
      "U R U R' U' F U F'",
      "U F L U L' F'",
      "U L' U L R B L' B' M' x'",
      "d L u L u' L'",
      "U L' U L B L' B' L",
      "U L U L' U' f R f'",
      "U R u R u' R'",
      "U' L U2 L' y' U2 L U L'",
      "U L U L' y' U' L U L'",
      "U F D R D' F'",
      "U R' U R U' F' U F",
      "d R u R u' R'",
      "U R' U R F R' F' R"
    ],
    "moves": 6,
    "desc": "3x3 - Advanced F2L - AF2L 21 (Trapped Edge)"
  },
  {
    "id": "af2l_af2l_22",
    "name": "AF2L 22",
    "title": "3x3 - Advanced F2L - AF2L 22",
    "group": "Advanced F2L - Trapped Edge",
    "alg": "R U' R2 U R",
    "algs": [
      "R U' R2 U R",
      "y M F2 M'",
      "S R2 S'",
      "R U2 R2 U2 R",
      "R L' U2 L R'",
      "L' U L U2 R U' R'",
      "F2 R' F2 R",
      "L U' L2 U L",
      "L R' U2 R L'"
    ],
    "moves": 5,
    "desc": "3x3 - Advanced F2L - AF2L 22 (Trapped Edge)"
  },
  {
    "id": "af2l_af2l_23",
    "name": "AF2L 23",
    "title": "3x3 - Advanced F2L - AF2L 23",
    "group": "Advanced F2L - Trapped Edge",
    "alg": "L F' U F L'",
    "algs": [
      "L F' U F L'",
      "y' F R' U R F'",
      "l F' U L' U' M'",
      "R U2 R' y' L' U L",
      "R' F U' F' R",
      "r' F U' R U M'",
      "L' U L y' U L U' L'",
      "L' U L y U R U' R'",
      "F' L U' L' F",
      "R u R' U R u' R'",
      "L U' L' d' L' U L",
      "L U' L' y' U' R' U R",
      "F R' U R F'",
      "R' U R y' U R U' R'",
      "R' U R y U L U' L'",
      "L' u' L U' L' u L"
    ],
    "moves": 5,
    "desc": "3x3 - Advanced F2L - AF2L 23 (Trapped Edge)"
  },
  {
    "id": "af2l_af2l_24",
    "name": "AF2L 24",
    "title": "3x3 - Advanced F2L - AF2L 24",
    "group": "Advanced F2L - Trapped Edge",
    "alg": "R U' R' U2 L' U L",
    "algs": [
      "R U' R' U2 L' U L",
      "M F2 M'",
      "F2 r U2 r'",
      "U F r U2 r' F'",
      "L' U L2 U' L'",
      "R' L U2 L' R",
      "L U' L' U2 R' U R",
      "R' U R2 U' R'",
      "R' U2 R2 U2 R'",
      "R2 F R2 F'"
    ],
    "moves": 7,
    "desc": "3x3 - Advanced F2L - AF2L 24 (Trapped Edge)"
  },
  {
    "id": "af2l_af2l_25",
    "name": "AF2L 25",
    "title": "3x3 - Advanced F2L - AF2L 25",
    "group": "Advanced F2L - Both Pieces Trapped",
    "alg": "R' F R F' U R' U2 R",
    "algs": [
      "R' F R F' U R' U2 R",
      "F' U R' U2 R F",
      "R U' R' U' f R f'",
      "R U R' U' B U' B'",
      "R' F R2 U' R2 F' R",
      "R' F R2 U R' F' R U2 R'",
      "F R U' R2 F' R",
      "L F' L' F R U' R'",
      "L U L' y' U' R U' R'",
      "L U' L' d' L U L'",
      "L U L' F U2 F'",
      "L U' L' U' F U F'",
      "y R U' R' U' f R f'",
      "R' U R d' R' U' R",
      "R' U' R l U L' U' M'"
    ],
    "moves": 8,
    "desc": "3x3 - Advanced F2L - AF2L 25 (Both Pieces Trapped)"
  },
  {
    "id": "af2l_af2l_26",
    "name": "AF2L 26",
    "title": "3x3 - Advanced F2L - AF2L 26",
    "group": "Advanced F2L - Both Pieces Trapped",
    "alg": "L R U2 R' L'",
    "algs": [
      "L R U2 R' L'",
      "R U' R' U2 L U L'",
      "R U2 R' U L U' L'",
      "R U R' U' L U2 L'",
      "L' U' L U R' U2 R",
      "L' R' U2 R L",
      "L U L' U' R U2 R'",
      "R L U2 L' R'",
      "R' U' R U2 L' U L",
      "R' L' U2 L R"
    ],
    "moves": 5,
    "desc": "3x3 - Advanced F2L - AF2L 26 (Both Pieces Trapped)"
  },
  {
    "id": "af2l_af2l_27",
    "name": "AF2L 27",
    "title": "3x3 - Advanced F2L - AF2L 27",
    "group": "Advanced F2L - Both Pieces Trapped",
    "alg": "R' F R2 U R' F'",
    "algs": [
      "R' F R2 U R' F'",
      "R U2 R' F U' F'",
      "R' F R2 U R2 F' R",
      "R U R' F' r U r'",
      "L' U L U f' L' f",
      "L' U' L U y' L' U L",
      "L' U' L y R' U2 R",
      "F U' L U2 L' F'",
      "L U L' U y R U' R'",
      "L U L' B' R B R'",
      "L U' L' U f R f'",
      "F' R' U2 R U' F",
      "R' U' R U y L' U L",
      "R' U R d R' U' R",
      "R' U' R F' U2 F"
    ],
    "moves": 6,
    "desc": "3x3 - Advanced F2L - AF2L 27 (Both Pieces Trapped)"
  },
  {
    "id": "af2l_af2l_28",
    "name": "AF2L 28",
    "title": "3x3 - Advanced F2L - AF2L 28",
    "group": "Advanced F2L - Both Pieces Trapped",
    "alg": "R U' R2 U' R U' R' U' R",
    "algs": [
      "R U' R2 U' R U' R' U' R",
      "R U' R' U' R U' R2 U' R",
      "r U' r' U2 r U r' d' R U R'",
      "u R U R' u' R U' R2 U R",
      "L' U L U R U R' U R U' R'",
      "F U' R U R' U R U' R' F' R U' R'",
      "L U' L2 U' L U' L' U' L",
      "R' U R U L U L' U L U' L'"
    ],
    "moves": 9,
    "desc": "3x3 - Advanced F2L - AF2L 28 (Both Pieces Trapped)"
  },
  {
    "id": "af2l_af2l_29",
    "name": "AF2L 29",
    "title": "3x3 - Advanced F2L - AF2L 29",
    "group": "Advanced F2L - Both Pieces Trapped",
    "alg": "F' U L' U L U' L U L' F",
    "algs": [
      "F' U L' U L U' L U L' F",
      "R U' R' U' R U' R' d' R' U' R",
      "R U' R' y R' U R U R' U' R",
      "F' U F L U L' U L U' L'",
      "L' U L B L' B L B2",
      "L' U L y' L U L' U L U' L'",
      "L' U' L U L' U L f R f'",
      "L' U L y R U R' U R U' R'",
      "f' L f R U R2 F R F'",
      "L U' L' U' L U' L' d' L' U' L",
      "L U' L' y' R' U R U R' U' R",
      "L U' L' y L' U L U L' U' L",
      "R' U R F R' F R F2",
      "R' U R y' R U R' U R U' R'"
    ],
    "moves": 10,
    "desc": "3x3 - Advanced F2L - AF2L 29 (Both Pieces Trapped)"
  },
  {
    "id": "af2l_af2l_30",
    "name": "AF2L 30",
    "title": "3x3 - Advanced F2L - AF2L 30",
    "group": "Advanced F2L - Both Pieces Trapped",
    "alg": "R U' R' U' L' U L U L' U' L",
    "algs": [
      "R U' R' U' L' U L U L' U' L",
      "R U' R' U' R U' R' U2 L' U' L",
      "M F M' U L' U L U' L' U L",
      "r U' r' U2 r U r' d R U R'",
      "L' U L U' L U L' U L U' L'",
      "L U' L' U' R' U R U R' U' R",
      "R' U R U' R U R' U R U' R'"
    ],
    "moves": 11,
    "desc": "3x3 - Advanced F2L - AF2L 30 (Both Pieces Trapped)"
  },
  {
    "id": "af2l_af2l_31",
    "name": "AF2L 31",
    "title": "3x3 - Advanced F2L - AF2L 31",
    "group": "Advanced F2L - Both Pieces Trapped",
    "alg": "R U R' U' R U' R' U R' U' R",
    "algs": [
      "R U R' U' R U' R' U R' U' R",
      "R U' R' U R' U' R U' R' U R",
      "R' F R U' R' F' R2 U R' U R U R'",
      "L' U L U L' U L U2 R U R'",
      "L' U L U R U' R' U' R U R'",
      "L U' L' U L' U' L U' L' U L",
      "R' U R U L U' L' U' L U L'"
    ],
    "moves": 11,
    "desc": "3x3 - Advanced F2L - AF2L 31 (Both Pieces Trapped)"
  },
  {
    "id": "af2l_af2l_32",
    "name": "AF2L 32",
    "title": "3x3 - Advanced F2L - AF2L 32",
    "group": "Advanced F2L - Both Pieces Trapped",
    "alg": "R U R' U' R U' R' f' L' f",
    "algs": [
      "R U R' U' R U' R' f' L' f",
      "R U' R' U f' U' L' U L' f",
      "R U R' F R U R' U' F' L U2 L'",
      "R U' R' y R' U' R U' R' U R",
      "F U' R U' R' U R' U' R F'",
      "L' U L y' L U' L' U' L U L'",
      "L' U L U L' U L U f R f'",
      "L U' L' y L' U' L U' L' U L",
      "L U' L' y' R' U' R U' R' U R",
      "L U L' U' L U' L' b' R' b",
      "L U' L' F' L F' L' F2",
      "R' U R U' L' U L d' L U L'",
      "R' U R y L U' L' U' L U L'",
      "R' U R y' R U' R' U' R U R'"
    ],
    "moves": 10,
    "desc": "3x3 - Advanced F2L - AF2L 32 (Both Pieces Trapped)"
  },
  {
    "id": "af2l_af2l_33",
    "name": "AF2L 33",
    "title": "3x3 - Advanced F2L - AF2L 33",
    "group": "Advanced F2L - Both Pieces Trapped",
    "alg": "R U' R' U' L' U' L U' L' U L",
    "algs": [
      "R U' R' U' L' U' L U' L' U L",
      "R U R' U' R U' R' U' L' U' L",
      "R U' R' F' r' F' r2 U r'",
      "y' R' U R2 U R' U R U R'",
      "L' U L2 U L' U L U L'",
      "L' U L U L' U L2 U L'",
      "L U' L' U' R' U' R U' R' U R",
      "R' U R U R' U R2 U R'",
      "R' U R2 U R' U R U R'"
    ],
    "moves": 11,
    "desc": "3x3 - Advanced F2L - AF2L 33 (Both Pieces Trapped)"
  },
  {
    "id": "af2l_af2l_34",
    "name": "AF2L 34",
    "title": "3x3 - Advanced F2L - AF2L 34",
    "group": "Advanced F2L - Both Pieces Trapped",
    "alg": "F' R' U R U' R' U' R F",
    "algs": [
      "F' R' U R U' R' U' R F",
      "R U' R' U' R U R' U f R' f'",
      "R U' R' U' R U R' r' U' R U M'",
      "R U' R2 f' U' f R",
      "L' U' L U y' R' U R U' R' U' R",
      "L' U L y' U2 R' U2 R U' R' U R",
      "L' U' L d R' U R U' R' U' R",
      "F U' R U' R' F' R U' R' U' R U R'",
      "L U L' y U2 L U2 L' U' L U L'",
      "L U' L' U' L U L' U y L U' L'",
      "L U' L' U' L U L' F' L F L'",
      "R' U' R y U R' U R U' R' U' R",
      "R' U R y U2 R' U2 R U' R' U R"
    ],
    "moves": 9,
    "desc": "3x3 - Advanced F2L - AF2L 34 (Both Pieces Trapped)"
  },
  {
    "id": "af2l_af2l_35",
    "name": "AF2L 35",
    "title": "3x3 - Advanced F2L - AF2L 35",
    "group": "Advanced F2L - Both Pieces Trapped",
    "alg": "R U' R' U' R U R' L U' L'",
    "algs": [
      "R U' R' U' R U R' L U' L'",
      "R U' R' U' R U M' B' r'",
      "R U R' U' R U2 R' U L U L'",
      "R U2 R' L U2 L' U' L U L'",
      "L' U' L R' U R U' R' U' R",
      "L' U L U R' U2 R U' R' U R",
      "L U' L' U' L U L' R U' R'",
      "L U L' U R U2 R' U' R U R'",
      "y' L' U L U R' U2 R U' R' U R",
      "R' U R U L' U2 L U' L' U L",
      "R' U' R L' U L U' L' U' L",
      "y R U2 R' L U2 L' U' L U L'",
      "y R U' R' U' R U R' L U' L'"
    ],
    "moves": 10,
    "desc": "3x3 - Advanced F2L - AF2L 35 (Both Pieces Trapped)"
  },
  {
    "id": "af2l_af2l_36",
    "name": "AF2L 36",
    "title": "3x3 - Advanced F2L - AF2L 36",
    "group": "Advanced F2L - Both Pieces Trapped",
    "alg": "R' F R2 U' R' U' R U R' U2 F'",
    "algs": [
      "R' F R2 U' R' U' R U R' U2 F'",
      "R' F R F' U2 L' U L U' L' U' L",
      "R U' R' U' R U R' U' F U' F'",
      "R U' R' U' R U R' F U2 F'",
      "L' U' L d' R' U R U' R' U' R",
      "L' U L y R' U2 R U' R' U R",
      "L' U L y' L' U2 L U' L' U L",
      "F U L U2 L' U' L U L' F'",
      "L U' L' U' L U L' y' L U2 L'",
      "L U L' y' L U2 L' U' L U L'",
      "L U' L' R' F R U R' U' F' R",
      "R' U2 R y' R' U R U' R' U' R",
      "R' U R y' R' U2 R U' R' U R",
      "R' U R U' R' U2 L F' R2 U' R2 U F L' R",
      "R' U R2 U' R2 F R F' R U' R'"
    ],
    "moves": 11,
    "desc": "3x3 - Advanced F2L - AF2L 36 (Both Pieces Trapped)"
  },
  {
    "id": "af2l_af2l_37",
    "name": "AF2L 37",
    "title": "3x3 - Advanced F2L - AF2L 37",
    "group": "Advanced F2L - Both Pieces Trapped",
    "alg": "R U R' U2 R U' R' f R f'",
    "algs": [
      "R U R' U2 R U' R' f R f'",
      "F' U' R' U2 R U R' U' R F",
      "R U' R' y R U2 R' U R U' R'",
      "R U' R' U R U2 R' y R U' R'",
      "L' U' L y' R' U2 R U R' U' R",
      "L' U' L y L' U2 L U L' U' L",
      "L' U L U L' U' L y' R' U2 R",
      "F U2 R U' R' F' U R U R'",
      "L U' L' y L U2 L' U L U' L'",
      "L U L' y U L U' L' U L U L'",
      "R' U R U R' U' R y R' U2 R",
      "R' U' R y R' U2 R U R' U' R"
    ],
    "moves": 10,
    "desc": "3x3 - Advanced F2L - AF2L 37 (Both Pieces Trapped)"
  },
  {
    "id": "af2l_af2l_38",
    "name": "AF2L 38",
    "title": "3x3 - Advanced F2L - AF2L 38",
    "group": "Advanced F2L - Both Pieces Trapped",
    "alg": "R U' R' U R U2 R' L U2 L'",
    "algs": [
      "R U' R' U R U2 R' L U2 L'",
      "R U' R' U' L U2 L' U L U' L'",
      "R U R' L U' L' U L U L'",
      "R U' R' U R U2 R' U' L U' L'",
      "L' U L U L' U' L R' U R",
      "F U2 R U' R' f R f' F'",
      "L' U2 L R' U2 R U R' U' R",
      "L U' L' U' R U2 R' U R U' R'",
      "L U L' R U' R' U R U R'",
      "R' U' R U' L' U2 L U L' U' L",
      "R' U R U R' U' R L' U L"
    ],
    "moves": 10,
    "desc": "3x3 - Advanced F2L - AF2L 38 (Both Pieces Trapped)"
  },
  {
    "id": "af2l_af2l_39",
    "name": "AF2L 39",
    "title": "3x3 - Advanced F2L - AF2L 39",
    "group": "Advanced F2L - Both Pieces Trapped",
    "alg": "R U R' d' L U' L' U L U L'",
    "algs": [
      "R U R' d' L U' L' U L U L'",
      "R U R' U' y' R U' R' U R U R'",
      "R U R' L' U L U' L F' L' F L' U L",
      "R U' R' y' U2 R U2 R' U R U' R'",
      "F L U' L' U L U L' F'",
      "L' U L l U' L' U L U l'",
      "L' U' L y U2 R' U2 R U R' U' R",
      "L' U' L y' U2 L' U2 L U L' U' L",
      "L U' L' y' U2 L U2 L' U L U' L'",
      "L U L' y' U' L U' L' U L U L'",
      "f' L f U2 R' U' R U R' U2 R",
      "R' U' R y' U2 R' U2 R U R' U' R",
      "R' U R L F' R' F R F L'",
      "R' U' R U d R' U2 R U R' U' R"
    ],
    "moves": 11,
    "desc": "3x3 - Advanced F2L - AF2L 39 (Both Pieces Trapped)"
  },
  {
    "id": "af2l_af2l_40",
    "name": "AF2L 40",
    "title": "3x3 - Advanced F2L - AF2L 40",
    "group": "Advanced F2L - Both Pieces Trapped",
    "alg": "R U' R2 U2 R U R' U2 R",
    "algs": [
      "R U' R2 U2 R U R' U2 R",
      "R U' R2 U2 R U2 R' U R",
      "F R' F' R U' R U2 R2 U' R",
      "R' F R F' R U' R' U R U' R' U y R U' R'",
      "F2 R' F2 D' R U' R' D R",
      "L' U' L R U' R' U R U' R' U2 R U' R'",
      "L' U' L R' U2 R2 U R2 U R",
      "L' U L U2 R U2 R' U2 R U' R'",
      "L U' L2 U2 L U2 L' U L",
      "L U' L2 U2 L U L' U2 L",
      "R' U R U2 L U2 L' U2 L U' L'"
    ],
    "moves": 9,
    "desc": "3x3 - Advanced F2L - AF2L 40 (Both Pieces Trapped)"
  },
  {
    "id": "af2l_af2l_41",
    "name": "AF2L 41",
    "title": "3x3 - Advanced F2L - AF2L 41",
    "group": "Advanced F2L - Both Pieces Trapped",
    "alg": "R U' R' d R' U2 R L' U L",
    "algs": [
      "R U' R' d R' U2 R L' U L",
      "F' U2 L' U2 L2 U L' F",
      "R U' R' U y L' U2 L R' U R",
      "R U' R' y U' R' U2 R U R' U2 R",
      "F U2 R U2 R2 U' R F'",
      "L' U L U2 r U2 R2 U' R2 U' r'",
      "L U L' R U2 R' y' U R' U' R",
      "L U L' R U2 R' U F' U' F",
      "R' U R y' U R U2 R' U2 R U' R'",
      "R' U' R L' U2 L y U' L U L'",
      "R' U' R L' U2 L U' F U F'"
    ],
    "moves": 10,
    "desc": "3x3 - Advanced F2L - AF2L 41 (Both Pieces Trapped)"
  },
  {
    "id": "af2l_af2l_42",
    "name": "AF2L 42",
    "title": "3x3 - Advanced F2L - AF2L 42",
    "group": "Advanced F2L - Both Pieces Trapped",
    "alg": "R U' R' U2 L' U2 L U2 L' U L",
    "algs": [
      "R U' R' U2 L' U2 L U2 L' U L",
      "y' R' U R2 U2 R' U2 R U' R'",
      "y' R' U R2 U2 R' U' R U2 R'",
      "R' F R F' R U' R' U R U' R' d' L U' L'",
      "L' U L2 U2 L' U2 L U' L'",
      "L' U L2 U2 L' U' L U2 L'",
      "L' U' L F' U' L F' L' F L U L' F",
      "L U L' R U2 R2 U' R2 U' R'",
      "R' U R2 U2 R' U R' F R F'",
      "R' U R2 U2 R' U2 R U' R'",
      "R' U' R U2 R' U2 R2 U R'"
    ],
    "moves": 11,
    "desc": "3x3 - Advanced F2L - AF2L 42 (Both Pieces Trapped)"
  },
  {
    "id": "af2l_af2l_1a",
    "name": "AF2L 1a",
    "title": "3x3 - Advanced F2L - AF2L 1a",
    "group": "Advanced F2L - Trapped Corner",
    "alg": "U2 R U' R' U' R' U' R",
    "algs": [
      "U2 R U' R' U' R' U' R",
      "U' R U R2 U' R U' R' U R",
      "R' F R F' y R U' R'",
      "F' U' F R' U' R",
      "L' U' L y' R' U' R",
      "L' U' L F' U' F",
      "U L' U' F' U' F L",
      "F' L F L' R U' R'",
      "y R' U' R y R' U' R",
      "f' L' f L' U' L",
      "y' L' U' L F' U' F",
      "y' L' U' L y L' U' L",
      "R' U' R y R' U' R",
      "R' U' R f' L' f",
      "B' R B R' L U' L'"
    ],
    "moves": 8,
    "desc": "3x3 - Advanced F2L - AF2L 1a (Trapped Corner)"
  },
  {
    "id": "af2l_af2l_2a",
    "name": "AF2L 2a",
    "title": "3x3 - Advanced F2L - AF2L 2a",
    "group": "Advanced F2L - Trapped Corner",
    "alg": "R' F R F' L U2 L'",
    "algs": [
      "R' F R F' L U2 L'",
      "R' F R F' U' L U' L'",
      "U2 R U' R' U2 B' U' B",
      "F' U' F U' y2 F' U' F",
      "L' U' L U' R' U' R",
      "L' B L B' R U2 R'",
      "y' L' U' L U' R' U' R",
      "y R' U' R U' L' U' L",
      "U2 L U' L' y' U2 R' U' R",
      "R' U' R U' L' U' L"
    ],
    "moves": 7,
    "desc": "3x3 - Advanced F2L - AF2L 2a (Trapped Corner)"
  },
  {
    "id": "af2l_af2l_3a",
    "name": "AF2L 3a",
    "title": "3x3 - Advanced F2L - AF2L 3a",
    "group": "Advanced F2L - Trapped Corner",
    "alg": "R' F R2 U' R' U F'",
    "algs": [
      "R' F R2 U' R' U F'",
      "R' F R F' d R' F R F'",
      "F' U' F U2 L' U' L",
      "U2 R U' R' U L' U' L",
      "F' L F L' U2 L U' L'",
      "L' U' L y U2 R' U' R",
      "L' U' L y' U2 L' U' L",
      "L' U' L U2 f' L' f",
      "f' L' f U2 R' U' R",
      "y R' U' R y' U2 R' U' R",
      "y' L' U' L y U2 R' U' R",
      "U2 L U' L' U R' U' R",
      "B' R B R' U2 R U' R'",
      "R' U' R U2 F' U' F",
      "R' U' R y U2 L' U' L",
      "R' U' R y' U2 R' U' R"
    ],
    "moves": 7,
    "desc": "3x3 - Advanced F2L - AF2L 3a (Trapped Corner)"
  },
  {
    "id": "af2l_af2l_4a",
    "name": "AF2L 4a",
    "title": "3x3 - Advanced F2L - AF2L 4a",
    "group": "Advanced F2L - Trapped Corner",
    "alg": "U R U R2 U2 R",
    "algs": [
      "U R U R2 U2 R",
      "U R U2 R2 U R",
      "U R U' R' S R2 S'",
      "U L' U L y' U2 R' U R",
      "U L' U L y U2 L' U L",
      "U L' U L U' F R' F' R",
      "U L U L2 U2 L",
      "U L U2 L2 U L",
      "U R' U R y U R' U2 R",
      "U R' U R y U2 R' U R",
      "U R' U R y' U2 L' U L"
    ],
    "moves": 6,
    "desc": "3x3 - Advanced F2L - AF2L 4a (Trapped Corner)"
  },
  {
    "id": "af2l_af2l_5a",
    "name": "AF2L 5a",
    "title": "3x3 - Advanced F2L - AF2L 5a",
    "group": "Advanced F2L - Trapped Corner",
    "alg": "y U L' U L R' U2 R",
    "algs": [
      "y U L' U L R' U2 R",
      "U l U' F2 U l'",
      "U R B' U2 B R'",
      "U R U R' y R' U R",
      "U L' U L R' U2 R",
      "y' U L' U L R' U2 R",
      "y U R' U R L' U2 L",
      "U L U L' F' U F",
      "U L U L' y' R' U R",
      "U R' U R L' U2 L"
    ],
    "moves": 8,
    "desc": "3x3 - Advanced F2L - AF2L 5a (Trapped Corner)"
  },
  {
    "id": "af2l_af2l_6a",
    "name": "AF2L 6a",
    "title": "3x3 - Advanced F2L - AF2L 6a",
    "group": "Advanced F2L - Trapped Corner",
    "alg": "U R L' U L R'",
    "algs": [
      "U R L' U L R'",
      "y U L' U L f' L f",
      "U R U R' U' L' U L",
      "U M F M'",
      "U S' L S",
      "U L' U L f' L f",
      "U L' U L y R' U R",
      "y U L R' U R L'",
      "U L R' U R L'",
      "U L R' U L' R",
      "U S R S'",
      "y U R L' U L R'",
      "y' U L R' U R L'"
    ],
    "moves": 6,
    "desc": "3x3 - Advanced F2L - AF2L 6a (Trapped Corner)"
  },
  {
    "id": "af2l_af2l_7a",
    "name": "AF2L 7a",
    "title": "3x3 - Advanced F2L - AF2L 7a",
    "group": "Advanced F2L - Trapped Corner",
    "alg": "U2 R U' R' U2 R' U R",
    "algs": [
      "U2 R U' R' U2 R' U R",
      "R U2 R' U R' U' R",
      "U2 R U' R' U R' U2 R",
      "U2 R U R' U2 R' U' R",
      "y' U2 R U' R' U2 R' U R",
      "y' U2 R U' R' U R' U2 R",
      "L F L' F L F' L'",
      "U2 L F' L' F y' U' R' U' R",
      "U2 L U' L' U2 L' U L",
      "L U2 L' U L' U' L",
      "U2 L U' L' U L' U2 L",
      "y U2 R U' R' U2 R' U R",
      "R B R' B R B' R'",
      "l U R' U R U' l'",
      "y' U2 L U' L' U2 L' U L"
    ],
    "moves": 8,
    "desc": "3x3 - Advanced F2L - AF2L 7a (Trapped Corner)"
  },
  {
    "id": "af2l_af2l_8a",
    "name": "AF2L 8a",
    "title": "3x3 - Advanced F2L - AF2L 8a",
    "group": "Advanced F2L - Trapped Corner",
    "alg": "U2 R U' R' d L' U L",
    "algs": [
      "U2 R U' R' d L' U L",
      "R U2 R' f' L' f",
      "R U2 R' y R' U' R",
      "U2 R U' R' y R' U2 R",
      "U2 L F' L' F U2 R' U' R",
      "U R' D R U' R' U' D' R",
      "U2 F U2 R' U' R F'",
      "y U2 L U' L' y L' U2 L",
      "U2 L U' L' y L' U2 L",
      "U2 L U' L' y' R' U2 R",
      "U L' D L U' L' U' D' L",
      "y U2 R U' R' y R' U2 R",
      "U2 f R f' U L' U' L"
    ],
    "moves": 8,
    "desc": "3x3 - Advanced F2L - AF2L 8a (Trapped Corner)"
  },
  {
    "id": "af2l_af2l_9a",
    "name": "AF2L 9a",
    "title": "3x3 - Advanced F2L - AF2L 9a",
    "group": "Advanced F2L - Trapped Corner",
    "alg": "U2 R U' R' L' U L",
    "algs": [
      "U2 R U' R' L' U L",
      "R U2 R' U' L' U' L",
      "y U2 L U' L' R' U R",
      "y' U2 R U' R' L' U L",
      "U2 L U' L' R' U R",
      "L U2 L' U' R' U' R",
      "y U2 R U' R' L' U L",
      "y' U2 L U' L' R' U R"
    ],
    "moves": 7,
    "desc": "3x3 - Advanced F2L - AF2L 9a (Trapped Corner)"
  },
  {
    "id": "af2l_af2l_10a",
    "name": "AF2L 10a",
    "title": "3x3 - Advanced F2L - AF2L 10a",
    "group": "Advanced F2L - Trapped Edge",
    "alg": "U' R U' R' U f R' f'",
    "algs": [
      "U' R U' R' U f R' f'",
      "U' R U' R' d L U' L'",
      "d' R' D' F' D R",
      "y' U' F' R' U' R F",
      "U' F U' F' U R U' R'",
      "U L' U2 L y U2 L' U' L",
      "U' F' D' L' D F",
      "y U' F' R' U' R F"
    ],
    "moves": 8,
    "desc": "3x3 - Advanced F2L - AF2L 10a (Trapped Edge)"
  },
  {
    "id": "af2l_af2l_11a",
    "name": "AF2L 11a",
    "title": "3x3 - Advanced F2L - AF2L 11a",
    "group": "Advanced F2L - Trapped Edge",
    "alg": "U' R U R' y' U' L' U' L",
    "algs": [
      "U' R U R' y' U' L' U' L",
      "U' R U R' U' f' L' f",
      "U' R U R' d' R' U' R",
      "U' R U R' U' y2 F' U' F",
      "U' F U F' U' R' U' R",
      "U2 L F' L' F R' U' R",
      "U' L U L' U' F' U' F",
      "U' L U L' y U' L' U' L",
      "U' L U L' y' U' R' U' R",
      "U' f R f' U' L' U' L",
      "y U2 L U' F' U F L'",
      "y' U2 L F' U' F L'"
    ],
    "moves": 9,
    "desc": "3x3 - Advanced F2L - AF2L 11a (Trapped Edge)"
  },
  {
    "id": "af2l_af2l_12a",
    "name": "AF2L 12a",
    "title": "3x3 - Advanced F2L - AF2L 12a",
    "group": "Advanced F2L - Trapped Edge",
    "alg": "U' R U' R' U2 F' r U r'",
    "algs": [
      "U' R U' R' U2 F' r U r'",
      "U' R U' R' y L U2 L'",
      "U' F' U2 L' U' L2 F L'",
      "U' R U' R' y' U' R U' R'",
      "U L' U2 L y' L' U' L",
      "U' L' U' L y' U' L' U' L",
      "U L' U2 L y R' U' R",
      "U' L U' L' y' L U2 L'",
      "U R' U2 R y' R' U' R",
      "U R' U2 R y L' U' L"
    ],
    "moves": 9,
    "desc": "3x3 - Advanced F2L - AF2L 12a (Trapped Edge)"
  },
  {
    "id": "zbll_t_zbll_t_1",
    "name": "ZBLL T 1",
    "title": "3x3 - ZBLL T - ZBLL T 1",
    "group": "ZBLL - T - T1",
    "alg": "y R' U' R U' R' U' R U2 L' R' U R U' L",
    "algs": [
      "y R' U' R U' R' U' R U2 L' R' U R U' L",
      "y2 S R U' R2 U B' U' R2 U B R' S'",
      "y' R' U2 R' U' D R' U' R D' R U R U R2",
      "y R' U2 R2 U R2 U R F' R U2 R' U2 R' F R"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL T - ZBLL T 1 (T1)"
  },
  {
    "id": "zbll_t_zbll_t_2",
    "name": "ZBLL T 2",
    "title": "3x3 - ZBLL T - ZBLL T 2",
    "group": "ZBLL - T - T1",
    "alg": "y R' U2 R2 U R' U' R' U2 F' R U2 R U2 R' F",
    "algs": [
      "y R' U2 R2 U R' U' R' U2 F' R U2 R U2 R' F",
      "R' U2 R U' R' D R' U R U R' U2 R U' D' R",
      "M U R' F' r U r U' r' F M U' M'",
      "R2 U2 R' U R U' R U2 R U L' U R U' L"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL T - ZBLL T 2 (T1)"
  },
  {
    "id": "zbll_t_zbll_t_3",
    "name": "ZBLL T 3",
    "title": "3x3 - ZBLL T - ZBLL T 3",
    "group": "ZBLL - T - T1",
    "alg": "y2 R' U' R' D' R U' M' U2 r' D R2",
    "algs": [
      "y2 R' U' R' D' R U' M' U2 r' D R2",
      "R2 F2 R U2 R U2 R' F2 R U' R' U R",
      "R U R' U' D R' U R' U' R' U R2 D'",
      "y2 R' U' R' D' R U' R' r U2 r' D R2"
    ],
    "moves": 12,
    "desc": "3x3 - ZBLL T - ZBLL T 3 (T1)"
  },
  {
    "id": "zbll_t_zbll_t_4",
    "name": "ZBLL T 4",
    "title": "3x3 - ZBLL T - ZBLL T 4",
    "group": "ZBLL - T - T1",
    "alg": "y2 F R2 D R' U' R D' R2 U' R U2 R' U' F'",
    "algs": [
      "y2 F R2 D R' U' R D' R2 U' R U2 R' U' F'",
      "y' R D R' U' R D' R2 U R U' R' U' R U R' U' R",
      "R U R' U' R' U' F R f' R' U R S",
      "y R2 U R2 U R2 U' R D R' U' R D' R"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL T - ZBLL T 4 (T1)"
  },
  {
    "id": "zbll_t_zbll_t_5",
    "name": "ZBLL T 5",
    "title": "3x3 - ZBLL T - ZBLL T 5",
    "group": "ZBLL - T - T1",
    "alg": "y F R U R' U' R U R' U' F' R U R' U' R' F R F'",
    "algs": [
      "y F R U R' U' R U R' U' F' R U R' U' R' F R F'",
      "y' R U2 R' U2 R U' R' U r' F R F' r U' R'",
      "y' R U2 R' U2 R U' R' U L' U R U' L U' R'",
      "y r' D' r U' r' F r U' r' F D r2 U r' U' r' F r F'"
    ],
    "moves": 19,
    "desc": "3x3 - ZBLL T - ZBLL T 5 (T1)"
  },
  {
    "id": "zbll_t_zbll_t_6",
    "name": "ZBLL T 6",
    "title": "3x3 - ZBLL T - ZBLL T 6",
    "group": "ZBLL - T - T1",
    "alg": "y2 R' U' R' D' R U R' D R2",
    "algs": [
      "y2 R' U' R' D' R U R' D R2",
      "y' F R F' r U R' U' r'",
      "y R' F' r U R U' r' F",
      "y l' U' L U R U' r' F"
    ],
    "moves": 10,
    "desc": "3x3 - ZBLL T - ZBLL T 6 (T1)"
  },
  {
    "id": "zbll_t_zbll_t_7",
    "name": "ZBLL T 7",
    "title": "3x3 - ZBLL T - ZBLL T 7",
    "group": "ZBLL - T - T1",
    "alg": "R' U2 R F U' R' U R U F' R' U R",
    "algs": [
      "R' U2 R F U' R' U R U F' R' U R",
      "R U2 D' R U' R U R U' R2 D U' R'",
      "R' U2 R U' R2 F' R U R U' R' F R U2 R' U R",
      "R' U' R' D' R U2 R' D R U R U' R' U R U R' U R"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL T - ZBLL T 7 (T1)"
  },
  {
    "id": "zbll_t_zbll_t_8",
    "name": "ZBLL T 8",
    "title": "3x3 - ZBLL T - ZBLL T 8",
    "group": "ZBLL - T - T1",
    "alg": "y' R' U' R U R' U R L' U R' U' R L",
    "algs": [
      "y' R' U' R U R' U R L' U R' U' R L",
      "R U R' U' R U' R' U' F R U R' U' R' F' R",
      "R' F' U' F U R U R' U' F U R U' R' F' R",
      "y' R' U' R U R' U R r' F R' F' r R"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL T - ZBLL T 8 (T1)"
  },
  {
    "id": "zbll_t_zbll_t_9",
    "name": "ZBLL T 9",
    "title": "3x3 - ZBLL T - ZBLL T 9",
    "group": "ZBLL - T - T1",
    "alg": "y F U R U2 R' U R U R' F'",
    "algs": [
      "y F U R U2 R' U R U R' F'",
      "L U2 R' U2 R U2 L' U' R' U R",
      "y2 R U2 r' F2 r U2 R' U' L' U L",
      "y F U R U2 R' U R U R' F' U'"
    ],
    "moves": 11,
    "desc": "3x3 - ZBLL T - ZBLL T 9 (T1)"
  },
  {
    "id": "zbll_t_zbll_t_10",
    "name": "ZBLL T 10",
    "title": "3x3 - ZBLL T - ZBLL T 10",
    "group": "ZBLL - T - T1",
    "alg": "y R U R' U' R' F' R U2 R U2 R' F",
    "algs": [
      "y R U R' U' R' F' R U2 R U2 R' F",
      "y L' U2 L U2 L F' L' U' L' U L F",
      "y r' F2 r U2 r U' r' U' r' F r F",
      "y R U R' U2 R U R' y' R' U' R U2 R' U' R"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL T - ZBLL T 10 (T1)"
  },
  {
    "id": "zbll_t_zbll_t_11",
    "name": "ZBLL T 11",
    "title": "3x3 - ZBLL T - ZBLL T 11",
    "group": "ZBLL - T - T1",
    "alg": "y' F U R' U' R F' R' U' R U R' U R",
    "algs": [
      "y' F U R' U' R F' R' U' R U R' U R",
      "y R U R' U' R U R2 D' R U2 R' D R U' R U' R'",
      "x' M' U' R U L' U' R' U' R U R' U R",
      "L R' U' R U L' U' R' U' R U R' U R"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL T - ZBLL T 11 (T1)"
  },
  {
    "id": "zbll_t_zbll_t_12",
    "name": "ZBLL T 12",
    "title": "3x3 - ZBLL T - ZBLL T 12",
    "group": "ZBLL - T - T1",
    "alg": "y' R' U R U R' U' R' D' R U2 R' D R U R",
    "algs": [
      "y' R' U R U R' U' R' D' R U2 R' D R U R",
      "F' U f U2 R U2 R' U2 S'",
      "y r' F R U2 F U2 F' U2 M'",
      "y' R' U r U2 B U2 B' U2 M"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL T - ZBLL T 12 (T1)"
  },
  {
    "id": "zbll_t_zbll_t_13",
    "name": "ZBLL T 13",
    "title": "3x3 - ZBLL T - ZBLL T 13",
    "group": "ZBLL - T - T2",
    "alg": "y2 R' U' R U D' R U' R U R U' R2 D",
    "algs": [
      "y2 R' U' R U D' R U' R U R U' R2 D",
      "R U R D R' U R r' U2 r D' R2",
      "y2 R2 B2 R' U2 R' U2 R B2 R' U R U' R'",
      "R U R D R' U M U2 r D' R2"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL T - ZBLL T 13 (T2)"
  },
  {
    "id": "zbll_t_zbll_t_14",
    "name": "ZBLL T 14",
    "title": "3x3 - ZBLL T - ZBLL T 14",
    "group": "ZBLL - T - T2",
    "alg": "y' R' D' R U R' D R2 U' R' U R U R' U' R U R'",
    "algs": [
      "y' R' D' R U R' D R2 U' R' U R U R' U' R U R'",
      "R' D R2 U' R' U R U R' U' R U R2 D' R",
      "y2 R' U' R U R U f' U' F R U' R' S",
      "R D' R' U R2 U' R2 U' R2 U2 R' D R'"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL T - ZBLL T 14 (T2)"
  },
  {
    "id": "zbll_t_zbll_t_15",
    "name": "ZBLL T 15",
    "title": "3x3 - ZBLL T - ZBLL T 15",
    "group": "ZBLL - T - T2",
    "alg": "y R U R' U R U R' U2 L R U' R' U L'",
    "algs": [
      "y R U R' U R U R' U2 L R U' R' U L'",
      "y2 R' U' R U F U' R' U2 R U F' R' U2 R U2",
      "y' L U L' U L U L' U2 L R U' L' U R'",
      "S R' U R2 U' F U R2 U' F' R S'"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL T - ZBLL T 15 (T2)"
  },
  {
    "id": "zbll_t_zbll_t_16",
    "name": "ZBLL T 16",
    "title": "3x3 - ZBLL T - ZBLL T 16",
    "group": "ZBLL - T - T2",
    "alg": "y2 F R U R' U' R' F' U2 R U R U' R2 U2 R",
    "algs": [
      "y2 F R U R' U' R' F' U2 R U R U' R2 U2 R",
      "M U' r U R' U' R' F R F' M U M'",
      "y' F U2 F' U F U' R U' R' U' R U2 R' U2 F'",
      "L2 U2 L U' L' U L' U2 L' U' R U' L' U R'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL T - ZBLL T 16 (T2)"
  },
  {
    "id": "zbll_t_zbll_t_17",
    "name": "ZBLL T 17",
    "title": "3x3 - ZBLL T - ZBLL T 17",
    "group": "ZBLL - T - T2",
    "alg": "y' r U R' U' r' F R F'",
    "algs": [
      "y' r U R' U' r' F R F'",
      "R U R D R' U' R D' R2",
      "R' F' R U R' U' R' F R U R",
      "x R' U' R D' R' U R D x'"
    ],
    "moves": 9,
    "desc": "3x3 - ZBLL T - ZBLL T 17 (T2)"
  },
  {
    "id": "zbll_t_zbll_t_18",
    "name": "ZBLL T 18",
    "title": "3x3 - ZBLL T - ZBLL T 18",
    "group": "ZBLL - T - T2",
    "alg": "R' U' R U' R2 F' R U R U' R' F U R U' R' U2 R",
    "algs": [
      "R' U' R U' R2 F' R U R U' R' F U R U' R' U2 R",
      "R2 D' R U2 R' D R U R U' R' U R U' R' U R U' R' U2 R",
      "y' R F R' U R U' R' U R U' F' R2 F' R U R U' R' F",
      "R U R D R' U' R D' r2 U' M2 U2 M2 U' M2"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL T - ZBLL T 18 (T2)"
  },
  {
    "id": "zbll_t_zbll_t_19",
    "name": "ZBLL T 19",
    "title": "3x3 - ZBLL T - ZBLL T 19",
    "group": "ZBLL - T - T2",
    "alg": "U2 R U R D R' U2 R D' R' U' R' U R U' R' U' R U' R'",
    "algs": [
      "U2 R U R D R' U2 R D' R' U' R' U R U' R' U' R U' R'",
      "y R2 U R' U' R' U R' U2 D R' U2 R D'",
      "L U2 r' D' F r U' r' F' D r U' L'",
      "y2 R U2 R' f' L U L' U' L' f R U' R'"
    ],
    "moves": 20,
    "desc": "3x3 - ZBLL T - ZBLL T 19 (T2)"
  },
  {
    "id": "zbll_t_zbll_t_20",
    "name": "ZBLL T 20",
    "title": "3x3 - ZBLL T - ZBLL T 20",
    "group": "ZBLL - T - T2",
    "alg": "y' R U R' U' R U' R' L U' R U R' L'",
    "algs": [
      "y' R U R' U' R U' R' L U' R U R' L'",
      "y' R U S' R' U' R S R2 F R F'",
      "y2 x' D R U' R' U R' U' D R' U R D2 x",
      "F U R' F2 R U' F' U' R U2 R' r U r' U2"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL T - ZBLL T 20 (T2)"
  },
  {
    "id": "zbll_t_zbll_t_21",
    "name": "ZBLL T 21",
    "title": "3x3 - ZBLL T - ZBLL T 21",
    "group": "ZBLL - T - T2",
    "alg": "y' R U2 R' U2 R' F R U R U' R' F'",
    "algs": [
      "y' R U2 R' U2 R' F R U R U' R' F'",
      "y R' U' R U2 R' F R U R' U' R' F' R U' R",
      "y R' U' R U2 R' U' R y R U R' U2 R U R'",
      "y' L' U' L U L F L' U2 L' U2 L F'"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL T - ZBLL T 21 (T2)"
  },
  {
    "id": "zbll_t_zbll_t_22",
    "name": "ZBLL T 22",
    "title": "3x3 - ZBLL T - ZBLL T 22",
    "group": "ZBLL - T - T2",
    "alg": "y' F' U' r' F2 r U F R U' R'",
    "algs": [
      "y' F' U' r' F2 r U F R U' R'",
      "y' F' U' L' U2 L U' L' U' L F",
      "y2 R' U' R U' R' U R' F' R U R U' R' F R",
      "y B' U' R' U2 R U' R' U' R B"
    ],
    "moves": 11,
    "desc": "3x3 - ZBLL T - ZBLL T 22 (T2)"
  },
  {
    "id": "zbll_t_zbll_t_23",
    "name": "ZBLL T 23",
    "title": "3x3 - ZBLL T - ZBLL T 23",
    "group": "ZBLL - T - T2",
    "alg": "y' R U' R' U' R U R D R' U2 R D' R' U' R'",
    "algs": [
      "y' R U' R' U' R U R D R' U2 R D' R' U' R'",
      "y2 f R' F' U2 R' U2 R U2 S'",
      "F U' B' R2 U' R2 U R2 F' B",
      "y' R U' r' U2 F' U2 F U2 M'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL T - ZBLL T 23 (T2)"
  },
  {
    "id": "zbll_t_zbll_t_24",
    "name": "ZBLL T 24",
    "title": "3x3 - ZBLL T - ZBLL T 24",
    "group": "ZBLL - T - T2",
    "alg": "y2 R L' U R' U' L U R U R' U' R U' R'",
    "algs": [
      "y2 R L' U R' U' L U R U R' U' R U' R'",
      "y R' U' R U R' U' R2 D R' U2 R D' R' U R' U R",
      "S' R U R' S R U' R' U' R U R' U' R' F R F'",
      "y' f' L' U L U' f R U R' U' R U' R'"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL T - ZBLL T 24 (T2)"
  },
  {
    "id": "zbll_t_zbll_t_25",
    "name": "ZBLL T 25",
    "title": "3x3 - ZBLL T - ZBLL T 25",
    "group": "ZBLL - T - T3",
    "alg": "R' U R U2 L' R' U R U' L",
    "algs": [
      "R' U R U2 L' R' U R U' L",
      "R' U' R' U' R U R' F' R U R' U' R' F R'",
      "R' U R U2 r' R' F R F' r",
      "y2 L' U R' U' L R U2 R' U' R"
    ],
    "moves": 10,
    "desc": "3x3 - ZBLL T - ZBLL T 25 (T3)"
  },
  {
    "id": "zbll_t_zbll_t_26",
    "name": "ZBLL T 26",
    "title": "3x3 - ZBLL T - ZBLL T 26",
    "group": "ZBLL - T - T3",
    "alg": "y R U R2 F R F' R U' R' F' U F",
    "algs": [
      "y R U R2 F R F' R U' R' F' U F",
      "y' R U R D R' U' R D' R' U2 R' U' R U' R'",
      "L' U2 L U L' U L U' L' U R U' L U R'",
      "R U R' U R U2 R D R' U R D' R' U' R'"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL T - ZBLL T 26 (T3)"
  },
  {
    "id": "zbll_t_zbll_t_27",
    "name": "ZBLL T 27",
    "title": "3x3 - ZBLL T - ZBLL T 27",
    "group": "ZBLL - T - T3",
    "alg": "y2 R U' R' U2 L R U' R' U L'",
    "algs": [
      "y2 R U' R' U2 L R U' R' U L'",
      "y2 R' F R U R' U' R' F' R2 U' R' U2 R",
      "r U R2 F R F' R U2 r' U r U r' U2",
      "R' U2 R U R2 F R U R U' R' F' R"
    ],
    "moves": 11,
    "desc": "3x3 - ZBLL T - ZBLL T 27 (T3)"
  },
  {
    "id": "zbll_t_zbll_t_28",
    "name": "ZBLL T 28",
    "title": "3x3 - ZBLL T - ZBLL T 28",
    "group": "ZBLL - T - T3",
    "alg": "y' R' U' R' D' R U R' D R U2 R U R' U R",
    "algs": [
      "y' R' U' R' D' R U R' D R U2 R U R' U R",
      "R U2 R' U' R' F R2 U' R' U' R U R' F' R U' R'",
      "y R' F R' F' R2 U' R' U R f R' f'",
      "y f R f' R' U' R U R2 F R F' R"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL T - ZBLL T 28 (T3)"
  },
  {
    "id": "zbll_t_zbll_t_29",
    "name": "ZBLL T 29",
    "title": "3x3 - ZBLL T - ZBLL T 29",
    "group": "ZBLL - T - T3",
    "alg": "F R U' R' U' R U2 R' U' F' R' U' R U' R' U2 R",
    "algs": [
      "F R U' R' U' R U2 R' U' F' R' U' R U' R' U2 R",
      "y' R U R' U R' D' R U R' D R U R' F R U R U' R' F'",
      "r' U' R' F2 R F' R' F2 R2 U' R' U2 r",
      "r' U' l' U2 R U' R' U2 l R U' R' U2 r"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL T - ZBLL T 29 (T3)"
  },
  {
    "id": "zbll_t_zbll_t_30",
    "name": "ZBLL T 30",
    "title": "3x3 - ZBLL T - ZBLL T 30",
    "group": "ZBLL - T - T3",
    "alg": "R' U2 R U R' U R F U R U2 R' U R U R' F'",
    "algs": [
      "R' U2 R U R' U R F U R U2 R' U R U R' F'",
      "r' U2 R U R2 F2 R F R' F2 R U r",
      "y2 F R U R' U' R' F' R U' R' D' R U' R' D R U' R U' R'",
      "r' U2 R U R' l' U2 R U R' U2 l U r"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL T - ZBLL T 30 (T3)"
  },
  {
    "id": "zbll_t_zbll_t_31",
    "name": "ZBLL T 31",
    "title": "3x3 - ZBLL T - ZBLL T 31",
    "group": "ZBLL - T - T3",
    "alg": "y2 r U' r U2 R' F R U2 r2 F",
    "algs": [
      "y2 r U' r U2 R' F R U2 r2 F",
      "R' U R U2 R' U' F' R U R' U R U2 R' F R",
      "y2 F' r2 U2 R' F' R U2 r' U r'",
      "y' F B' R U R' U' R' F R2 U' R' U' R U R' F' S"
    ],
    "moves": 11,
    "desc": "3x3 - ZBLL T - ZBLL T 31 (T3)"
  },
  {
    "id": "zbll_t_zbll_t_32",
    "name": "ZBLL T 32",
    "title": "3x3 - ZBLL T - ZBLL T 32",
    "group": "ZBLL - T - T3",
    "alg": "y2 R' U' R2 U R' F' R U R' U' R' F R2 U' R' U' R' U R",
    "algs": [
      "y2 R' U' R2 U R' F' R U R' U' R' F R2 U' R' U' R' U R",
      "R U R' U' R' U L' U2 R U' R' U2 L R2 U' R'",
      "y' r U R' U' r' F R F' U R U R' U' R' F R2 U' R' U' R U R' F'",
      "y2 F R U' R' S U' R U f' U R2 F R F' R"
    ],
    "moves": 20,
    "desc": "3x3 - ZBLL T - ZBLL T 32 (T3)"
  },
  {
    "id": "zbll_t_zbll_t_33",
    "name": "ZBLL T 33",
    "title": "3x3 - ZBLL T - ZBLL T 33",
    "group": "ZBLL - T - T3",
    "alg": "R U' R' U R U R' U' R U R' U' R' D' R U' R' D R",
    "algs": [
      "R U' R' U R U R' U' R U R' U' R' D' R U' R' D R",
      "y2 R' U' R U' R' U R F U' R' U2 R U F'",
      "y2 R' U' R U' R' U R U L U2 R' U2 R U2 L'",
      "y2 R' U' R U' R' U R U L U2 R' U2 R U2 L' U"
    ],
    "moves": 19,
    "desc": "3x3 - ZBLL T - ZBLL T 33 (T3)"
  },
  {
    "id": "zbll_t_zbll_t_34",
    "name": "ZBLL T 34",
    "title": "3x3 - ZBLL T - ZBLL T 34",
    "group": "ZBLL - T - T3",
    "alg": "R U R' U R U' R' U' L' U2 R U2 R' U2 L",
    "algs": [
      "R U R' U R U' R' U' L' U2 R U2 R' U2 L",
      "R U R' U R U' R' F' U' L' U2 L U F",
      "R U R' U R U' R' U' R' F2 R F2 L' U2 L",
      "y2 R' U R U' R' U' R U R' U' R U R D R' U R D' R'"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL T - ZBLL T 34 (T3)"
  },
  {
    "id": "zbll_t_zbll_t_35",
    "name": "ZBLL T 35",
    "title": "3x3 - ZBLL T - ZBLL T 35",
    "group": "ZBLL - T - T3",
    "alg": "y2 R' D' R U R' D R U R U' R' U R U' R' U' R U R'",
    "algs": [
      "y2 R' D' R U R' D R U R U' R' U R U' R' U' R U R'",
      "F U' R' U2 R U F' R' U' R U R' U R",
      "R U2 R' F' R U R' U' R' F R U2 R U' R' U' R U R'",
      "y' R U2 L' U2 L U2 R' U' L' U' L U L' U L"
    ],
    "moves": 20,
    "desc": "3x3 - ZBLL T - ZBLL T 35 (T3)"
  },
  {
    "id": "zbll_t_zbll_t_36",
    "name": "ZBLL T 36",
    "title": "3x3 - ZBLL T - ZBLL T 36",
    "group": "ZBLL - T - T3",
    "alg": "R D R' U' R D' R' U' R' U R U' R' U R U R' U' R",
    "algs": [
      "R D R' U' R D' R' U' R' U R U' R' U R U R' U' R",
      "y L' U2 R U2 R' U2 L U R U R' U' R U' R'",
      "y2 F' U' L' U2 L U F R U R' U' R U' R'",
      "F' U L U2 L' U' F L U L' U' L U' L'"
    ],
    "moves": 19,
    "desc": "3x3 - ZBLL T - ZBLL T 36 (T3)"
  },
  {
    "id": "zbll_t_zbll_t_37",
    "name": "ZBLL T 37",
    "title": "3x3 - ZBLL T - ZBLL T 37",
    "group": "ZBLL - T - T4",
    "alg": "R' D' R U R' D R2 U R' U2 R U' R' U' R U' R'",
    "algs": [
      "R' D' R U R' D R2 U R' U2 R U' R' U' R U' R'",
      "y R U R' L' U2 R U' R' U2 L U R U' R'",
      "y2 F U F' U2 R F R' U' R F' R' U' F U' F'",
      "y' L U L' U F' U L U' L' U' F L U' L'"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL T - ZBLL T 37 (T4)"
  },
  {
    "id": "zbll_t_zbll_t_38",
    "name": "ZBLL T 38",
    "title": "3x3 - ZBLL T - ZBLL T 38",
    "group": "ZBLL - T - T4",
    "alg": "y' R U R2 D' R U2 R' D R U2 R U R' U' R U' R'",
    "algs": [
      "y' R U R2 D' R U2 R' D R U2 R U R' U' R U' R'",
      "R' U2 R' D' R U2 R' D R' U R' U R U2 R'",
      "y' R2 F' R U S' R U' R' f R f R f'",
      "R' U2 R' D' R U2 R' D R3 U R' U R U2 R'"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL T - ZBLL T 38 (T4)"
  },
  {
    "id": "zbll_t_zbll_t_39",
    "name": "ZBLL T 39",
    "title": "3x3 - ZBLL T - ZBLL T 39",
    "group": "ZBLL - T - T4",
    "alg": "y R' U' R U' F U' R' U R U F' R' U R",
    "algs": [
      "y R' U' R U' F U' R' U R U F' R' U R",
      "y2 R D R' U' R D' R2 U' R U2 R' U R U R' U R",
      "y R D' R2 U' R U2 R' U R U R' U R U' R D R'",
      "y R' U' R U2 R2 F' R U R U' R' F R U2 R' U R"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL T - ZBLL T 39 (T4)"
  },
  {
    "id": "zbll_t_zbll_t_40",
    "name": "ZBLL T 40",
    "title": "3x3 - ZBLL T - ZBLL T 40",
    "group": "ZBLL - T - T4",
    "alg": "R' U2 R' D' R U2 R' D R2 U' R' U2 R U R' U R",
    "algs": [
      "R' U2 R' D' R U2 R' D R2 U' R' U2 R U R' U R",
      "y2 R U2 R D R' U2 R D' R U' R U' R' U2 R",
      "y' R' F2 R U' R2 F2 R2 U' R' U2 R' F2 R2",
      "F R U R' U' F' R U R' U R U' R' U' R' F R F'"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL T - ZBLL T 40 (T4)"
  },
  {
    "id": "zbll_t_zbll_t_41",
    "name": "ZBLL T 41",
    "title": "3x3 - ZBLL T - ZBLL T 41",
    "group": "ZBLL - T - T4",
    "alg": "y' l' U2 R' D2 R U2 R' D2 R2 x'",
    "algs": [
      "y' l' U2 R' D2 R U2 R' D2 R2 x'",
      "y' x R' U2 R' D2 R U2 R' D2 R2 x'",
      "y2 R U2 R' U R U R' y' R' U' R U2 R' U' R",
      "y' l' U2 R' D2 R U2 R' D2 l2"
    ],
    "moves": 11,
    "desc": "3x3 - ZBLL T - ZBLL T 41 (T4)"
  },
  {
    "id": "zbll_t_zbll_t_42",
    "name": "ZBLL T 42",
    "title": "3x3 - ZBLL T - ZBLL T 42",
    "group": "ZBLL - T - T4",
    "alg": "y' l U2 R D2 R' U2 R D2 R2 x",
    "algs": [
      "y' l U2 R D2 R' U2 R D2 R2 x",
      "y' x' R U2 R D2 R' U2 R D2 R2 x",
      "R' U2 R U' R' F R U R' U' R' F' R U' R",
      "R' U2 R U' R' U' R y R U R' U2 R U R'"
    ],
    "moves": 11,
    "desc": "3x3 - ZBLL T - ZBLL T 42 (T4)"
  },
  {
    "id": "zbll_t_zbll_t_43",
    "name": "ZBLL T 43",
    "title": "3x3 - ZBLL T - ZBLL T 43",
    "group": "ZBLL - T - T4",
    "alg": "y2 F R U R' U' R U' R' U' R U R' F'",
    "algs": [
      "y2 F R U R' U' R U' R' U' R U R' F'",
      "f U R U' R' U R' U' R f' R' U R",
      "y R' F' U' F U R F R' F' R U R U' R'",
      "y2 F R U R' U' R U' R' U' R U R' F' U2"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL T - ZBLL T 43 (T4)"
  },
  {
    "id": "zbll_t_zbll_t_44",
    "name": "ZBLL T 44",
    "title": "3x3 - ZBLL T - ZBLL T 44",
    "group": "ZBLL - T - T4",
    "alg": "y' R U R' U2 R U' R' U2 R U' R2 F' R U R U' R' F",
    "algs": [
      "y' R U R' U2 R U' R' U2 R U' R2 F' R U R U' R' F",
      "F' U' F U R' F R2 U R' U' R' F' R2 U R'",
      "y R U R' U2 R D' R U' R' U' R U2 R' U D R'",
      "r U2 R2 F R F' U2 r' F R U R U' R' F'"
    ],
    "moves": 19,
    "desc": "3x3 - ZBLL T - ZBLL T 44 (T4)"
  },
  {
    "id": "zbll_t_zbll_t_45",
    "name": "ZBLL T 45",
    "title": "3x3 - ZBLL T - ZBLL T 45",
    "group": "ZBLL - T - T4",
    "alg": "y R' U' R' D' R U R' D R U' R U' R' U2 R",
    "algs": [
      "y R' U' R' D' R U R' D R U' R U' R' U2 R",
      "y2 r' D' r U' r' F2 r U' r' F' D r",
      "y2 F U' R' U2 R' U2 R U' R' U' R U R U F'",
      "y2 f R f' R2 u' R U' R' U R' u R3 U R' U R U2 l' L' B' L B' L' B2 L B2 x'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL T - ZBLL T 45 (T4)"
  },
  {
    "id": "zbll_t_zbll_t_46",
    "name": "ZBLL T 46",
    "title": "3x3 - ZBLL T - ZBLL T 46",
    "group": "ZBLL - T - T4",
    "alg": "y R U R' U R' D' R U' R' D R U R U2 R'",
    "algs": [
      "y R U R' U R' D' R U' R' D R U R U2 R'",
      "y2 R F R' U R U2 R' U R U F' R'",
      "y R U R D R' U' R D' R' U R' U R U2 R'",
      "R' D' R U R' D R U2 R U2 R' U R U R'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL T - ZBLL T 46 (T4)"
  },
  {
    "id": "zbll_t_zbll_t_47",
    "name": "ZBLL T 47",
    "title": "3x3 - ZBLL T - ZBLL T 47",
    "group": "ZBLL - T - T4",
    "alg": "r U R' U' r' F R F' R' U2 R U R' U R",
    "algs": [
      "r U R' U' r' F R F' R' U2 R U R' U R",
      "R' U R2 D R' U R D' R' U R' U' R U' R' U' R",
      "y f R' F' R U2 R' F R F' R U2 R' S'",
      "M' f' U' f r' U' R U' R U R' U R"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL T - ZBLL T 47 (T4)"
  },
  {
    "id": "zbll_t_zbll_t_48",
    "name": "ZBLL T 48",
    "title": "3x3 - ZBLL T - ZBLL T 48",
    "group": "ZBLL - T - T4",
    "alg": "y2 R U2 R' U' R U' R2 F' r U R U' r' F",
    "algs": [
      "y2 R U2 R' U' R U' R2 F' r U R U' r' F",
      "y2 R U' R2 D' R U' R' D R U' R U R' U R U R'",
      "y2 F R U R' U' R' F' R U F' R U R' U' R' F R2 U' R'",
      "y2 M F R F' r U R' U R' U' R U' R'"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL T - ZBLL T 48 (T4)"
  },
  {
    "id": "zbll_t_zbll_t_49",
    "name": "ZBLL T 49",
    "title": "3x3 - ZBLL T - ZBLL T 49",
    "group": "ZBLL - T - T5",
    "alg": "y R' U' R U R' U' R2 D R' U R D' R' U2 R' U R",
    "algs": [
      "y R' U' R U R' U' R2 D R' U R D' R' U2 R' U R",
      "R' U' R U R2 D' R U2 R' D R2 U2 R' U2 R",
      "y' R2 U2 R U2 R' U L' R U R' U' R2 L",
      "F U R' D' r U2 r' D R2 U' R' U F'"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL T - ZBLL T 49 (T5)"
  },
  {
    "id": "zbll_t_zbll_t_50",
    "name": "ZBLL T 50",
    "title": "3x3 - ZBLL T - ZBLL T 50",
    "group": "ZBLL - T - T5",
    "alg": "R U' R' U R U R' U' R U R' U R' D' R U R' D R",
    "algs": [
      "R U' R' U R U R' U' R U R' U R' D' R U R' D R",
      "R' U D' R U2 R' D R' U' R U2 R' U' R2",
      "F U' R2 U R' U R U2 R2 U' R U2 R' F'",
      "y R D R' U R D' R' U R' U R U' R' U R U R' U' R"
    ],
    "moves": 19,
    "desc": "3x3 - ZBLL T - ZBLL T 50 (T5)"
  },
  {
    "id": "zbll_t_zbll_t_51",
    "name": "ZBLL T 51",
    "title": "3x3 - ZBLL T - ZBLL T 51",
    "group": "ZBLL - T - T5",
    "alg": "y R U' R2 D' r U2 r' D R2 U' R' U' R U' R'",
    "algs": [
      "y R U' R2 D' r U2 r' D R2 U' R' U' R U' R'",
      "y R' U' R U' R' U' R2 D r' U2 r D' R2 U' R",
      "y2 R U2 R' U2 R U R2 D' R U' R' D R U2 R U' R'",
      "R U R' U' R' U R D R' U' R2 D' R D R2 D' R"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL T - ZBLL T 51 (T5)"
  },
  {
    "id": "zbll_t_zbll_t_52",
    "name": "ZBLL T 52",
    "title": "3x3 - ZBLL T - ZBLL T 52",
    "group": "ZBLL - T - T5",
    "alg": "y2 R U R' U2 R' D' R U R' D R2 U' R' U R U' R'",
    "algs": [
      "y2 R U R' U2 R' D' R U R' D R2 U' R' U R U' R'",
      "R2 U R' D' R U R' D R' U' R2 U' R2",
      "y2 R' U F' R' U2 R U2 F U' R' U R2",
      "f R2 D R' U R D' R U' R' f' R' U R"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL T - ZBLL T 52 (T5)"
  },
  {
    "id": "zbll_t_zbll_t_53",
    "name": "ZBLL T 53",
    "title": "3x3 - ZBLL T - ZBLL T 53",
    "group": "ZBLL - T - T5",
    "alg": "y2 r2 U R' U' r' F R F' U R' U' r' F R F'",
    "algs": [
      "y2 r2 U R' U' r' F R F' U R' U' r' F R F'",
      "y R U R D R' U R D' R' U L' U R' U' L",
      "y2 F U R' D' R U R' D R U' R' D' R U' R' D R F'",
      "y2 R2 D' R U' R' D R U R U R' U2 R' D' R U2 R' D R2"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL T - ZBLL T 53 (T5)"
  },
  {
    "id": "zbll_t_zbll_t_54",
    "name": "ZBLL T 54",
    "title": "3x3 - ZBLL T - ZBLL T 54",
    "group": "ZBLL - T - T5",
    "alg": "y2 R2 F R U R' U' R' F' R' U' R2 U2 R U2 R",
    "algs": [
      "y2 R2 F R U R' U' R' F' R' U' R2 U2 R U2 R",
      "y r U r' R U R' U' R U R' U' r U' r' F R U R' U' F'",
      "f' U' F R' D' R U2 R' D R U' f R' F' R",
      "R U R' U R U' R' U R L' U L U2 R' U' L' U2 L"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL T - ZBLL T 54 (T5)"
  },
  {
    "id": "zbll_t_zbll_t_55",
    "name": "ZBLL T 55",
    "title": "3x3 - ZBLL T - ZBLL T 55",
    "group": "ZBLL - T - T5",
    "alg": "y2 R U' R2 D' r U2 r' D R2 U R'",
    "algs": [
      "y2 R U' R2 D' r U2 r' D R2 U R'",
      "R U R' U R U' R' L' U2 R U R' U2 L",
      "y R U R' U' R2 D R' U2 R D' R2 U R U' R'",
      "L' U2 R U' R' U2 L R U R' U' R U' R'"
    ],
    "moves": 12,
    "desc": "3x3 - ZBLL T - ZBLL T 55 (T5)"
  },
  {
    "id": "zbll_t_zbll_t_56",
    "name": "ZBLL T 56",
    "title": "3x3 - ZBLL T - ZBLL T 56",
    "group": "ZBLL - T - T5",
    "alg": "R' U R2 D r' U2 r D' R2 U' R",
    "algs": [
      "R' U R2 D r' U2 r D' R2 U' R",
      "y R' U' R U R2 D' R U2 R' D R2 U' R' U R",
      "y2 R' U' R U' R' U R U R' F' R U R' U' R' F R2",
      "L' U' L U' L' U L R U2 L' U' L U2 R'"
    ],
    "moves": 11,
    "desc": "3x3 - ZBLL T - ZBLL T 56 (T5)"
  },
  {
    "id": "zbll_t_zbll_t_57",
    "name": "ZBLL T 57",
    "title": "3x3 - ZBLL T - ZBLL T 57",
    "group": "ZBLL - T - T5",
    "alg": "R' U' R U2 R D R' U' R D' R2 U R U' R' U R",
    "algs": [
      "R' U' R U2 R D R' U' R D' R2 U R U' R' U R",
      "y2 R2 U' R D R' U' R D' R U R2 U R2",
      "R' U2 R U2 R2 D' R U2 R' D R2 U' R' U R",
      "y F U' R U R2 D' r U2 r' D R U' F'"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL T - ZBLL T 57 (T5)"
  },
  {
    "id": "zbll_t_zbll_t_58",
    "name": "ZBLL T 58",
    "title": "3x3 - ZBLL T - ZBLL T 58",
    "group": "ZBLL - T - T5",
    "alg": "y R' D' R U' R' D R U' R U' R' U R U' R' U' R U R'",
    "algs": [
      "y R' D' R U' R' D R U' R U' R' U R U' R' U' R U R'",
      "y2 R' U R U' R' U' R U R' U' R U' R D R' U' R D' R'",
      "y' R2 U R U2 R' U R D' R U2 R' D U' R",
      "F R U2 R' U R2 U2 R' U' R U' R2 U F'"
    ],
    "moves": 20,
    "desc": "3x3 - ZBLL T - ZBLL T 58 (T5)"
  },
  {
    "id": "zbll_t_zbll_t_59",
    "name": "ZBLL T 59",
    "title": "3x3 - ZBLL T - ZBLL T 59",
    "group": "ZBLL - T - T5",
    "alg": "y R U R' U' R U R2 D' R U' R' D R U2 R U' R'",
    "algs": [
      "y R U R' U' R U R2 D' R U' R' D R U2 R U' R'",
      "y2 R U R' U' R2 D R' U2 R D' R2 U2 R U2 R'",
      "y' R2 U' R U F' U2 R' U2 R F U' R",
      "L U L' U' L2 D L' U2 L D' L2 U2 L U2 L'"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL T - ZBLL T 59 (T5)"
  },
  {
    "id": "zbll_t_zbll_t_60",
    "name": "ZBLL T 60",
    "title": "3x3 - ZBLL T - ZBLL T 60",
    "group": "ZBLL - T - T5",
    "alg": "y2 R U R' F' R U R' U' R' F R U' R' F R U R U' R' F'",
    "algs": [
      "y2 R U R' F' R U R' U' R' F R U' R' F R U R U' R' F'",
      "y R U R' U R U R2 D' r U2 r' D R2 U R'",
      "y R' U R2 D r' U2 r D' R2 U R U R' U R",
      "y' R U R' U2 R' D' R U R' D R2 U' R' U2 R U2 R'"
    ],
    "moves": 21,
    "desc": "3x3 - ZBLL T - ZBLL T 60 (T5)"
  },
  {
    "id": "zbll_t_zbll_t_61",
    "name": "ZBLL T 61",
    "title": "3x3 - ZBLL T - ZBLL T 61",
    "group": "ZBLL - T - T6",
    "alg": "y2 R U' R' U2 R U R' U2 R U R' U R U' R'",
    "algs": [
      "y2 R U' R' U2 R U R' U2 R U R' U R U' R'",
      "y' R' U' R U' R' U2 R U R' U2 R U R' U R",
      "y' r U R' U' r' F R F' R2 x F R F' R U2 r' U r U2 x' U2",
      "L U' L' U2 L U L' U2 L U L' U L U' L'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL T - ZBLL T 61 (T6)"
  },
  {
    "id": "zbll_t_zbll_t_62",
    "name": "ZBLL T 62",
    "title": "3x3 - ZBLL T - ZBLL T 62",
    "group": "ZBLL - T - T6",
    "alg": "y' R U R' U R U2 R' U' R U2 R' U' R U' R'",
    "algs": [
      "y' R U R' U R U2 R' U' R U2 R' U' R U' R'",
      "R' U R U2 R' U' R U2 R' U' R U' R' U R",
      "y2 L' U L U2 L' U' L U2 L' U' L U' L' U L",
      "y L U L' U L U2 L' U' L U2 L' U' L U' L'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL T - ZBLL T 62 (T6)"
  },
  {
    "id": "zbll_t_zbll_t_63",
    "name": "ZBLL T 63",
    "title": "3x3 - ZBLL T - ZBLL T 63",
    "group": "ZBLL - T - T6",
    "alg": "y' R U R' U R U' R' U R' U' R2 U' R2 U2 R",
    "algs": [
      "y' R U R' U R U' R' U R' U' R2 U' R2 U2 R",
      "R U' R U2 R U2 R' U R U R' U' R' U R' U'",
      "y R' U R U2 R' U' R U' R U R' U' R' U' R U2 R U2 R'",
      "y R' F' U' F U' R U R2 F R F' U R"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL T - ZBLL T 63 (T6)"
  },
  {
    "id": "zbll_t_zbll_t_64",
    "name": "ZBLL T 64",
    "title": "3x3 - ZBLL T - ZBLL T 64",
    "group": "ZBLL - T - T6",
    "alg": "R U2 R' U' R U' R' U R U R' U R U2 R'",
    "algs": [
      "R U2 R' U' R U' R' U R U R' U R U2 R'",
      "y2 L U2 L' U' L U' L' U L U L' U L U2 L'",
      "R U2 R' U' R U' R' U R U R' U R U2 R' U'",
      "y' R U R' f' z F' R U R' U' R' F R2 U' R' f z'"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL T - ZBLL T 64 (T6)"
  },
  {
    "id": "zbll_t_zbll_t_65",
    "name": "ZBLL T 65",
    "title": "3x3 - ZBLL T - ZBLL T 65",
    "group": "ZBLL - T - T6",
    "alg": "y' R' U' R U' R' U R U' R U R2 U R2 U2 R'",
    "algs": [
      "y' R' U' R U' R' U R U' R U R2 U R2 U2 R'",
      "R' U R2 U R' U R' U' R U' R' U' R U R U' R'",
      "y L' U' L U' L' U L U' L U L2 U L2 U2 L'",
      "y z D R' U R' D' R U' R U' R D R' U D' z'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL T - ZBLL T 65 (T6)"
  },
  {
    "id": "zbll_t_zbll_t_66",
    "name": "ZBLL T 66",
    "title": "3x3 - ZBLL T - ZBLL T 66",
    "group": "ZBLL - T - T6",
    "alg": "y2 R' U2 R U R' U R U' R' U' R U' R' U2 R",
    "algs": [
      "y2 R' U2 R U R' U R U' R' U' R U' R' U2 R",
      "L' U2 L U L' U L U' L' U' L U' L' U2 L",
      "y2 R' U2 R U R' U R U L' U' L U' L' U2 L",
      "R U2 R2 U R' U2 R2 U R U' R U' R U' R2"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL T - ZBLL T 66 (T6)"
  },
  {
    "id": "zbll_t_zbll_t_67",
    "name": "ZBLL T 67",
    "title": "3x3 - ZBLL T - ZBLL T 67",
    "group": "ZBLL - T - T6",
    "alg": "y' R' U' R2 U R2 U R2 U2 R' U R' U R",
    "algs": [
      "y' R' U' R2 U R2 U R2 U2 R' U R' U R",
      "R U2 R' U2 R' U2 R U R U' R' U R' U R",
      "L' U L2 F' L' F r' F U' F U F r",
      "y L' U' L2 U L2 U L2 U2 L' U L' U L"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL T - ZBLL T 67 (T6)"
  },
  {
    "id": "zbll_t_zbll_t_68",
    "name": "ZBLL T 68",
    "title": "3x3 - ZBLL T - ZBLL T 68",
    "group": "ZBLL - T - T6",
    "alg": "y' R U R2 U' R2 U' R2 U2 R U' R U' R'",
    "algs": [
      "y' R U R2 U' R2 U' R2 U2 R U' R U' R'",
      "y2 R' U2 R U2 R U2 R' U' R' U R U' R U' R'",
      "R U' R2 F R F' R U' B U' B' U' R'",
      "R U2 R' U2 R' U' F U R U' R U R' U' F'"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL T - ZBLL T 68 (T6)"
  },
  {
    "id": "zbll_t_zbll_t_69",
    "name": "ZBLL T 69",
    "title": "3x3 - ZBLL T - ZBLL T 69",
    "group": "ZBLL - T - T6",
    "alg": "R U2 R' U' R U' R2 U2 R U R' U R",
    "algs": [
      "R U2 R' U' R U' R2 U2 R U R' U R",
      "y2 L U2 L' U' L U' L2 U2 L U L' U L",
      "R U2 R' U' R U' R' U2 L' U2 L U L' U L",
      "y' R' U R2 U R' U R U2 R' U' R U R' U R U2 R2 U R"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL T - ZBLL T 69 (T6)"
  },
  {
    "id": "zbll_t_zbll_t_70",
    "name": "ZBLL T 70",
    "title": "3x3 - ZBLL T - ZBLL T 70",
    "group": "ZBLL - T - T6",
    "alg": "y2 R' U2 R U R' U R2 U2 R' U' R U' R'",
    "algs": [
      "y2 R' U2 R U R' U R2 U2 R' U' R U' R'",
      "L' U2 L U L' U L2 U2 L' U' L U' L'",
      "L' U2 L U L' U L U2 R U2 R' U' R U' R'"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL T - ZBLL T 70 (T6)"
  },
  {
    "id": "zbll_t_zbll_t_71",
    "name": "ZBLL T 71",
    "title": "3x3 - ZBLL T - ZBLL T 71",
    "group": "ZBLL - T - T6",
    "alg": "R' U R U2 R' U' R U' R U R' U' R' U' R U R U' R'",
    "algs": [
      "R' U R U2 R' U' R U' R U R' U' R' U' R U R U' R'",
      "x D' R' U R D R2 D2 R U' R' D2 R l",
      "y R2 U R2 U R U' R' U R2 U2 R' U R' U R U' R'",
      "y' R U R' U R U' R2 U' R' U' R U R' U' R2 U2 R"
    ],
    "moves": 19,
    "desc": "3x3 - ZBLL T - ZBLL T 71 (T6)"
  },
  {
    "id": "zbll_t_zbll_t_72",
    "name": "ZBLL T 72",
    "title": "3x3 - ZBLL T - ZBLL T 72",
    "group": "ZBLL - T - T6",
    "alg": "y' R U R' U R U2 R' U2 R' U' R U' R' U2 R",
    "algs": [
      "y' R U R' U R U2 R' U2 R' U' R U' R' U2 R",
      "y' R U R' U R U2 R' L' U' L U' L' U2 L",
      "y2 R U R' U' R' F D' R U R' D R2 U' R' F'",
      "y L' U' L U' L' U2 L R U R' U R U2 R'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL T - ZBLL T 72 (T6)"
  },
  {
    "id": "zbll_u_zbll_u_1",
    "name": "ZBLL U 1",
    "title": "3x3 - ZBLL U - ZBLL U 1",
    "group": "ZBLL - U - U1",
    "alg": "R U' R' U' R U2 R' U' R' D' R U2 R' D R",
    "algs": [
      "R U' R' U' R U2 R' U' R' D' R U2 R' D R",
      "R' U' R U' R' U2 R2 U' L' U R' U' L",
      "y F R' F' U' F R S U R2 U' R' f'",
      "R' U' R U' R' U2 R2 U' r' F R' F' r"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL U - ZBLL U 1 (U1)"
  },
  {
    "id": "zbll_u_zbll_u_2",
    "name": "ZBLL U 2",
    "title": "3x3 - ZBLL U - ZBLL U 2",
    "group": "ZBLL - U - U1",
    "alg": "y' R U2 R D R' U2 R D' R' U2 R' U' R U' R'",
    "algs": [
      "y' R U2 R D R' U2 R D' R' U2 R' U' R U' R'",
      "y2 R U' L' U R' U' L R' U' R U' R' U2 R",
      "z U R' D' R U' R' D U' R' U R' U' R2 U z'",
      "y2 S R U' R' U' F' U2 F U R U' R' S'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL U - ZBLL U 2 (U1)"
  },
  {
    "id": "zbll_u_zbll_u_3",
    "name": "ZBLL U 3",
    "title": "3x3 - ZBLL U - ZBLL U 3",
    "group": "ZBLL - U - U1",
    "alg": "y2 R2 D r' U2 r D' R' U2 R'",
    "algs": [
      "y2 R2 D r' U2 r D' R' U2 R'",
      "R' U2 R U R2 F' R U R U' R' F R",
      "R' U r' F R F' r U2 R' U R",
      "y F' R U R' F' R U R' U' R' F R2 U' R' F"
    ],
    "moves": 10,
    "desc": "3x3 - ZBLL U - ZBLL U 3 (U1)"
  },
  {
    "id": "zbll_u_zbll_u_4",
    "name": "ZBLL U 4",
    "title": "3x3 - ZBLL U - ZBLL U 4",
    "group": "ZBLL - U - U1",
    "alg": "y R U R2 D' R U R' D R2 U2 R'",
    "algs": [
      "y R U R2 D' R U R' D R2 U2 R'",
      "y R U R' U R U' R' U' R' F R U R U' R' F'",
      "y R2 D R' U R D' R2 U R U2 R'",
      "U R U R2 D' R U R' D R2 U2 R'"
    ],
    "moves": 12,
    "desc": "3x3 - ZBLL U - ZBLL U 4 (U1)"
  },
  {
    "id": "zbll_u_zbll_u_5",
    "name": "ZBLL U 5",
    "title": "3x3 - ZBLL U - ZBLL U 5",
    "group": "ZBLL - U - U1",
    "alg": "y' R U2 R2 D' R U2 R' D R2 U' R' U2 R U2 R'",
    "algs": [
      "y' R U2 R2 D' R U2 R' D R2 U' R' U2 R U2 R'",
      "r U R' U R' D' R U R' D R U r' F R F'",
      "y2 S R2 S' D R' U2 R D' R U2 R2 U2 R",
      "y R U' r2 B2 r U r' B2 r U' F R' F' r"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL U - ZBLL U 5 (U1)"
  },
  {
    "id": "zbll_u_zbll_u_6",
    "name": "ZBLL U 6",
    "title": "3x3 - ZBLL U - ZBLL U 6",
    "group": "ZBLL - U - U1",
    "alg": "y2 R2 D R' U2 R D' R' U2 R'",
    "algs": [
      "y2 R2 D R' U2 R D' R' U2 R'",
      "L2 D L' U2 L D' L' U2 L'",
      "U2 R2 D R' U2 R D' R' U2 R' U2",
      "y' R U R' U2 R' D' R U2 R' D R2 U' R'"
    ],
    "moves": 10,
    "desc": "3x3 - ZBLL U - ZBLL U 6 (U1)"
  },
  {
    "id": "zbll_u_zbll_u_7",
    "name": "ZBLL U 7",
    "title": "3x3 - ZBLL U - ZBLL U 7",
    "group": "ZBLL - U - U1",
    "alg": "y2 R' D' r U2 r' D R U2 R U' R' U' R U' R'",
    "algs": [
      "y2 R' D' r U2 r' D R U2 R U' R' U' R U' R'",
      "R U R' U' R U R2 D' R U R' D R2 U R' U' R U' R'",
      "R U R' F' U' F2 D R' U R' U' R D' F'",
      "y' R U' R' U' R U2 R' U D R' U R U2 R' U R D'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL U - ZBLL U 7 (U1)"
  },
  {
    "id": "zbll_u_zbll_u_8",
    "name": "ZBLL U 8",
    "title": "3x3 - ZBLL U - ZBLL U 8",
    "group": "ZBLL - U - U1",
    "alg": "R' U' R U R U R' U' R' U F R U R U' R' F'",
    "algs": [
      "R' U' R U R U R' U' R' U F R U R U' R' F'",
      "U R' F' R U2 R' F R2 D2 r' U r D2 R'",
      "y R' F' R U2 R' F R2 u2 R' F R u2 R'",
      "y2 R' U R D' R U R' D R2 U' R U R U2 R"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL U - ZBLL U 8 (U1)"
  },
  {
    "id": "zbll_u_zbll_u_9",
    "name": "ZBLL U 9",
    "title": "3x3 - ZBLL U - ZBLL U 9",
    "group": "ZBLL - U - U1",
    "alg": "y' R U R' U R U' R' U F' R U2 R' U2 R' F R",
    "algs": [
      "y' R U R' U R U' R' U F' R U2 R' U2 R' F R",
      "y2 R2 F2 R2 U R U2 R' U' R U R F2 R' U2 R'",
      "R D' R' U R2 D' r' D2 r' U' r2 D' R2",
      "y R U B2 U2 B2 R2 D' R U' R2 D R2"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL U - ZBLL U 9 (U1)"
  },
  {
    "id": "zbll_u_zbll_u_10",
    "name": "ZBLL U 10",
    "title": "3x3 - ZBLL U - ZBLL U 10",
    "group": "ZBLL - U - U1",
    "alg": "y' R2 D' R U' R' D R2 U R' U R U2 R' U R U2 R' U' R",
    "algs": [
      "y' R2 D' R U' R' D R2 U R' U R U2 R' U R U2 R' U' R",
      "y R2 U F' R2 U' R2 U' R2 U2 R2 U' F U' R2",
      "y R' U R' U' D' R U' R' U2 R U' R' D R U' R",
      "y2 R U2 R' U R U R2 D' r U2 r' D R2 U' R'"
    ],
    "moves": 20,
    "desc": "3x3 - ZBLL U - ZBLL U 10 (U1)"
  },
  {
    "id": "zbll_u_zbll_u_11",
    "name": "ZBLL U 11",
    "title": "3x3 - ZBLL U - ZBLL U 11",
    "group": "ZBLL - U - U1",
    "alg": "y R U R' U R U' R' U R U' R' U' L' U R U' R' L",
    "algs": [
      "y R U R' U R U' R' U R U' R' U' L' U R U' R' L",
      "y R U R' U R U' R' U R U2 R' r U R' U' r' F R F'",
      "y R U R' U R U' R' U R U' R' U' r' F R F' M'",
      "y R' F R F' U R' D' r U' r' D U' F' U F R"
    ],
    "moves": 19,
    "desc": "3x3 - ZBLL U - ZBLL U 11 (U1)"
  },
  {
    "id": "zbll_u_zbll_u_12",
    "name": "ZBLL U 12",
    "title": "3x3 - ZBLL U - ZBLL U 12",
    "group": "ZBLL - U - U1",
    "alg": "y' R U' R' U R U R' U2 R' D' R U R' D R2 U R'",
    "algs": [
      "y' R U' R' U R U R' U2 R' D' R U R' D R2 U R'",
      "R' U2 R U F' R' D U' R U R' D' U R F",
      "R F2 U' R2 U' R U2 R' U' R U' R U F2 R'",
      "y' R U' R' U R U R' U' R U R' U' R U L U' R' U L'"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL U - ZBLL U 12 (U1)"
  },
  {
    "id": "zbll_u_zbll_u_13",
    "name": "ZBLL U 13",
    "title": "3x3 - ZBLL U - ZBLL U 13",
    "group": "ZBLL - U - U2",
    "alg": "R2 D' r U2 r' D R U2 R",
    "algs": [
      "R2 D' r U2 r' D R U2 R",
      "y F U R U' R2 F' R2 U' R' F' U' F R U R'",
      "y2 R U2 R' U L' U2 R U' R' U2 L",
      "R2 D' L F2 L' D R U2 R"
    ],
    "moves": 9,
    "desc": "3x3 - ZBLL U - ZBLL U 13 (U2)"
  },
  {
    "id": "zbll_u_zbll_u_14",
    "name": "ZBLL U 14",
    "title": "3x3 - ZBLL U - ZBLL U 14",
    "group": "ZBLL - U - U2",
    "alg": "y R2 D' R U' R' D R2 U' R' U2 R",
    "algs": [
      "y R2 D' R U' R' D R2 U' R' U2 R",
      "R' U R U2 R D r' U2 r D' R'",
      "y R' U' R2 D R' U' R D' R2 U2 R",
      "R2 F' R U R' U' R' F R2 U' R' U2 R U2 R"
    ],
    "moves": 12,
    "desc": "3x3 - ZBLL U - ZBLL U 14 (U2)"
  },
  {
    "id": "zbll_u_zbll_u_15",
    "name": "ZBLL U 15",
    "title": "3x3 - ZBLL U - ZBLL U 15",
    "group": "ZBLL - U - U2",
    "alg": "y2 R' U R U R' U2 R U R D R' U2 R D' R'",
    "algs": [
      "y2 R' U R U R' U2 R U R D R' U2 R D' R'",
      "L U L' U L U2 L2 U R U' L U R'",
      "y2 R U R' U R U2 R2 U L U' R U L'",
      "y2 R' F R U R' F' M U' F2 U F r"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL U - ZBLL U 15 (U2)"
  },
  {
    "id": "zbll_u_zbll_u_16",
    "name": "ZBLL U 16",
    "title": "3x3 - ZBLL U - ZBLL U 16",
    "group": "ZBLL - U - U2",
    "alg": "y' R' U2 R' D' R U2 R' D R U2 R U R' U R",
    "algs": [
      "y' R' U2 R' D' R U2 R' D R U2 R U R' U R",
      "R U' R' U' R U R' U R U R2 F' R U R U' R' F",
      "y2 L' U R U' L U R' L U L' U L U2 L'",
      "y' R' U2 R2 D r' U2 r D' R2 U R U2 R' U2 R"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL U - ZBLL U 16 (U2)"
  },
  {
    "id": "zbll_u_zbll_u_17",
    "name": "ZBLL U 17",
    "title": "3x3 - ZBLL U - ZBLL U 17",
    "group": "ZBLL - U - U2",
    "alg": "R2 D' R U2 R' D R U2 R",
    "algs": [
      "R2 D' R U2 R' D R U2 R",
      "y' F x R2 D2 R U R' D2 R U' R x' F'",
      "y2 L2 D' L U2 L' D L U2 L"
    ],
    "moves": 9,
    "desc": "3x3 - ZBLL U - ZBLL U 17 (U2)"
  },
  {
    "id": "zbll_u_zbll_u_18",
    "name": "ZBLL U 18",
    "title": "3x3 - ZBLL U - ZBLL U 18",
    "group": "ZBLL - U - U2",
    "alg": "y' R' U2 R2 D R' U2 R D' R2 U R U2 R' U2 R",
    "algs": [
      "y' R' U2 R2 D R' U2 R D' R2 U R U2 R' U2 R",
      "R' F' r U2 R' D R U' R' D' R2 U' r' F",
      "S R2 S' D' R U2 R' D R' U2 R2 U2 R'",
      "y F U R U2 R' U R U2 R2 F R F' R U' R' F'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL U - ZBLL U 18 (U2)"
  },
  {
    "id": "zbll_u_zbll_u_19",
    "name": "ZBLL U 19",
    "title": "3x3 - ZBLL U - ZBLL U 19",
    "group": "ZBLL - U - U2",
    "alg": "y' R' U R U R' U2 R y U2 R U' R' U2 R U' R'",
    "algs": [
      "y' R' U R U R' U2 R y U2 R U' R' U2 R U' R'",
      "R D r' U2 r D' R' U2 R' U R U R' U R",
      "y' R' U R U R' U2 R U' D' R U' R' U2 R U' R' D",
      "y' R' U R U R' U2 R D' U' R U' R' U2 R U' R' D"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL U - ZBLL U 19 (U2)"
  },
  {
    "id": "zbll_u_zbll_u_20",
    "name": "ZBLL U 20",
    "title": "3x3 - ZBLL U - ZBLL U 20",
    "group": "ZBLL - U - U2",
    "alg": "y2 F R U R' U' R2 D R' U' R D' R2 U' R U R' F'",
    "algs": [
      "y2 F R U R' U' R2 D R' U' R D' R2 U' R U R' F'",
      "y R B R' U2 R B' R2 D2 r U' r' D2 R",
      "y2 F R U R2 D' R U' R' D R2 U' R' U' R U R' F'",
      "R U' R2 U' R2 F' R U R' U' R' F U2 R'"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL U - ZBLL U 20 (U2)"
  },
  {
    "id": "zbll_u_zbll_u_21",
    "name": "ZBLL U 21",
    "title": "3x3 - ZBLL U - ZBLL U 21",
    "group": "ZBLL - U - U2",
    "alg": "R2 D' R U2 R' U' D R' U' R2 U R U R2",
    "algs": [
      "R2 D' R U2 R' U' D R' U' R2 U R U R2",
      "y' R2 D R' U R D' R2 U' R U' R' U2 R U' R' U2 R U R'",
      "R' U2 F U F' R F U2 R' U' R U F'",
      "R' U2 R U' R' U' R2 D r' U2 r D' R2 U R"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL U - ZBLL U 21 (U2)"
  },
  {
    "id": "zbll_u_zbll_u_22",
    "name": "ZBLL U 22",
    "title": "3x3 - ZBLL U - ZBLL U 22",
    "group": "ZBLL - U - U2",
    "alg": "y' R2 F' R U2 R U2 R' F U' R U R' U' R",
    "algs": [
      "y' R2 F' R U2 R U2 R' F U' R U R' U' R",
      "y R U L' U R' U' L U' R U R' U R U' R'",
      "R2 D' R U2 R' D R U' R' U' R' U' R' U R U R2",
      "r' B r U' r2 U R B2 R U R2 U r2"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL U - ZBLL U 22 (U2)"
  },
  {
    "id": "zbll_u_zbll_u_23",
    "name": "ZBLL U 23",
    "title": "3x3 - ZBLL U - ZBLL U 23",
    "group": "ZBLL - U - U2",
    "alg": "y' R' U R U' R' U' R U2 R D R' U' R D' R2 U' R",
    "algs": [
      "y' R' U R U' R' U' R U2 R D R' U' R D' R2 U' R",
      "y R' U' R U' R' U R F U' R' U' R U F' R' U2 R",
      "R D R' U2 R D' R' U R' U R U' R' U' R U R' U' R",
      "y2 f U2 r F' R U R' U' R' F M U2 f'"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL U - ZBLL U 23 (U2)"
  },
  {
    "id": "zbll_u_zbll_u_24",
    "name": "ZBLL U 24",
    "title": "3x3 - ZBLL U - ZBLL U 24",
    "group": "ZBLL - U - U2",
    "alg": "F U R U' R D R' U' R D' R2 U R U R' F'",
    "algs": [
      "F U R U' R D R' U' R D' R2 U R U R' F'",
      "y' R U R' U2 F2 R U2 R' U2 R' F2 R2 U R'",
      "y R2 U' R2 U' R U2 D' R U' R' U' D R U R2",
      "y R' U' R U' R' U R U' R' U R U L U' R' U R L'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL U - ZBLL U 24 (U2)"
  },
  {
    "id": "zbll_u_zbll_u_25",
    "name": "ZBLL U 25",
    "title": "3x3 - ZBLL U - ZBLL U 25",
    "group": "ZBLL - U - U3",
    "alg": "R' F R U' R' U' R U R' F' R U R' U' R' F R F' R",
    "algs": [
      "R' F R U' R' U' R U R' F' R U R' U' R' F R F' R",
      "R U' R2 U' R2 U R2 D' R2 U R2 U' R2 D R'",
      "R U' R2 U' R2 U R' F' R U R2 U' R' F R2",
      "R U' R' U F' r U' r' F2 R' F R F'"
    ],
    "moves": 19,
    "desc": "3x3 - ZBLL U - ZBLL U 25 (U3)"
  },
  {
    "id": "zbll_u_zbll_u_26",
    "name": "ZBLL U 26",
    "title": "3x3 - ZBLL U - ZBLL U 26",
    "group": "ZBLL - U - U3",
    "alg": "r2 F2 r U2 r U' L' U R' U R U' L",
    "algs": [
      "r2 F2 r U2 r U' L' U R' U R U' L",
      "y2 R' U' R U' R' U2 R U' R2 D r' U2 r D' R' U2 R'",
      "R2 D' R U2 R' D R U2 R' F R U R U' R' F' R U2 R' U2 R",
      "R' L' U2 L U2 R U' L' U R' U R U' L"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL U - ZBLL U 26 (U3)"
  },
  {
    "id": "zbll_u_zbll_u_27",
    "name": "ZBLL U 27",
    "title": "3x3 - ZBLL U - ZBLL U 27",
    "group": "ZBLL - U - U3",
    "alg": "y' F2 R U' R' U' R U R' F' R U R' U' R' F R F2",
    "algs": [
      "y' F2 R U' R' U' R U R' F' R U R' U' R' F R F2",
      "y R U R' U R U2 R2 F' R U R' U' R' F R2 U' R' U2 R",
      "y2 R' U R U' x' U L' U L U2 R U' R' U x",
      "y' F2 R U r U2 R2 F R F' R U2 r' R' F2"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL U - ZBLL U 27 (U3)"
  },
  {
    "id": "zbll_u_zbll_u_28",
    "name": "ZBLL U 28",
    "title": "3x3 - ZBLL U - ZBLL U 28",
    "group": "ZBLL - U - U3",
    "alg": "R2 B2 R' B2 R' U R U' L U' L' U R'",
    "algs": [
      "R2 B2 R' B2 R' U R U' L U' L' U R'",
      "Lw2 F2 Lw' U2 Lw' U R U' L U' L' U R'",
      "R2 D' R U2 R' D R U2 R2 U R' F' R U R' U' R' F R2 U' R'",
      "R U R' U R U2 R' U R2 D' r U2 r' D R U2 R"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL U - ZBLL U 28 (U3)"
  },
  {
    "id": "zbll_u_zbll_u_29",
    "name": "ZBLL U 29",
    "title": "3x3 - ZBLL U - ZBLL U 29",
    "group": "ZBLL - U - U3",
    "alg": "y' F U R2 D' R U' R' D R2 F' R' U R",
    "algs": [
      "y' F U R2 D' R U' R' D R2 F' R' U R",
      "y' R U R' B' R2 D R' U' R D' R2 U B",
      "R U R D R' U' R D' R2 U' R2 D' R U' R' D R U R",
      "R U R' U R U2 R' U2 R' U' R2 D R' U' R D' R2 U2 R"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL U - ZBLL U 29 (U3)"
  },
  {
    "id": "zbll_u_zbll_u_30",
    "name": "ZBLL U 30",
    "title": "3x3 - ZBLL U - ZBLL U 30",
    "group": "ZBLL - U - U3",
    "alg": "y' R' U' R F R2 D' R U R' D R2 U' F'",
    "algs": [
      "y' R' U' R F R2 D' R U R' D R2 U' F'",
      "y' B' U' R2 D R' U R D' R2 B R U' R'",
      "y l' U' L U l F' L' F R U R' U' R' F R U R U' R' F'",
      "y' R' U' R F R' U R U' R' F' r U R U' r'"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL U - ZBLL U 30 (U3)"
  },
  {
    "id": "zbll_u_zbll_u_31",
    "name": "ZBLL U 31",
    "title": "3x3 - ZBLL U - ZBLL U 31",
    "group": "ZBLL - U - U3",
    "alg": "y R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R' U2 R",
    "algs": [
      "y R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R' U2 R",
      "F U R U' R' S U f' R' f R U' R' f' R",
      "R' U2 F' R U R' U' R' F R2 F U' R' U' R U F'",
      "L U R' U L' U2 R U' R' L U L' U2 R"
    ],
    "moves": 22,
    "desc": "3x3 - ZBLL U - ZBLL U 31 (U3)"
  },
  {
    "id": "zbll_u_zbll_u_32",
    "name": "ZBLL U 32",
    "title": "3x3 - ZBLL U - ZBLL U 32",
    "group": "ZBLL - U - U3",
    "alg": "y' R2 F' R U R' U' R' F R2 U' R' U2 R2 U R' U R",
    "algs": [
      "y' R2 F' R U R' U' R' F R2 U' R' U2 R2 U R' U R",
      "y R' B2 R2 U R' U R U' R2 B2 R U2 R U R'",
      "R U' R' U R U' L U L' U x' U2 R U2 R2 x",
      "R2 D' R U2 R' D R U2 R2 U R' U' R' F R2 U' R' U' R U R' F'"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL U - ZBLL U 32 (U3)"
  },
  {
    "id": "zbll_u_zbll_u_33",
    "name": "ZBLL U 33",
    "title": "3x3 - ZBLL U - ZBLL U 33",
    "group": "ZBLL - U - U3",
    "alg": "y F U R U2 R' U R U R2 F' r U R U' r'",
    "algs": [
      "y F U R U2 R' U R U R2 F' r U R U' r'",
      "y R' U' R U' R' U2 R U' R' U2 R' D' R U2 R' D R2",
      "y' R' U2 R2 L U2 L' U' L U2 R2 U L' R",
      "y' R' U2 R' U' F' U F R2 U' R' F R' F' R2"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL U - ZBLL U 33 (U3)"
  },
  {
    "id": "zbll_u_zbll_u_34",
    "name": "ZBLL U 34",
    "title": "3x3 - ZBLL U - ZBLL U 34",
    "group": "ZBLL - U - U3",
    "alg": "y R U R' U R U2 R' U R U2 R D R' U2 R D' R2",
    "algs": [
      "y R U R' U R U2 R' U R U2 R D R' U2 R D' R2",
      "y' R U2 R' U2 R' F R U R U2 R' U' R U2 R' U' F'",
      "y2 F R2 U R' D R2 D' R U' R2 F' R U' R'",
      "y R2 D' R U' R' D R2 U R' F R U R' U' R' F' R2"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL U - ZBLL U 34 (U3)"
  },
  {
    "id": "zbll_u_zbll_u_35",
    "name": "ZBLL U 35",
    "title": "3x3 - ZBLL U - ZBLL U 35",
    "group": "ZBLL - U - U3",
    "alg": "y' r U R' U' r' F R2 U' R' U' R U2 R' U' F'",
    "algs": [
      "y' r U R' U' r' F R2 U' R' U' R U2 R' U' F'",
      "L U L' F U' R U2 L U2 L' U2 R' U F'",
      "y' R2 F R F' R U R2 F' U' F U R U2 R",
      "y' R2 D' R U2 R' D R U2 R U R' U2 R U R' U R"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL U - ZBLL U 35 (U3)"
  },
  {
    "id": "zbll_u_zbll_u_36",
    "name": "ZBLL U 36",
    "title": "3x3 - ZBLL U - ZBLL U 36",
    "group": "ZBLL - U - U3",
    "alg": "R2 F R U R U' R' F' R U' R2 D' R U R' D R2",
    "algs": [
      "R2 F R U R U' R' F' R U' R2 D' R U R' D R2",
      "y F U R U2 R' U R U2 R' U' R' F' R U2 R U2 R'",
      "y' R2 D R' U2 R D' R' U2 R' U' R U2 R' U' R U' R'",
      "U' S' U F R' F' R2 U' R' U2 R B U2 B' R' S"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL U - ZBLL U 36 (U3)"
  },
  {
    "id": "zbll_u_zbll_u_37",
    "name": "ZBLL U 37",
    "title": "3x3 - ZBLL U - ZBLL U 37",
    "group": "ZBLL - U - U4",
    "alg": "y2 R U R' U R U R' U2 R U' R2 D' R U' R' D R",
    "algs": [
      "y2 R U R' U R U R' U2 R U' R2 D' R U' R' D R",
      "y2 R U R' U' L' U2 R U R' U2 L R U' R'",
      "L U L' F' U L U L' U' F U' L U' L'",
      "y2 F U R U' R' S' R U' R' S U R U2 R' U' F'"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL U - ZBLL U 37 (U4)"
  },
  {
    "id": "zbll_u_zbll_u_38",
    "name": "ZBLL U 38",
    "title": "3x3 - ZBLL U - ZBLL U 38",
    "group": "ZBLL - U - U4",
    "alg": "R U R' U R U' R' U2 R' D' R U2 R' D R2 U' R'",
    "algs": [
      "R U R' U R U' R' U2 R' D' R U2 R' D R2 U' R'",
      "y' R U2 R' U' R U' R D' R U2 R' D R U2 R",
      "y f R' f' R' f' R U R' S U' R' F R2",
      "R U R' U R U2 R' U' R2 D R' U2 R D' R' U2 R'"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL U - ZBLL U 38 (U4)"
  },
  {
    "id": "zbll_u_zbll_u_39",
    "name": "ZBLL U 39",
    "title": "3x3 - ZBLL U - ZBLL U 39",
    "group": "ZBLL - U - U4",
    "alg": "R' U' R U2 R' F' R U R' U' R' F R2 U2 R' U R",
    "algs": [
      "R' U' R U2 R' F' R U R' U' R' F R2 U2 R' U R",
      "R' U' R F U' R' U' R U F' U R' U R",
      "R' U' R U' R' U' R U2 R' U R2 D R' U R D' R'",
      "R' U' R U L U2 R' U' L' U' L R U2 L'"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL U - ZBLL U 39 (U4)"
  },
  {
    "id": "zbll_u_zbll_u_40",
    "name": "ZBLL U 40",
    "title": "3x3 - ZBLL U - ZBLL U 40",
    "group": "ZBLL - U - U4",
    "alg": "y R2 D' R U2 R' D R U2 R U R' U' R U' R' U2 R",
    "algs": [
      "y R2 D' R U2 R' D R U2 R U R' U' R U' R' U2 R",
      "y' R' U2 R U R' U R' D R' U2 R D' R' U2 R'",
      "y2 R' U' R U' R' U2 R U R2 D' R U2 R' D R U2 R",
      "y2 R' U' R U' R' U R U2 R D R' U2 R D' R2 U R"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL U - ZBLL U 40 (U4)"
  },
  {
    "id": "zbll_u_zbll_u_41",
    "name": "ZBLL U 41",
    "title": "3x3 - ZBLL U - ZBLL U 41",
    "group": "ZBLL - U - U4",
    "alg": "x' R2 D2 R' U2 R D2 R' U2 R' x",
    "algs": [
      "x' R2 D2 R' U2 R D2 R' U2 R' x",
      "y2 R U' D' R' D' R U2 R' D R U' D R'",
      "y2 x L2 D2 L' U2 L D2 L' U2 L'",
      "R U R' U' R U R' U' R U R' U' R' F R F' R' F R F' R' F R F'"
    ],
    "moves": 11,
    "desc": "3x3 - ZBLL U - ZBLL U 41 (U4)"
  },
  {
    "id": "zbll_u_zbll_u_42",
    "name": "ZBLL U 42",
    "title": "3x3 - ZBLL U - ZBLL U 42",
    "group": "ZBLL - U - U4",
    "alg": "y2 x R2 D2 R U2 R' D2 R U2 R x'",
    "algs": [
      "y2 x R2 D2 R U2 R' D2 R U2 R x'",
      "y2 R' F2 R U2 R U2 R' F2 R U2 R'",
      "R' U D R D R' U2 R D' R' U D' R",
      "U R U R2 U' R' F R U R2 U' R' F'"
    ],
    "moves": 12,
    "desc": "3x3 - ZBLL U - ZBLL U 42 (U4)"
  },
  {
    "id": "zbll_u_zbll_u_43",
    "name": "ZBLL U 43",
    "title": "3x3 - ZBLL U - ZBLL U 43",
    "group": "ZBLL - U - U4",
    "alg": "F R U' R' U R U R' U R U' R' F'",
    "algs": [
      "F R U' R' U R U R' U R U' R' F'",
      "R U R' U' R' F2 R2 U' R' U' R U R' F2",
      "R' U' R f R' U R U' R U R' U' f'",
      "F R U' R' U R U R' U R U' R' F' U2"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL U - ZBLL U 43 (U4)"
  },
  {
    "id": "zbll_u_zbll_u_44",
    "name": "ZBLL U 44",
    "title": "3x3 - ZBLL U - ZBLL U 44",
    "group": "ZBLL - U - U4",
    "alg": "y2 R U' R2 F R U R U' R2 F' R U' F' U F",
    "algs": [
      "y2 R U' R2 F R U R U' R2 F' R U' F' U F",
      "y F' R U R' U' R' F R2 U R' U2 R U R' U2 R U' R'",
      "y R U2 F R U R U' R U R2 U' F' U2 R'",
      "y' R U' R' U R' D' R U' R' D F R f' R U R' S"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL U - ZBLL U 44 (U4)"
  },
  {
    "id": "zbll_u_zbll_u_45",
    "name": "ZBLL U 45",
    "title": "3x3 - ZBLL U - ZBLL U 45",
    "group": "ZBLL - U - U4",
    "alg": "R U R' U R' D' R U2 R' D R2 U' R' U2 R U2 R'",
    "algs": [
      "R U R' U R' D' R U2 R' D R2 U' R' U2 R U2 R'",
      "y' R' U2 R U R' U R' D r' U2 r D' R' U2 R'",
      "y' R' U R U R' U R U' R D R' U' R D' R2 U' R",
      "y R' U' R U' R' U2 R F l' U' L U R U' r'"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL U - ZBLL U 45 (U4)"
  },
  {
    "id": "zbll_u_zbll_u_46",
    "name": "ZBLL U 46",
    "title": "3x3 - ZBLL U - ZBLL U 46",
    "group": "ZBLL - U - U4",
    "alg": "y' R U' R' U' R U' R' U R' D' R U R' D R2 U R'",
    "algs": [
      "y' R U' R' U' R U' R' U R' D' R U R' D R2 U R'",
      "y F' r U R' U' r' F R2 U R' U R U2 R'",
      "y R U R' U R U2 R' U' R2 D' R U' R' D R U R",
      "y' R U2 R' U' R U' R D' r U2 r' D R U2 R"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL U - ZBLL U 46 (U4)"
  },
  {
    "id": "zbll_u_zbll_u_47",
    "name": "ZBLL U 47",
    "title": "3x3 - ZBLL U - ZBLL U 47",
    "group": "ZBLL - U - U4",
    "alg": "R' U2 R U R' U R' D' R U' R' D R U R",
    "algs": [
      "R' U2 R U R' U R' D' R U' R' D R U R",
      "R' U2 R U R D R' U' R D' R' U R' U R",
      "R' U2 R U R' U R U' F' r U R' U' r' F R",
      "y2 R U2 r' F R' F' r U2 r' F R F' M'"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL U - ZBLL U 47 (U4)"
  },
  {
    "id": "zbll_u_zbll_u_48",
    "name": "ZBLL U 48",
    "title": "3x3 - ZBLL U - ZBLL U 48",
    "group": "ZBLL - U - U4",
    "alg": "y2 R U2 R' U' R U' R D R' U R D' R' U' R'",
    "algs": [
      "y2 R U2 R' U' R U' R D R' U R D' R' U' R'",
      "R F U' R' U' R U2 R' U' R F' R'",
      "L U2 L' U' L U' L' R U R' U' R' F R U R U' R' F'",
      "y2 R U2 R' U' R U' R' U' F R' F' r U R U' r'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL U - ZBLL U 48 (U4)"
  },
  {
    "id": "zbll_u_zbll_u_49",
    "name": "ZBLL U 49",
    "title": "3x3 - ZBLL U - ZBLL U 49",
    "group": "ZBLL - U - U5",
    "alg": "R U' R' U' R U R D R' U R D' R2",
    "algs": [
      "R U' R' U' R U R D R' U R D' R2",
      "R U' R' U' R U2 R2 D' R U R' D R",
      "R' D R2 U' R' U' R U2 R2 D' R",
      "y' B' U R U' R' U' B R U2 R'"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL U - ZBLL U 49 (U5)"
  },
  {
    "id": "zbll_u_zbll_u_50",
    "name": "ZBLL U 50",
    "title": "3x3 - ZBLL U - ZBLL U 50",
    "group": "ZBLL - U - U5",
    "alg": "y' F R U R' U' R U R' U' F' U' R' F' U' F U R",
    "algs": [
      "y' F R U R' U' R U R' U' F' U' R' F' U' F U R",
      "y' R U2 R2 D' R U' R' D R U' R' F R U R U' R' F'",
      "y S' R' U R S R' U2 R' F R F' U R",
      "y2 M U' M' F U R U' R' F' M U M'"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL U - ZBLL U 50 (U5)"
  },
  {
    "id": "zbll_u_zbll_u_51",
    "name": "ZBLL U 51",
    "title": "3x3 - ZBLL U - ZBLL U 51",
    "group": "ZBLL - U - U5",
    "alg": "R U R' L' U2 R U' R' U' R U' R' L",
    "algs": [
      "R U R' L' U2 R U' R' U' R U' R' L",
      "R U R' U R' F R F' U' S' R U' R' S",
      "R U R' U L' U R U' R' L U' R U' R'",
      "S' R' U' R S R' U F' U' F U R"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL U - ZBLL U 51 (U5)"
  },
  {
    "id": "zbll_u_zbll_u_52",
    "name": "ZBLL U 52",
    "title": "3x3 - ZBLL U - ZBLL U 52",
    "group": "ZBLL - U - U5",
    "alg": "R2 D' R U R' D R U R U' R' U' R",
    "algs": [
      "R2 D' R U R' D R U R U' R' U' R",
      "R' U2 R F U' R' U' R U F'",
      "R' U2 R U2 R' F' R U R' U' R' F R2",
      "R' U2 R U2 R' F' R U R' U' R' F R2 U'"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL U - ZBLL U 52 (U5)"
  },
  {
    "id": "zbll_u_zbll_u_53",
    "name": "ZBLL U 53",
    "title": "3x3 - ZBLL U - ZBLL U 53",
    "group": "ZBLL - U - U5",
    "alg": "F U R U2 R' U R U R' U R U2 R' U R U R' F'",
    "algs": [
      "F U R U2 R' U R U R' U R U2 R' U R U R' F'",
      "F R U' R' U' R U2 R' U' R U' R' U' R U2 R' U' F'",
      "y2 f U2 R2 U2 R2 U' S R2 S' U' R2 f'",
      "y2 F U2 R2 U2 R2 U' S R2 S' U' R2 F'"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL U - ZBLL U 53 (U5)"
  },
  {
    "id": "zbll_u_zbll_u_54",
    "name": "ZBLL U 54",
    "title": "3x3 - ZBLL U - ZBLL U 54",
    "group": "ZBLL - U - U5",
    "alg": "y' r U R' U' M U R U' R' F R U R' U' F'",
    "algs": [
      "y' r U R' U' M U R U' R' F R U R' U' F'",
      "R' F' M U' M' F M U r",
      "R' F' U' F U F R S R' F' R S'",
      "S' R U R' S R U' R2 F' U' F U R"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL U - ZBLL U 54 (U5)"
  },
  {
    "id": "zbll_u_zbll_u_55",
    "name": "ZBLL U 55",
    "title": "3x3 - ZBLL U - ZBLL U 55",
    "group": "ZBLL - U - U5",
    "alg": "y' r U2 R2 F R F' U2 r' R U R U' R'",
    "algs": [
      "y' r U2 R2 F R F' U2 r' R U R U' R'",
      "y R U R' U' M' U R2 B' R' B U' r'",
      "y' R U2 R2 F R F' M' U' R U' R' U M",
      "y' F R U R' U' f' R U R' S R U' R'"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL U - ZBLL U 55 (U5)"
  },
  {
    "id": "zbll_u_zbll_u_56",
    "name": "ZBLL U 56",
    "title": "3x3 - ZBLL U - ZBLL U 56",
    "group": "ZBLL - U - U5",
    "alg": "y R' D R2 U' R' U R U2 R' U' R U R2 D' R",
    "algs": [
      "y R' D R2 U' R' U R U2 R' U' R U R2 D' R",
      "y R' U' R U' R' L U' R U R' L' U2 R",
      "y' R' U' F R' F' R2 S' R' U R S",
      "y l' U2 L2 F' L' F U2 l L' U' L' U L"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL U - ZBLL U 56 (U5)"
  },
  {
    "id": "zbll_u_zbll_u_57",
    "name": "ZBLL U 57",
    "title": "3x3 - ZBLL U - ZBLL U 57",
    "group": "ZBLL - U - U5",
    "alg": "y' R' D' R U' R' D R2 U2 R' U R U R'",
    "algs": [
      "y' R' D' R U' R' D R2 U2 R' U R U R'",
      "y2 R2 D R' U' R D' R' U' R' U R U R'",
      "y2 R' D R2 U2 R' U R U R2 D' R",
      "L U2 L' F' U L U L' U' F"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL U - ZBLL U 57 (U5)"
  },
  {
    "id": "zbll_u_zbll_u_58",
    "name": "ZBLL U 58",
    "title": "3x3 - ZBLL U - ZBLL U 58",
    "group": "ZBLL - U - U5",
    "alg": "M' U R' U' F' U F R2 U R' U R U2 r'",
    "algs": [
      "M' U R' U' F' U F R2 U R' U R U2 r'",
      "F U R U2 R2 U2 R U R' U R U2 R U R' F'",
      "M U' M' F R U R' U' F' M U M'",
      "y F' U' L' U L F2 U R U' R' U R U' R' F'"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL U - ZBLL U 58 (U5)"
  },
  {
    "id": "zbll_u_zbll_u_59",
    "name": "ZBLL U 59",
    "title": "3x3 - ZBLL U - ZBLL U 59",
    "group": "ZBLL - U - U5",
    "alg": "y2 R' U R U R' U' R' D' R U' R' D R2",
    "algs": [
      "y2 R' U R U R' U' R' D' R U' R' D R2",
      "y' F U' R' U R U F' R' U2 R",
      "y2 R' U R U R' U2 R2 D R' U' R D' R'",
      "L' U L U L' U2 L2 D L' U' L D' L'"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL U - ZBLL U 59 (U5)"
  },
  {
    "id": "zbll_u_zbll_u_60",
    "name": "ZBLL U 60",
    "title": "3x3 - ZBLL U - ZBLL U 60",
    "group": "ZBLL - U - U5",
    "alg": "y2 L' R U R' U R U R' U2 R L U' R'",
    "algs": [
      "y2 L' R U R' U R U R' U2 R L U' R'",
      "y2 R' U' F' U F U' R S' R' U R S",
      "y2 R' U' R U' F U' R' U R U R' U R U' F'",
      "L' U' L R U2 L' U L U L' U L R'"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL U - ZBLL U 60 (U5)"
  },
  {
    "id": "zbll_u_zbll_u_61",
    "name": "ZBLL U 61",
    "title": "3x3 - ZBLL U - ZBLL U 61",
    "group": "ZBLL - U - U6",
    "alg": "y' R' U' R U R' U R U2 R' U R U2 R' U' R",
    "algs": [
      "y' R' U' R U R' U R U2 R' U R U2 R' U' R",
      "y2 R U R' U R U2 R' U R U2 R' U' R U' R'",
      "L U L' U L U2 L' U L U2 L' U' L U' L'",
      "U2 R U R' U R U2 R' U R U2 R' U' R U' R'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL U - ZBLL U 61 (U6)"
  },
  {
    "id": "zbll_u_zbll_u_62",
    "name": "ZBLL U 62",
    "title": "3x3 - ZBLL U - ZBLL U 62",
    "group": "ZBLL - U - U6",
    "alg": "y' R U R' U' R U' R' U2 R U' R' U2 R U R'",
    "algs": [
      "y' R U R' U' R U' R' U2 R U' R' U2 R U R'",
      "R' U' R U' R' U2 R U' R' U2 R U R' U R",
      "R' U' R U' R' U2 R U' R' U2 R U R' U R U",
      "y2 L' U' L U' L' U2 L U' L' U2 L U L' U L"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL U - ZBLL U 62 (U6)"
  },
  {
    "id": "zbll_u_zbll_u_63",
    "name": "ZBLL U 63",
    "title": "3x3 - ZBLL U - ZBLL U 63",
    "group": "ZBLL - U - U6",
    "alg": "y R U2 R' U' R U' R' U' R U R' U R U2 R'",
    "algs": [
      "y R U2 R' U' R U' R' U' R U R' U R U2 R'",
      "y R U2 R' U' R U' R' U' R U R' U R U2 R' U",
      "y' L U2 L' U' L U' L' y R U R' U R U2 R'",
      "y' L U2 L' U' L U' L' U R U R' U R U2 R'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL U - ZBLL U 63 (U6)"
  },
  {
    "id": "zbll_u_zbll_u_64",
    "name": "ZBLL U 64",
    "title": "3x3 - ZBLL U - ZBLL U 64",
    "group": "ZBLL - U - U6",
    "alg": "y R' U2 R2 U R2 U R U' R U R' U' R U' R'",
    "algs": [
      "y R' U2 R2 U R2 U R U' R U R' U' R U' R'",
      "y' r' F2 r2 U' r' F r' F U' F U r",
      "U R' U2 R2 U R2 U R U' R U R' U' R U' R'",
      "y2 R' U' R U R U' R' U' R U' R' U R' U R2 U R'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL U - ZBLL U 64 (U6)"
  },
  {
    "id": "zbll_u_zbll_u_65",
    "name": "ZBLL U 65",
    "title": "3x3 - ZBLL U - ZBLL U 65",
    "group": "ZBLL - U - U6",
    "alg": "y R' U2 R U R' U R U R' U' R U' R' U2 R",
    "algs": [
      "y R' U2 R U R' U R U R' U' R U' R' U2 R",
      "y' L' U2 L U L' U L U' R' U' R U' R' U2 R",
      "y R' U2 R U R' U R U R' U' R U' R' U2 R U'",
      "y' z U' R2 U R U' R U R U' R' U R' U' R2 U"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL U - ZBLL U 65 (U6)"
  },
  {
    "id": "zbll_u_zbll_u_66",
    "name": "ZBLL U 66",
    "title": "3x3 - ZBLL U - ZBLL U 66",
    "group": "ZBLL - U - U6",
    "alg": "y R U2 R2 U' R2 U' R' U R' U' R U R' U R",
    "algs": [
      "y R U2 R2 U' R2 U' R' U R' U' R U R' U R",
      "U' L U2 L2 U' L2 U' L' U L' U' L U L' U L",
      "y R U2 R2 F R F' R U' B U' B' R'",
      "y R' U R U' R' U R U' R' U R' U' R2 U' R2 U2 R2"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL U - ZBLL U 66 (U6)"
  },
  {
    "id": "zbll_u_zbll_u_67",
    "name": "ZBLL U 67",
    "title": "3x3 - ZBLL U - ZBLL U 67",
    "group": "ZBLL - U - U6",
    "alg": "y2 R U R' U R' U2 R2 U R2 U R2 U' R'",
    "algs": [
      "y2 R U R' U R' U2 R2 U R2 U R2 U' R'",
      "y2 R U R' U R' U' R U' R' U2 R U2 R U2 R'",
      "y2 L R U R' U R U2 R' L' U2 L U2 L' U' L U L'",
      "y2 R U R' U R' U' R U R U2 R' U2 R' U2 R"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL U - ZBLL U 67 (U6)"
  },
  {
    "id": "zbll_u_zbll_u_68",
    "name": "ZBLL U 68",
    "title": "3x3 - ZBLL U - ZBLL U 68",
    "group": "ZBLL - U - U6",
    "alg": "R' U' R U' R U2 R2 U' R2 U' R2 U R",
    "algs": [
      "R' U' R U' R U2 R2 U' R2 U' R2 U R",
      "R' U' R U' R U R' U' R' U2 R U2 R U2 R'",
      "R' U' R U' R U R' U R U2 R' U2 R' U2 R",
      "y2 L' U' L U' L U L' U L U2 L' U2 L' U2 L"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL U - ZBLL U 68 (U6)"
  },
  {
    "id": "zbll_u_zbll_u_69",
    "name": "ZBLL U 69",
    "title": "3x3 - ZBLL U - ZBLL U 69",
    "group": "ZBLL - U - U6",
    "alg": "R' U' R U' R' U2 R2 U R' U R U2 R'",
    "algs": [
      "R' U' R U' R' U2 R2 U R' U R U2 R'",
      "y2 L' U' L U' L' U2 L U2 R U R' U R U2 R'",
      "y2 L' U' L U' L' U2 L2 U L' U L U2 L'"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL U - ZBLL U 69 (U6)"
  },
  {
    "id": "zbll_u_zbll_u_70",
    "name": "ZBLL U 70",
    "title": "3x3 - ZBLL U - ZBLL U 70",
    "group": "ZBLL - U - U6",
    "alg": "y2 R U R' U R U2 R2 U' R U' R' U2 R",
    "algs": [
      "y2 R U R' U R U2 R2 U' R U' R' U2 R",
      "L U L' U L U2 L2 U' L U' L' U2 L",
      "R U R' U' R U' R' U2 R U' R' U2 R U' R' U' R U' R'"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL U - ZBLL U 70 (U6)"
  },
  {
    "id": "zbll_u_zbll_u_71",
    "name": "ZBLL U 71",
    "title": "3x3 - ZBLL U - ZBLL U 71",
    "group": "ZBLL - U - U6",
    "alg": "R U R' U' R U' R U2 R2 U' R U R' U' R2 U' R2",
    "algs": [
      "R U R' U' R U' R U2 R2 U' R U R' U' R2 U' R2",
      "x' R2 D2 R' U' R D2 R2 D R U R' D' x",
      "y2 R' U2 R U R' U R U2 R U2 R2 U' R2 U' R2 U2 R",
      "y2 R' U' R U R U' R' U' R' U R U' R U' R' U2 R U R'"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL U - ZBLL U 71 (U6)"
  },
  {
    "id": "zbll_u_zbll_u_72",
    "name": "ZBLL U 72",
    "title": "3x3 - ZBLL U - ZBLL U 72",
    "group": "ZBLL - U - U6",
    "alg": "y R U2 R' U' R U' R' L' U2 L U L' U L",
    "algs": [
      "y R U2 R' U' R U' R' L' U2 L U L' U L",
      "y R U2 R' U' R U' R' U2 R' U2 R U R' U R",
      "y R' F' R U R' U' R' F D' R U R' D R2",
      "F R' F' r U R U' R' U R U' r' F R' F' R"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL U - ZBLL U 72 (U6)"
  },
  {
    "id": "zbll_l_zbll_l_1",
    "name": "ZBLL L 1",
    "title": "3x3 - ZBLL L - ZBLL L 1",
    "group": "ZBLL - L - L1",
    "alg": "y' R' U' R U' R' U2 R' D' R U2 R' D R U2 R",
    "algs": [
      "y' R' U' R U' R' U2 R' D' R U2 R' D R U2 R",
      "S R' U' R U f R2 f' U' R' U' R S'",
      "y F' R U R' U' R' F R2 U' R' U' R U' R' U R U R'",
      "y r' F' r U' r' F2 r' U' r F2 r' U r F2 r"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL L - ZBLL L 1 (L1)"
  },
  {
    "id": "zbll_l_zbll_l_2",
    "name": "ZBLL L 2",
    "title": "3x3 - ZBLL L - ZBLL L 2",
    "group": "ZBLL - L - L1",
    "alg": "R' U' R U' R' U2 R U' R U' r' F R' F' r",
    "algs": [
      "R' U' R U' R' U2 R U' R U' r' F R' F' r",
      "y R D R' U2 R D' R' U' R' U2 R U' R' U' R",
      "y' L U' R' U L' U' R2 U2 R' U' R U' R'",
      "y2 L' U' L U' L' U2 L U R U' L' U R' U' L"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL L - ZBLL L 2 (L1)"
  },
  {
    "id": "zbll_l_zbll_l_3",
    "name": "ZBLL L 3",
    "title": "3x3 - ZBLL L - ZBLL L 3",
    "group": "ZBLL - L - L1",
    "alg": "y' R' U2 R U R2 D' R U R' D R2",
    "algs": [
      "y' R' U2 R U R2 D' R U R' D R2",
      "y' R' U2 R2 D R' U R D' R2 U R",
      "y R D r' U2 r D' R' U2 R' U' R",
      "R U2 R' U' R U' R' U' R2 D' R U2 R' D R U2 R"
    ],
    "moves": 12,
    "desc": "3x3 - ZBLL L - ZBLL L 3 (L1)"
  },
  {
    "id": "zbll_l_zbll_l_4",
    "name": "ZBLL L 4",
    "title": "3x3 - ZBLL L - ZBLL L 4",
    "group": "ZBLL - L - L1",
    "alg": "R' U2 R' D' r U2 r' D R2",
    "algs": [
      "R' U2 R' D' r U2 r' D R2",
      "y2 R U' R' F' U F R U R2 F R2 U R' U' F'",
      "R U R' U2 L U' R U L' U R'",
      "y2 R U R' U' z' y' R U R' F' R U R' U' R' F R2 U' R' U' F"
    ],
    "moves": 9,
    "desc": "3x3 - ZBLL L - ZBLL L 4 (L1)"
  },
  {
    "id": "zbll_l_zbll_l_5",
    "name": "ZBLL L 5",
    "title": "3x3 - ZBLL L - ZBLL L 5",
    "group": "ZBLL - L - L1",
    "alg": "R' U2 R U2 R' U' R2 D R' U2 R D' R2 U2 R",
    "algs": [
      "R' U2 R U2 R' U' R2 D R' U2 R D' R2 U2 R",
      "y2 F' r U R2 D R U R' D' R U2 r' F R",
      "R U2 R2 U2 R D' R U2 R' D S R2 S'",
      "y' R' D' L U' D R' D R U R' D2 L' D R2"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL L - ZBLL L 5 (L1)"
  },
  {
    "id": "zbll_l_zbll_l_6",
    "name": "ZBLL L 6",
    "title": "3x3 - ZBLL L - ZBLL L 6",
    "group": "ZBLL - L - L1",
    "alg": "R' U2 R' D' R U2 R' D R2",
    "algs": [
      "R' U2 R' D' R U2 R' D R2",
      "y2 z U' R2 U' L' U R2 U' L U2",
      "R' F R2 U' R' U' R U R' F' R U' R' U R U R'",
      "y2 x R' U' R D' R' U2 R D R' U' R x'"
    ],
    "moves": 9,
    "desc": "3x3 - ZBLL L - ZBLL L 6 (L1)"
  },
  {
    "id": "zbll_l_zbll_l_7",
    "name": "ZBLL L 7",
    "title": "3x3 - ZBLL L - ZBLL L 7",
    "group": "ZBLL - L - L1",
    "alg": "y' R' U' R U' R' U' R U2 R D r' U2 r D' R'",
    "algs": [
      "y' R' U' R U' R' U' R U2 R D r' U2 r D' R'",
      "R U R' U2 R U R' U2 F' U2 y' R U' R' U' R",
      "R U R' U2 R U R' U D R' U2 R U' R' U' R D'",
      "y' R' U' R U' R' U R2 D R' U R D' R2 U R U' R' U R"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL L - ZBLL L 7 (L1)"
  },
  {
    "id": "zbll_l_zbll_l_8",
    "name": "ZBLL L 8",
    "title": "3x3 - ZBLL L - ZBLL L 8",
    "group": "ZBLL - L - L1",
    "alg": "y' F R U' R' U R U R2 D' R U R' D R2 U' R' F'",
    "algs": [
      "y' F R U' R' U R U R2 D' R U R' D R2 U' R' F'",
      "y' F R U' R' U R2 D R' U R D' R2 U R U' R' F'",
      "y R U2 R U R U' R2 D R' U R D' R U R'",
      "y R U2 R' F U2 F' U' R F U' F' U2 R'"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL L - ZBLL L 8 (L1)"
  },
  {
    "id": "zbll_l_zbll_l_9",
    "name": "ZBLL L 9",
    "title": "3x3 - ZBLL L - ZBLL L 9",
    "group": "ZBLL - L - L1",
    "alg": "y' R' U' R2 D r' U2 r D' R2 U R U R' U2 R",
    "algs": [
      "y' R' U' R2 D r' U2 r D' R2 U R U R' U2 R",
      "R' U2 R' D' R' F2 R2 U2 R2 F2 R D R2",
      "R2 U' R' U' R2 U R U D' R U2 R' D R2",
      "R U' R D R' U' R U2 R' U' R D' U' R' U R'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL L - ZBLL L 9 (L1)"
  },
  {
    "id": "zbll_l_zbll_l_10",
    "name": "ZBLL L 10",
    "title": "3x3 - ZBLL L - ZBLL L 10",
    "group": "ZBLL - L - L1",
    "alg": "R' U R U' R' U F' R U2 R' U2 R' F R2",
    "algs": [
      "R' U R U' R' U F' R U2 R' U2 R' F R2",
      "y' R' U2 R U R2 D' R U' R' r U2 r' D R2",
      "R U R' U' R U' R' U L' U R U' L U' R'",
      "y' L2 D' R' B2 R' D2 L' D R2 D2 L'"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL L - ZBLL L 10 (L1)"
  },
  {
    "id": "zbll_l_zbll_l_11",
    "name": "ZBLL L 11",
    "title": "3x3 - ZBLL L - ZBLL L 11",
    "group": "ZBLL - L - L1",
    "alg": "R' U R2 D R' U R D' R' U2 R' U R U R' U' R",
    "algs": [
      "R' U R2 D R' U R D' R' U2 R' U R U R' U' R",
      "R' U R U' R' U R U R' U' R U' R D R' U2 R D' R'",
      "y2 f U' R2 U' R' F R' F' U' R U' R' U' f'",
      "y' R' U2 R F U' R' U R U F' R' U' R U R' U R"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL L - ZBLL L 11 (L1)"
  },
  {
    "id": "zbll_l_zbll_l_12",
    "name": "ZBLL L 12",
    "title": "3x3 - ZBLL L - ZBLL L 12",
    "group": "ZBLL - L - L1",
    "alg": "y' F R U' R' U' R2 D R' U R D' R' U R' U' F'",
    "algs": [
      "y' F R U' R' U' R2 D R' U R D' R' U R' U' F'",
      "y' R U' R2 F2 R U2 R U2 R' F2 U2 R U' R'",
      "y2 F U R' U' R F' R' U' R U R' U' R U R' U R",
      "y' F U R U' R' F' R B' R' U' R B R' f' L f"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL L - ZBLL L 12 (L1)"
  },
  {
    "id": "zbll_l_zbll_l_13",
    "name": "ZBLL L 13",
    "title": "3x3 - ZBLL L - ZBLL L 13",
    "group": "ZBLL - L - L2",
    "alg": "R2 D' R U2 R' D R2 U R2 F' R U R U' R' F R",
    "algs": [
      "R2 D' R U2 R' D R2 U R2 F' R U R U' R' F R",
      "y2 R2 D r' U2 r R' U' R D' R' U' R'",
      "R2 U R' U' R' U R' D U' R' U R D'",
      "R' F2 R U2 R U2 R' F2 R U' R' U R U2 R'"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL L - ZBLL L 13 (L2)"
  },
  {
    "id": "zbll_l_zbll_l_14",
    "name": "ZBLL L 14",
    "title": "3x3 - ZBLL L - ZBLL L 14",
    "group": "ZBLL - L - L2",
    "alg": "y R U' R' U R U' R' U' R U R2 D' R U' R' D R",
    "algs": [
      "y R U' R' U R U' R' U' R U R2 D' R U' R' D R",
      "S' R U R' F' U f U' R' U' R' U R",
      "y R' D R2 U' R' U R U' R' U' R U R2 D' R",
      "y' R' D' R U2 R' D R2 U' R' U R U' R' U' R U R'"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL L - ZBLL L 14 (L2)"
  },
  {
    "id": "zbll_l_zbll_l_15",
    "name": "ZBLL L 15",
    "title": "3x3 - ZBLL L - ZBLL L 15",
    "group": "ZBLL - L - L2",
    "alg": "L U' R U R' L' U2 R U' R' U' R U' R'",
    "algs": [
      "L U' R U R' L' U2 R U' R' U' R U' R'",
      "R' U2 R F U' R' U2 R U F' U' R' U R",
      "y R2 U R U R D' R U' R' D U' R' U2 R'",
      "y R U R' U' R U R2 D' R U R' D R2 U R' U' R U R' U' R U' R'"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL L - ZBLL L 15 (L2)"
  },
  {
    "id": "zbll_l_zbll_l_16",
    "name": "ZBLL L 16",
    "title": "3x3 - ZBLL L - ZBLL L 16",
    "group": "ZBLL - L - L2",
    "alg": "R' U2 R2 U R' U' R' U2 F R U R U' R' F'",
    "algs": [
      "R' U2 R2 U R' U' R' U2 F R U R U' R' F'",
      "R' U' R' D' R U' R' U' D R' U' R2 U R U R2",
      "L U' R U L' U R U2 R U' R U R' U2 R2",
      "y2 M U' M' F R' F' R U R U' r' U M'"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL L - ZBLL L 16 (L2)"
  },
  {
    "id": "zbll_l_zbll_l_17",
    "name": "ZBLL L 17",
    "title": "3x3 - ZBLL L - ZBLL L 17",
    "group": "ZBLL - L - L2",
    "alg": "R' U' R U' R' U R U' R' U R U' R2 D' R U2 R' D R2",
    "algs": [
      "R' U' R U' R' U R U' R' U R U' R2 D' R U2 R' D R2",
      "R' U2 R U R' U' F' R U R' U' R' F R2 U R' U R",
      "R' F R U R' U' F' R' F R F' R' F R F' U R",
      "y S R F R2 F' R U2 S U' R2 S2 U' R2"
    ],
    "moves": 19,
    "desc": "3x3 - ZBLL L - ZBLL L 17 (L2)"
  },
  {
    "id": "zbll_l_zbll_l_18",
    "name": "ZBLL L 18",
    "title": "3x3 - ZBLL L - ZBLL L 18",
    "group": "ZBLL - L - L2",
    "alg": "y F R' F' r U R U' r'",
    "algs": [
      "y F R' F' r U R U' r'",
      "x' R U' R' D R U R' D' x",
      "y2 R2 D R' U R D' R' U' R'",
      "y2 x' U' R' D' R U R' D R x"
    ],
    "moves": 9,
    "desc": "3x3 - ZBLL L - ZBLL L 18 (L2)"
  },
  {
    "id": "zbll_l_zbll_l_19",
    "name": "ZBLL L 19",
    "title": "3x3 - ZBLL L - ZBLL L 19",
    "group": "ZBLL - L - L2",
    "alg": "y' R' U2 R U2 D' R U' R U R U' R2 D",
    "algs": [
      "y' R' U2 R U2 D' R U' R U R U' R2 D",
      "R U R' U R U R' U' R U R D R' U2 R D' R' U' R'",
      "y2 x' r U r' D' F r U r' F' D r U2 L'",
      "R U R' B' U R U R' U' f D R2 D' z'"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL L - ZBLL L 19 (L2)"
  },
  {
    "id": "zbll_l_zbll_l_20",
    "name": "ZBLL L 20",
    "title": "3x3 - ZBLL L - ZBLL L 20",
    "group": "ZBLL - L - L2",
    "alg": "L R U' R' U L' R U R' U R U' R'",
    "algs": [
      "L R U' R' U L' R U R' U R U' R'",
      "R U R' F' U' F U R U2 R' f R U R' U' f'",
      "R F U' R' U R U R' U R U' F' R'",
      "L R U' R' U R L' U R' U R U' R'"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL L - ZBLL L 20 (L2)"
  },
  {
    "id": "zbll_l_zbll_l_21",
    "name": "ZBLL L 21",
    "title": "3x3 - ZBLL L - ZBLL L 21",
    "group": "ZBLL - L - L2",
    "alg": "y R U R D R' U2 R D' R' U' R' U R U R'",
    "algs": [
      "y R U R D R' U2 R D' R' U' R' U R U R'",
      "y S U2 R' U2 R U2 F R f'",
      "y' U M' U2 y R' U2 R U2 F l U' z'",
      "y' S' R' U2 R S U2 f R f'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL L - ZBLL L 21 (L2)"
  },
  {
    "id": "zbll_l_zbll_l_22",
    "name": "ZBLL L 22",
    "title": "3x3 - ZBLL L - ZBLL L 22",
    "group": "ZBLL - L - L2",
    "alg": "R U R' U R U' R' U' L' U R U' R' L",
    "algs": [
      "R U R' U R U' R' U' L' U R U' R' L",
      "y R U' R' U' R' D' r U2 r' D R U' R U R'",
      "R U R' U R U' R' U' r' F R F' M'",
      "R' U' R U' R D R' U2 R D' R2 U R U' R' U R"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL L - ZBLL L 22 (L2)"
  },
  {
    "id": "zbll_l_zbll_l_23",
    "name": "ZBLL L 23",
    "title": "3x3 - ZBLL L - ZBLL L 23",
    "group": "ZBLL - L - L2",
    "alg": "y F R U R' U' R' F' R U2 R U2 R'",
    "algs": [
      "y F R U R' U' R' F' R U2 R U2 R'",
      "y' x' M' U L' U2 R U2 L U' L' U' R' U R",
      "y F R' F' r U2 R' U' R2 U' r' U R' U R",
      "R U' R' U2 R U' R' F' U F U2 F' U F"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL L - ZBLL L 23 (L2)"
  },
  {
    "id": "zbll_l_zbll_l_24",
    "name": "ZBLL L 24",
    "title": "3x3 - ZBLL L - ZBLL L 24",
    "group": "ZBLL - L - L2",
    "alg": "y' R' F' R U R' U' R' F R U' R U R' U R",
    "algs": [
      "y' R' F' R U R' U' R' F R U' R U R' U R",
      "y2 R U R' F' U' r' F2 r U F",
      "U2 R U R' U' R' F R F' l' U2 L U L' U l",
      "F' r' F r U r' F2 r U F"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL L - ZBLL L 24 (L2)"
  },
  {
    "id": "zbll_l_zbll_l_25",
    "name": "ZBLL L 25",
    "title": "3x3 - ZBLL L - ZBLL L 25",
    "group": "ZBLL - L - L3",
    "alg": "y' R2 D' r U2 r' R U R' D R U R",
    "algs": [
      "y' R2 D' r U2 r' R U R' D R U R",
      "y' r U2 r' U2 r' F2 r F2 L' U L U' L' U2 L",
      "y' R2 D' r U2 M U R' D R U R",
      "y' R' U' R U R' F2 R U2 R' U2 R' F2 R2"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL L - ZBLL L 25 (L3)"
  },
  {
    "id": "zbll_l_zbll_l_26",
    "name": "ZBLL L 26",
    "title": "3x3 - ZBLL L - ZBLL L 26",
    "group": "ZBLL - L - L3",
    "alg": "y' R' U R U2 R' L' U R U L U r' F r",
    "algs": [
      "y' R' U R U2 R' L' U R U L U r' F r",
      "y' S R B' U' R2 U B U' R2 U R' S'",
      "y L' U R' U' L R U2 R' U R U R' U R",
      "R' F' R U2 R U2 R' F R' U' R2 U' R2 U2 R"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL L - ZBLL L 26 (L3)"
  },
  {
    "id": "zbll_l_zbll_l_27",
    "name": "ZBLL L 27",
    "title": "3x3 - ZBLL L - ZBLL L 27",
    "group": "ZBLL - L - L3",
    "alg": "R' D R' U R D' R' U R2 U' R2 U' R2",
    "algs": [
      "R' D R' U R D' R' U R2 U' R2 U' R2",
      "y R U R' U R' D' r U2 r' D R2 U' R' U R U' R'",
      "y S' R' U' R f R' F' U R U R U' R'",
      "R D' R2 U R U' R' U R U R' U' R2 D R'"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL L - ZBLL L 27 (L3)"
  },
  {
    "id": "zbll_l_zbll_l_28",
    "name": "ZBLL L 28",
    "title": "3x3 - ZBLL L - ZBLL L 28",
    "group": "ZBLL - L - L3",
    "alg": "y2 F' R U2 R' U2 R' F U2 R U R U' R2 U2 R",
    "algs": [
      "y2 F' R U2 R' U2 R' F U2 R U R U' R2 U2 R",
      "y M U M' F' L F L' U' L' U l U' M'",
      "y R' D U R' U2 R U' R' U' R D' R U R' U2 R",
      "y2 F R U2 R' F' S R' F R S' U2 R' F' R"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL L - ZBLL L 28 (L3)"
  },
  {
    "id": "zbll_l_zbll_l_29",
    "name": "ZBLL L 29",
    "title": "3x3 - ZBLL L - ZBLL L 29",
    "group": "ZBLL - L - L3",
    "alg": "y2 F' r U R' U' r' F R",
    "algs": [
      "y2 F' r U R' U' r' F R",
      "y' R2 D' R U' R' D R U R",
      "x' U' R U L' U' R' U r",
      "r U R U' L' U R' U' x'"
    ],
    "moves": 9,
    "desc": "3x3 - ZBLL L - ZBLL L 29 (L3)"
  },
  {
    "id": "zbll_l_zbll_l_30",
    "name": "ZBLL L 30",
    "title": "3x3 - ZBLL L - ZBLL L 30",
    "group": "ZBLL - L - L3",
    "alg": "y R U R' U R U' R' U R U' R' U R2 D R' U2 R D' R2",
    "algs": [
      "y R U R' U R U' R' U R U' R' U R2 D R' U2 R D' R2",
      "F R' F' R U R U' R' F U R U' R' U R U' R' F'",
      "y' R U r' F R' F' r U' R U R' U2 R U2 R'",
      "y' R U L' U R' U' L U' R U R' U2 R U2 R'"
    ],
    "moves": 20,
    "desc": "3x3 - ZBLL L - ZBLL L 30 (L3)"
  },
  {
    "id": "zbll_l_zbll_l_31",
    "name": "ZBLL L 31",
    "title": "3x3 - ZBLL L - ZBLL L 31",
    "group": "ZBLL - L - L3",
    "alg": "y' R' F R U R U' R' F' U R U R' U R U' R'",
    "algs": [
      "y' R' F R U R U' R' F' U R U R' U R U' R'",
      "y R' L' U R U' L R' U' R U' R' U R",
      "y R' F R U R' U' F' U R F' U' L' U L F",
      "y R' L' U R U' R' L U' R U' R' U R"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL L - ZBLL L 31 (L3)"
  },
  {
    "id": "zbll_l_zbll_l_32",
    "name": "ZBLL L 32",
    "title": "3x3 - ZBLL L - ZBLL L 32",
    "group": "ZBLL - L - L3",
    "alg": "y R' U' R U2 R' F' R U R' U' R' F R2 U R' U2 R",
    "algs": [
      "y R' U' R U2 R' F' R U R' U' R' F R2 U R' U2 R",
      "y R' U' R F U' R' U' R U F' R' U2 R",
      "y2 R U2 R' U2 D R' U R' U' R' U R2 D'",
      "y2 D' R U2 R' U2 D R' U R' U' R' U R2"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL L - ZBLL L 32 (L3)"
  },
  {
    "id": "zbll_l_zbll_l_33",
    "name": "ZBLL L 33",
    "title": "3x3 - ZBLL L - ZBLL L 33",
    "group": "ZBLL - L - L3",
    "alg": "y2 F' R U2 R' U2 R' F R U R U' R'",
    "algs": [
      "y2 F' R U2 R' U2 R' F R U R U' R'",
      "y2 F' L' U' L U L F L' U2 L' U2 L",
      "y2 F' r U R' U' r' F U R' U' R' U' R3 U R U R2",
      "y2 R U2 R' U' R U R D R' U' R D' R' U' R'"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL L - ZBLL L 33 (L3)"
  },
  {
    "id": "zbll_l_zbll_l_34",
    "name": "ZBLL L 34",
    "title": "3x3 - ZBLL L - ZBLL L 34",
    "group": "ZBLL - L - L3",
    "alg": "y R U R' U R' D' R U2 R' D R2 U' R' U R U' R'",
    "algs": [
      "y R U R' U R' D' R U2 R' D R2 U' R' U R U' R'",
      "y R' U' R U' R' U R F R' U R U' F'",
      "y R' U' R U' R' U R U L U' R' U M x",
      "y' L' U' L U' L' U L U R U' L' U M' x'"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL L - ZBLL L 34 (L3)"
  },
  {
    "id": "zbll_l_zbll_l_35",
    "name": "ZBLL L 35",
    "title": "3x3 - ZBLL L - ZBLL L 35",
    "group": "ZBLL - L - L3",
    "alg": "R' U' R' D' R U2 R' D R U R U' R' U' R",
    "algs": [
      "R' U' R' D' R U2 R' D R U R U' R' U' R",
      "y2 F B' R2 U R2 U' R2 F' U' B",
      "y2 S' R U2 R' S U2 F' U' F",
      "S U2 R U2 R' U2 f' U' F"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL L - ZBLL L 35 (L3)"
  },
  {
    "id": "zbll_l_zbll_l_36",
    "name": "ZBLL L 36",
    "title": "3x3 - ZBLL L - ZBLL L 36",
    "group": "ZBLL - L - L3",
    "alg": "y' F R U' R' U' R U2 R' U' F'",
    "algs": [
      "y' F R U' R' U' R U2 R' U' F'",
      "y L' U' L F U R U2 R' U' F'",
      "y' R' U' R F U' R' U2 R U F'",
      "F' U' F U2 R U2 R' U' R' F R F' R U' R' U"
    ],
    "moves": 11,
    "desc": "3x3 - ZBLL L - ZBLL L 36 (L3)"
  },
  {
    "id": "zbll_l_zbll_l_37",
    "name": "ZBLL L 37",
    "title": "3x3 - ZBLL L - ZBLL L 37",
    "group": "ZBLL - L - L4",
    "alg": "y2 R U R' U R U2 R D R' U2 R D' R' U2 R'",
    "algs": [
      "y2 R U R' U R U2 R D R' U2 R D' R' U2 R'",
      "R2 D R' U2 R D' R' U2 R2 U2 R U R' U R",
      "U S R U R' U' F' U2 F U R U R' S'",
      "x' M' U L' U L U2 L' U' L U' R U L'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL L - ZBLL L 37 (L4)"
  },
  {
    "id": "zbll_l_zbll_l_38",
    "name": "ZBLL L 38",
    "title": "3x3 - ZBLL L - ZBLL L 38",
    "group": "ZBLL - L - L4",
    "alg": "y2 R U2 R' U' R2 D R' U' R D' R2",
    "algs": [
      "y2 R U2 R' U' R2 D R' U' R D' R2",
      "U2 R U2 R2 D' R U' R' D R2 U' R'",
      "y2 F R U R' U' R' F' R U R U R' U' R U' R'",
      "y2 R U R' U' R U R2 D' R U R' D R2 U' R'"
    ],
    "moves": 12,
    "desc": "3x3 - ZBLL L - ZBLL L 38 (L4)"
  },
  {
    "id": "zbll_l_zbll_l_39",
    "name": "ZBLL L 39",
    "title": "3x3 - ZBLL L - ZBLL L 39",
    "group": "ZBLL - L - L4",
    "alg": "R' D' R U2 R' D R U R U2 R' U R U R'",
    "algs": [
      "R' D' R U2 R' D R U R U2 R' U R U R'",
      "y2 L' U R U' L U R2 U2 R U R' U R",
      "f R U R2 U' S' R' F' U F R F'",
      "y' R U' R' F2 U2 F2 D R' U R U' R D'"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL L - ZBLL L 39 (L4)"
  },
  {
    "id": "zbll_l_zbll_l_40",
    "name": "ZBLL L 40",
    "title": "3x3 - ZBLL L - ZBLL L 40",
    "group": "ZBLL - L - L4",
    "alg": "R' F' R U R' U' R' F R2 U' R' U2 R",
    "algs": [
      "R' F' R U R' U' R' F R2 U' R' U2 R",
      "y R U2 R D r' U2 r D' R2",
      "y2 R' U M' U' R U' R' U' R U2 r' F R' F' R U' R",
      "F' R U R2 F' R U R U' R' F R U' R' F"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL L - ZBLL L 40 (L4)"
  },
  {
    "id": "zbll_l_zbll_l_41",
    "name": "ZBLL L 41",
    "title": "3x3 - ZBLL L - ZBLL L 41",
    "group": "ZBLL - L - L4",
    "alg": "y R U2 R D R' U2 R D' R2",
    "algs": [
      "y R U2 R D R' U2 R D' R2",
      "y' x' R U R' D R U2 R' D' R U R' x",
      "y' L U2 L D L' U2 L D' L2",
      "F' r U' L D2 L' U L D2 r2 D"
    ],
    "moves": 10,
    "desc": "3x3 - ZBLL L - ZBLL L 41 (L4)"
  },
  {
    "id": "zbll_l_zbll_l_42",
    "name": "ZBLL L 42",
    "title": "3x3 - ZBLL L - ZBLL L 42",
    "group": "ZBLL - L - L4",
    "alg": "y R U2 R' U2 R U R2 D' R U2 R' D R2 U2 R'",
    "algs": [
      "y R U2 R' U2 R U R2 D' R U2 R' D R2 U2 R'",
      "y2 l x' U L' U' z' R U L' U' R' U L2 z L U' l2",
      "y F R' F' r U' R' D' R U' R' D R U' R U' r'",
      "y2 S' r U2 R2 U' R2 U' r' S U2 f R f'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL L - ZBLL L 42 (L4)"
  },
  {
    "id": "zbll_l_zbll_l_43",
    "name": "ZBLL L 43",
    "title": "3x3 - ZBLL L - ZBLL L 43",
    "group": "ZBLL - L - L4",
    "alg": "y2 F R U R' U' R' F' U' R U R U' R' U' R' U R",
    "algs": [
      "y2 F R U R' U' R' F' U' R U R U' R' U' R' U R",
      "R' U2 R' U' R' U R2 D' R U' R' D R' U' R",
      "y2 R U R' U2 R U R2 D' r U2 r' D R2 U' R'",
      "y R u2 R' F' R u2 R2 F' R U2 R' F R"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL L - ZBLL L 43 (L4)"
  },
  {
    "id": "zbll_l_zbll_l_44",
    "name": "ZBLL L 44",
    "title": "3x3 - ZBLL L - ZBLL L 44",
    "group": "ZBLL - L - L4",
    "alg": "y2 R U R' U R U R' U2 R' D' r U2 r' D R",
    "algs": [
      "y2 R U R' U R U R' U2 R' D' r U2 r' D R",
      "y R u R' U R U' R u' R2 U R f R' f'",
      "y2 R U R' U R U' R2 D' R U' R' D R2 U' R' U R U' R'",
      "y R' U' R U2 R' U' R D' U' R U2 R' U R U R' D"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL L - ZBLL L 44 (L4)"
  },
  {
    "id": "zbll_l_zbll_l_45",
    "name": "ZBLL L 45",
    "title": "3x3 - ZBLL L - ZBLL L 45",
    "group": "ZBLL - L - L4",
    "alg": "y R U' R2 D' R U' R' D R U2 R U' R' U' R U R'",
    "algs": [
      "y R U' R2 D' R U' R' D R U2 R U' R' U' R U R'",
      "y2 S R' U' F R' F' R2 U F R F' U2 S'",
      "y L U' R U L' U' R' U R U' R' U R U' R' U' R U R'",
      "L U D' L U2 L' U2 D L2 U2 L U L2 U L"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL L - ZBLL L 45 (L4)"
  },
  {
    "id": "zbll_l_zbll_l_46",
    "name": "ZBLL L 46",
    "title": "3x3 - ZBLL L - ZBLL L 46",
    "group": "ZBLL - L - L4",
    "alg": "y2 R' F' R U2 R U2 R' F U' R U R' U' R U' R'",
    "algs": [
      "y2 R' F' R U2 R U2 R' F U' R U R' U' R U' R'",
      "y R' U' R U R' U R U2 F R' U R U' F' U R' U R",
      "R2 D' R2 U R' D R2 U' D r2 D2 r2 D' R'",
      "y R' U' R U R' U R U' L U' R' U L' U R"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL L - ZBLL L 46 (L4)"
  },
  {
    "id": "zbll_l_zbll_l_47",
    "name": "ZBLL L 47",
    "title": "3x3 - ZBLL L - ZBLL L 47",
    "group": "ZBLL - L - L4",
    "alg": "y R' U R U2 R' U' R U2 R' U' R U' R2 D' R U R' D R2",
    "algs": [
      "y R' U R U2 R' U' R U2 R' U' R U' R2 D' R U R' D R2",
      "y R' U R' D' R U R' U2 R U R' U D R U' R",
      "y2 R U R2 D' r U2 r' D R2 U' R' U' R U2 R'",
      "F2 U' F R2 u R' U R U' R u' R2 F"
    ],
    "moves": 20,
    "desc": "3x3 - ZBLL L - ZBLL L 47 (L4)"
  },
  {
    "id": "zbll_l_zbll_l_48",
    "name": "ZBLL L 48",
    "title": "3x3 - ZBLL L - ZBLL L 48",
    "group": "ZBLL - L - L4",
    "alg": "y' R' F' R U R' U' R' F D' R U' R' D R2 U R' U R",
    "algs": [
      "y' R' F' R U R' U' R' F D' R U' R' D R2 U R' U R",
      "y' F U' R U R' U R' U2 R U R' U R2 U' R' U F'",
      "y2 L' R U R' U' L U R U R' U' R U R' U' R U' R'",
      "y2 M F R' F' r U R U R' U' R U R' U' R U' R'"
    ],
    "moves": 19,
    "desc": "3x3 - ZBLL L - ZBLL L 48 (L4)"
  },
  {
    "id": "zbll_l_zbll_l_49",
    "name": "ZBLL L 49",
    "title": "3x3 - ZBLL L - ZBLL L 49",
    "group": "ZBLL - L - L5",
    "alg": "y r U2 r2 F R F' r2 R' U2 r'",
    "algs": [
      "y r U2 r2 F R F' r2 R' U2 r'",
      "y2 R' F2 R2 U' r' F R' M' F2 R",
      "y r U2 r2 F R F' R' r2 U2 r'",
      "y2 R' F2 R2 U' L' U R2 r U2 R x'"
    ],
    "moves": 11,
    "desc": "3x3 - ZBLL L - ZBLL L 49 (L5)"
  },
  {
    "id": "zbll_l_zbll_l_50",
    "name": "ZBLL L 50",
    "title": "3x3 - ZBLL L - ZBLL L 50",
    "group": "ZBLL - L - L5",
    "alg": "y R U' R' U R U' R' U' R U R' U2 R' D' R U R' D R",
    "algs": [
      "y R U' R' U R U' R' U' R U R' U2 R' D' R U R' D R",
      "R U2 R' U' L' U2 R U M' x' U L' U L",
      "U2 R U R' U R U' R' F2 R U2 R' U2 R' F2 R2 U' R' U2",
      "y2 R U R' U R U' R' F2 R U2 R' U2 R' F2 R2 U' R'"
    ],
    "moves": 20,
    "desc": "3x3 - ZBLL L - ZBLL L 50 (L5)"
  },
  {
    "id": "zbll_l_zbll_l_51",
    "name": "ZBLL L 51",
    "title": "3x3 - ZBLL L - ZBLL L 51",
    "group": "ZBLL - L - L5",
    "alg": "R' U R U' R' U R U R' U' R U2 R D R' U' R D' R'",
    "algs": [
      "R' U R U' R' U R U R' U' R U2 R D R' U' R D' R'",
      "R' D' R U' R' D R U2 R U' R' U R U R' U' R U R'",
      "y' R' U' R U' R' U' F U' F' U' R F U2 F'",
      "y' L' U2 L U R U2 L' U' M' x' U' R U' R'"
    ],
    "moves": 19,
    "desc": "3x3 - ZBLL L - ZBLL L 51 (L5)"
  },
  {
    "id": "zbll_l_zbll_l_52",
    "name": "ZBLL L 52",
    "title": "3x3 - ZBLL L - ZBLL L 52",
    "group": "ZBLL - L - L5",
    "alg": "r U2 R r2 F R' F' r2 U2 r'",
    "algs": [
      "r U2 R r2 F R' F' r2 U2 r'",
      "r U2 r2 R F R' F' r2 U2 r'",
      "y2 R' U2 R U R2 F R F' R' F R F' R' F R F' U R",
      "y' R' F2 R2 r' F' r U R2 F2 R"
    ],
    "moves": 10,
    "desc": "3x3 - ZBLL L - ZBLL L 52 (L5)"
  },
  {
    "id": "zbll_l_zbll_l_53",
    "name": "ZBLL L 53",
    "title": "3x3 - ZBLL L - ZBLL L 53",
    "group": "ZBLL - L - L5",
    "alg": "y2 F' r U R' U R' D R U' R' D' R U' r' F R",
    "algs": [
      "y2 F' r U R' U R' D R U' R' D' R U' r' F R",
      "r U r' R U R' U' r U' r' F U R U' R' F'",
      "y R U2 R2 F R F2 r' U' F2 U r F",
      "y R U2 R2 x U R U2 r' B' U2 B r U x'"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL L - ZBLL L 53 (L5)"
  },
  {
    "id": "zbll_l_zbll_l_54",
    "name": "ZBLL L 54",
    "title": "3x3 - ZBLL L - ZBLL L 54",
    "group": "ZBLL - L - L5",
    "alg": "y F R U R' U' F' r U r' U R U' R' r U' r'",
    "algs": [
      "y F R U R' U' F' r U r' U R U' R' r U' r'",
      "r U R2 D' R U2 R' D R U r' F R F'",
      "y L' U R2 D' R' U2 R D R' U L U R'",
      "y' Lw' U' Lw L' U' L U Lw' U Lw F' U' L' U L F"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL L - ZBLL L 54 (L5)"
  },
  {
    "id": "zbll_l_zbll_l_55",
    "name": "ZBLL L 55",
    "title": "3x3 - ZBLL L - ZBLL L 55",
    "group": "ZBLL - L - L5",
    "alg": "y' F R U R' U' R' F R2 U' R' U' R U R' F2",
    "algs": [
      "y' F R U R' U' R' F R2 U' R' U' R U R' F2",
      "y R' U R U' R' U' R U' R' U2 R' D' R U' R' D R2",
      "y2 x' r2 U' r U2 R' F R U2 r2 F L'",
      "R D R' U R D' R2 U' R U R' U R U R' U' R"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL L - ZBLL L 55 (L5)"
  },
  {
    "id": "zbll_l_zbll_l_56",
    "name": "ZBLL L 56",
    "title": "3x3 - ZBLL L - ZBLL L 56",
    "group": "ZBLL - L - L5",
    "alg": "y2 B' R U R' U' R' F R2 U' R' U' R U R' S z'",
    "algs": [
      "y2 B' R U R' U' R' F R2 U' R' U' R U R' S z'",
      "R U' R' U R U R' U R U' R2 D' R U R' D R",
      "y M' U' r U2 R' F R U2 r2 F R",
      "y R' F' r2 U2 R' F' R U2 r' U M"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL L - ZBLL L 56 (L5)"
  },
  {
    "id": "zbll_l_zbll_l_57",
    "name": "ZBLL L 57",
    "title": "3x3 - ZBLL L - ZBLL L 57",
    "group": "ZBLL - L - L5",
    "alg": "y' R' U' R U R' F' R U R' U' R' F R2",
    "algs": [
      "y' R' U' R U R' F' R U R' U' R' F R2",
      "y r U2 R2 F R F' R U2 r'",
      "R U2 L' U R' U' L R U2 R'",
      "y2 B' R U R' F' R U R' U' R' F R2 U' R' U' B"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL L - ZBLL L 57 (L5)"
  },
  {
    "id": "zbll_l_zbll_l_58",
    "name": "ZBLL L 58",
    "title": "3x3 - ZBLL L - ZBLL L 58",
    "group": "ZBLL - L - L5",
    "alg": "y F R U R2 F R F' R U' R' F'",
    "algs": [
      "y F R U R2 F R F' R U' R' F'",
      "F R U R' U' R U' R' U2 R U2 R' U' F'",
      "F R U R' U' R2 x' U' R' U R' D' x",
      "F R U R' F R' F' R2 U' R' F'"
    ],
    "moves": 12,
    "desc": "3x3 - ZBLL L - ZBLL L 58 (L5)"
  },
  {
    "id": "zbll_l_zbll_l_59",
    "name": "ZBLL L 59",
    "title": "3x3 - ZBLL L - ZBLL L 59",
    "group": "ZBLL - L - L5",
    "alg": "y' L' U2 R U' R' U2 L R U' R'",
    "algs": [
      "y' L' U2 R U' R' U2 L R U' R'",
      "r' U2 R2 B' R' B R' U2 r",
      "y F R U R' U' F' r U R' U R U2 r'",
      "L U L' U' L F L' U' L U L F' L2"
    ],
    "moves": 11,
    "desc": "3x3 - ZBLL L - ZBLL L 59 (L5)"
  },
  {
    "id": "zbll_l_zbll_l_60",
    "name": "ZBLL L 60",
    "title": "3x3 - ZBLL L - ZBLL L 60",
    "group": "ZBLL - L - L5",
    "alg": "y2 R U R' U F' R U2 R' U' R' U' R' F R U R",
    "algs": [
      "y2 R U R' U F' R U2 R' U' R' U' R' F R U R",
      "y F U' R' U R D R' U R U D' F' R' U R",
      "R' U2 R2 U R' F' R U R' U' R' F R2 U' R' U' R' U2 R",
      "y' F R U' R' U' R U R' U R' D' R U' R' D R2 U R' U' F'"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL L - ZBLL L 60 (L5)"
  },
  {
    "id": "zbll_l_zbll_l_61",
    "name": "ZBLL L 61",
    "title": "3x3 - ZBLL L - ZBLL L 61",
    "group": "ZBLL - L - L6",
    "alg": "y' R2 U R' U R' U' R U' R' U' R U R U' R2",
    "algs": [
      "y' R2 U R' U R' U' R U' R' U' R U R U' R2",
      "y' R' U' R U' R' U R U' R' U2 R2 U R' U R U2 R'",
      "R U R' U R U' R' U R U2 R' L' U' L U' L' U2 L",
      "y' R U R' U R U2 R' U R' U2 R U R' U' R U R' U R"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL L - ZBLL L 61 (L6)"
  },
  {
    "id": "zbll_l_zbll_l_62",
    "name": "ZBLL L 62",
    "title": "3x3 - ZBLL L - ZBLL L 62",
    "group": "ZBLL - L - L6",
    "alg": "y R U2 R' U' R U' R' U R' U2 R U R' U R",
    "algs": [
      "y R U2 R' U' R U' R' U R' U2 R U R' U R",
      "y R U2 R' U' R U' R' y R' U2 R U R' U R"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL L - ZBLL L 62 (L6)"
  },
  {
    "id": "zbll_l_zbll_l_63",
    "name": "ZBLL L 63",
    "title": "3x3 - ZBLL L - ZBLL L 63",
    "group": "ZBLL - L - L6",
    "alg": "y R U R' U R U2 R' U R' U' R U' R' U2 R",
    "algs": [
      "y R U R' U R U2 R' U R' U' R U' R' U2 R"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL L - ZBLL L 63 (L6)"
  },
  {
    "id": "zbll_l_zbll_l_64",
    "name": "ZBLL L 64",
    "title": "3x3 - ZBLL L - ZBLL L 64",
    "group": "ZBLL - L - L6",
    "alg": "y R2 U' R U R U' R' U' R U' R' U R' U R2",
    "algs": [
      "y R2 U' R U R U' R' U' R U' R' U R' U R2",
      "y2 R' U2 R U R' U R2 U2 R' U' R U R' U' R U' R'",
      "y' r U r' U R U' R' U R U' R' M' U R U2 r'",
      "y' R' U2 R2 U2 R U' R U R' U2 R' U2 R' U2 R"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL L - ZBLL L 64 (L6)"
  },
  {
    "id": "zbll_l_zbll_l_65",
    "name": "ZBLL L 65",
    "title": "3x3 - ZBLL L - ZBLL L 65",
    "group": "ZBLL - L - L6",
    "alg": "R' U2 R U R' U R U' R U2 R' U' R U' R'",
    "algs": [
      "R' U2 R U R' U R U' R U2 R' U' R U' R'",
      "y2 L' U2 L U L' U L U' L U2 L' U' L U' L'"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL L - ZBLL L 65 (L6)"
  },
  {
    "id": "zbll_l_zbll_l_66",
    "name": "ZBLL L 66",
    "title": "3x3 - ZBLL L - ZBLL L 66",
    "group": "ZBLL - L - L6",
    "alg": "y2 R2 U' R U' R U R' U R U R' U' R' U R2",
    "algs": [
      "y2 R2 U' R U' R U R' U R U R' U' R' U R2",
      "y2 R U R' U R U' R' U R U2 R2 U' R U' R' U2 R",
      "y' F' R U2 R' U2 R' F2 R2 U R' U' R U R' U' F'",
      "y2 R' U' R U' R' U2 R U' R U2 R' U' R U R' U' R U' R'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL L - ZBLL L 66 (L6)"
  },
  {
    "id": "zbll_l_zbll_l_67",
    "name": "ZBLL L 67",
    "title": "3x3 - ZBLL L - ZBLL L 67",
    "group": "ZBLL - L - L6",
    "alg": "R' U' R U' R' U2 R U' R U R' U R U2 R'",
    "algs": [
      "R' U' R U' R' U2 R U' R U R' U R U2 R'",
      "y2 L' U' L U' L' U2 L U R U R' U R U2 R'"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL L - ZBLL L 67 (L6)"
  },
  {
    "id": "zbll_l_zbll_l_68",
    "name": "ZBLL L 68",
    "title": "3x3 - ZBLL L - ZBLL L 68",
    "group": "ZBLL - L - L6",
    "alg": "R2 U R' U' R' U R U R' U R U' R U' R2",
    "algs": [
      "R2 U R' U' R' U R U R' U R U' R U' R2",
      "y' R U2 R' U' R U' R2 U2 R U R' U' R U R' U R",
      "U2 R' U2 R' U' R2 U' R U R' U' R U2 R U' R",
      "y2 R U2 R2 U2 R' U R' U' R U2 R U2 R U2 R'"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL L - ZBLL L 68 (L6)"
  },
  {
    "id": "zbll_l_zbll_l_69",
    "name": "ZBLL L 69",
    "title": "3x3 - ZBLL L - ZBLL L 69",
    "group": "ZBLL - L - L6",
    "alg": "y R U2 R' U' R U' R' U2 R U R' U R U2 R'",
    "algs": [
      "y R U2 R' U' R U' R' U2 R U R' U R U2 R'",
      "R' U2 R U R' U R L' U' L U' L' U2 L",
      "y R U2 R' U' R U' R' L U L' U L U2 L'",
      "R' U2 R U R' U R U2 R' U' R U' R' U2 R"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL L - ZBLL L 69 (L6)"
  },
  {
    "id": "zbll_l_zbll_l_70",
    "name": "ZBLL L 70",
    "title": "3x3 - ZBLL L - ZBLL L 70",
    "group": "ZBLL - L - L6",
    "alg": "y R U R' U R U2 R' U2 R U2 R' U' R U' R'",
    "algs": [
      "y R U R' U R U2 R' U2 R U2 R' U' R U' R'",
      "R' U' R U' R' U2 R U2 R' U2 R U R' U R",
      "y R U R' U R U2 R' L U2 L' U' L U' L'",
      "R' U' R U' R' U2 R L' U2 L U L' U L"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL L - ZBLL L 70 (L6)"
  },
  {
    "id": "zbll_l_zbll_l_71",
    "name": "ZBLL L 71",
    "title": "3x3 - ZBLL L - ZBLL L 71",
    "group": "ZBLL - L - L6",
    "alg": "y' R U R' U R U' R' U R U' R' U R U2 R'",
    "algs": [
      "y' R U R' U R U' R' U R U' R' U R U2 R'",
      "y2 R' U' R U' R' U R U' R' U R U' R' U2 R",
      "y2 R' U2 R U R' U' R U R' U' R U R' U R",
      "y' r U r' U R U' R' U R U' R' U R U' R' r U' r'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL L - ZBLL L 71 (L6)"
  },
  {
    "id": "zbll_l_zbll_l_72",
    "name": "ZBLL L 72",
    "title": "3x3 - ZBLL L - ZBLL L 72",
    "group": "ZBLL - L - L6",
    "alg": "R U R' U R U' R' U R U2 R' U' R U2 R' U' R U' R'",
    "algs": [
      "R U R' U R U' R' U R U2 R' U' R U2 R' U' R U' R'",
      "R U' R' L' U2 L U L' U L R U2 R'",
      "y' R U2 R' U2 R' U' R U R U' R' U2 R' U2 R",
      "R' U' R' F D' R U R' D R2 U' R' F' R"
    ],
    "moves": 19,
    "desc": "3x3 - ZBLL L - ZBLL L 72 (L6)"
  },
  {
    "id": "zbll_h_zbll_h_1",
    "name": "ZBLL H 1",
    "title": "3x3 - ZBLL H - ZBLL H 1",
    "group": "ZBLL - H - H1",
    "alg": "y F' r U R' U' r' F R2 U2 R' U' R U' R'",
    "algs": [
      "y F' r U R' U' r' F R2 U2 R' U' R U' R'",
      "R U2 R' U' R U' R' F R U' R' U' R U2 R' U' F'",
      "R' F R U R' U' R' F' R U R2 U2 R' U' R U' R'",
      "y R' U' F' U F R U R U R' U' R' F R F'"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL H - ZBLL H 1 (H1)"
  },
  {
    "id": "zbll_h_zbll_h_2",
    "name": "ZBLL H 2",
    "title": "3x3 - ZBLL H - ZBLL H 2",
    "group": "ZBLL - H - H1",
    "alg": "y' F R' F' r U R U' r2 F2 r U L' U L",
    "algs": [
      "y' F R' F' r U R U' r2 F2 r U L' U L",
      "y' R U R' U R U2 R' U' R2 D R' U R D' R' U' R'",
      "y2 L' R U R' U R U' R' U2 L U' R U2 R'",
      "y2 R U R' U' R' F R U R U' R' F' U' R' U2 R U R' U R"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL H - ZBLL H 2 (H1)"
  },
  {
    "id": "zbll_h_zbll_h_3",
    "name": "ZBLL H 3",
    "title": "3x3 - ZBLL H - ZBLL H 3",
    "group": "ZBLL - H - H1",
    "alg": "y' R U2 R' U' R U R' U2 R' F R2 U' R' U' R U R' F'",
    "algs": [
      "y' R U2 R' U' R U R' U2 R' F R2 U' R' U' R U R' F'",
      "y R U R D R' U R' U' R U R2 D' R U' R U' R'",
      "R U2 R' U' R U' R D' R U' R' D R U R",
      "y' R' U2 R2 B' U R2 U R2 U' B U' R'"
    ],
    "moves": 19,
    "desc": "3x3 - ZBLL H - ZBLL H 3 (H1)"
  },
  {
    "id": "zbll_h_zbll_h_4",
    "name": "ZBLL H 4",
    "title": "3x3 - ZBLL H - ZBLL H 4",
    "group": "ZBLL - H - H1",
    "alg": "y F' R U2 R' U2 R' F U' R U R U' R' U' R' U R",
    "algs": [
      "y F' R U2 R' U2 R' F U' R U R U' R' U' R' U R",
      "y2 R' U2 R U R' U R' D R' U R D' R' U' R'",
      "y R' D R2 U' R2 D' R U' R' D R2 U2 R2 D' R",
      "y' R U2 R2 F U' R2 U' R2 U F' U R"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL H - ZBLL H 4 (H1)"
  },
  {
    "id": "zbll_h_zbll_h_5",
    "name": "ZBLL H 5",
    "title": "3x3 - ZBLL H - ZBLL H 5",
    "group": "ZBLL - H - H1",
    "alg": "y2 R' U2 R2 U R2 U R U2 R' F R U R U' R' F'",
    "algs": [
      "y2 R' U2 R2 U R2 U R U2 R' F R U R U' R' F'",
      "R U R' U R U' R' U R U' R2 F' R U R U' R' F R U' R'",
      "R' F' R U R' U' R' F D' R U' R' D R U2 R",
      "y R U2 R' U L' U2 R U2 R' U2 L R U' R'"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL H - ZBLL H 5 (H1)"
  },
  {
    "id": "zbll_h_zbll_h_6",
    "name": "ZBLL H 6",
    "title": "3x3 - ZBLL H - ZBLL H 6",
    "group": "ZBLL - H - H1",
    "alg": "y' R U2 R' U' R U R' U' F' R U R' U' R' F R2 U' R'",
    "algs": [
      "y' R U2 R' U' R U R' U' F' R U R' U' R' F R2 U' R'",
      "y' r U2 R' U' R U' r' U R U2 R' U2 R' F R F'",
      "y R' U2 R U' L U2 R' U2 R U2 L' R' U R",
      "L F L' U' L U L F' D L' U L D' L' U2 L' U'"
    ],
    "moves": 19,
    "desc": "3x3 - ZBLL H - ZBLL H 6 (H1)"
  },
  {
    "id": "zbll_h_zbll_h_7",
    "name": "ZBLL H 7",
    "title": "3x3 - ZBLL H - ZBLL H 7",
    "group": "ZBLL - H - H1",
    "alg": "R U R' U R U' R2 F' R U2 R U2 R' F R U' R'",
    "algs": [
      "R U R' U R U' R2 F' R U2 R U2 R' F R U' R'",
      "y' F R U R' U' R' F' U2 R U R' U R2 U2 R'",
      "y R' D' R U2 R' D R U R U2 R' U R U' R' U' R U' R'",
      "y2 F R U' R' U' R U2 R' U' F' R U2 R' U' R U' R'"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL H - ZBLL H 7 (H1)"
  },
  {
    "id": "zbll_h_zbll_h_8",
    "name": "ZBLL H 8",
    "title": "3x3 - ZBLL H - ZBLL H 8",
    "group": "ZBLL - H - H1",
    "alg": "y2 F R U' R' U R U2 R' U' R U R' U' F'",
    "algs": [
      "y2 F R U' R' U R U2 R' U' R U R' U' F'",
      "y2 f R U R' U' f' R U R' U' R' F R F'"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL H - ZBLL H 8 (H1)"
  },
  {
    "id": "zbll_h_zbll_h_9",
    "name": "ZBLL H 9",
    "title": "3x3 - ZBLL H - ZBLL H 9",
    "group": "ZBLL - H - H1",
    "alg": "R F R2 U' R2 U' R2 U2 R2 U' F' R'",
    "algs": [
      "R F R2 U' R2 U' R2 U2 R2 U' F' R'",
      "y2 F R' F' R2 U2 R' U R U2 R' U R U' R2 F R F'",
      "y' R' U R D' R U R' U2 R U R' U D R' U' R",
      "R' F R U R' U' F' R U' R' U R' F R F' U R"
    ],
    "moves": 12,
    "desc": "3x3 - ZBLL H - ZBLL H 9 (H1)"
  },
  {
    "id": "zbll_h_zbll_h_10",
    "name": "ZBLL H 10",
    "title": "3x3 - ZBLL H - ZBLL H 10",
    "group": "ZBLL - H - H1",
    "alg": "y' R' U2 R U2 R2 F' R U R U' R' F U R",
    "algs": [
      "y' R' U2 R U2 R2 F' R U R U' R' F U R",
      "y L' U2 M' x' D R2 U R2 u' R2 B",
      "y l F l2 U2 F l U2 l2 U' l2 U2 l' U2 l",
      "F' B L2 B' L2 U L2 U L2 U' L2 F"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL H - ZBLL H 10 (H1)"
  },
  {
    "id": "zbll_h_zbll_h_11",
    "name": "ZBLL H 11",
    "title": "3x3 - ZBLL H - ZBLL H 11",
    "group": "ZBLL - H - H1",
    "alg": "y F' R U2 R' U2 R' F R U R U R' U' R U' R'",
    "algs": [
      "y F' R U2 R' U2 R' F R U R U R' U' R U' R'",
      "y2 f R2 S' U' R2 U' R2 U R2 F'",
      "F B' R2 B R2 U' R2 U' R2 U R2 F'",
      "U L U2 L' U2 L2 F L' U' L' U L F' U' L'"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL H - ZBLL H 11 (H1)"
  },
  {
    "id": "zbll_h_zbll_h_12",
    "name": "ZBLL H 12",
    "title": "3x3 - ZBLL H - ZBLL H 12",
    "group": "ZBLL - H - H1",
    "alg": "F U' R U2 R' U2 R U' R' U' R U R' U F'",
    "algs": [
      "F U' R U2 R' U2 R U' R' U' R U R' U F'",
      "y' R D' R U2 R' U2 R U' R' U' R U R' D R'",
      "y f U2 R F R' F' R U2 R U2 R2 U2 f'",
      "L' F' L2 U L2 U L2 U2 L2 U F L"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL H - ZBLL H 12 (H1)"
  },
  {
    "id": "zbll_h_zbll_h_13",
    "name": "ZBLL H 13",
    "title": "3x3 - ZBLL H - ZBLL H 13",
    "group": "ZBLL - H - H2",
    "alg": "y' R' U2 R U R' U' F' R U R' U' R' F R U2 R",
    "algs": [
      "y' R' U2 R U R' U' F' R U R' U' R' F R U2 R",
      "y2 R2 D R' U R D' R2 U R2 D R' U2 R D' R2",
      "y r U R' U R U2 r2 F' r U' L' U L U L F' L' F",
      "L2 D L' U L D' L2 U L2 D L' U2 L D' L2"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL H - ZBLL H 13 (H2)"
  },
  {
    "id": "zbll_h_zbll_h_14",
    "name": "ZBLL H 14",
    "title": "3x3 - ZBLL H - ZBLL H 14",
    "group": "ZBLL - H - H2",
    "alg": "y' R U2 R' U' R2 D R' U R D' R2 U' R U' R'",
    "algs": [
      "y' R U2 R' U' R2 D R' U R D' R2 U' R U' R'",
      "y R' U2 R2 U R D' R U R' D R' U2 R'",
      "y R U' L D' F2 D L' U2 R' U' R2 U2 R",
      "y' L' U2 L2 U L D' L U L' D L' U2 L'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL H - ZBLL H 14 (H2)"
  },
  {
    "id": "zbll_h_zbll_h_15",
    "name": "ZBLL H 15",
    "title": "3x3 - ZBLL H - ZBLL H 15",
    "group": "ZBLL - H - H2",
    "alg": "y2 R2 D' R U' R' D R2 U' R2 D' R U2 R' D R2",
    "algs": [
      "y2 R2 D' R U' R' D R2 U' R2 D' R U2 R' D R2",
      "R' U2 R U R' U R2 y R U' R' U' R U2 R' U' F'",
      "y' R' U L' U' R U2 L U' L' U' L U L' U' L",
      "y L' U R' U' L U2 R U' R' U' R U R' U' R"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL H - ZBLL H 15 (H2)"
  },
  {
    "id": "zbll_h_zbll_h_16",
    "name": "ZBLL H 16",
    "title": "3x3 - ZBLL H - ZBLL H 16",
    "group": "ZBLL - H - H2",
    "alg": "y R' U2 R U R2 D' R U' R' D R2 U R' U R",
    "algs": [
      "y R' U2 R U R2 D' R U' R' D R2 U R' U R",
      "y2 R2 D' R U2 R' D R' U R2 U R2 U2 R'",
      "y' R U2 R2 U' R' D R' U' R D' R U2 R",
      "y L U2 L2 U' L' D L' U' L D' L U2 L"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL H - ZBLL H 16 (H2)"
  },
  {
    "id": "zbll_h_zbll_h_17",
    "name": "ZBLL H 17",
    "title": "3x3 - ZBLL H - ZBLL H 17",
    "group": "ZBLL - H - H2",
    "alg": "F R' F' R U2 R U2 R' U' R' F2 r U r' F R",
    "algs": [
      "F R' F' R U2 R U2 R' U' R' F2 r U r' F R",
      "y2 R U R' U R' U' R2 U' R2 U' L U' R U L'",
      "y R' D' R U R' D R2 U R' U2 R U2 R' U R U2 R'",
      "R' U2 R' D' R2 D2 R' U R D2 R' U R' D R2"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL H - ZBLL H 17 (H2)"
  },
  {
    "id": "zbll_h_zbll_h_18",
    "name": "ZBLL H 18",
    "title": "3x3 - ZBLL H - ZBLL H 18",
    "group": "ZBLL - H - H2",
    "alg": "y2 R' U' R U' R' U F' R U R' U' R' F R2 U' R' U R",
    "algs": [
      "y2 R' U' R U' R' U F' R U R' U' R' F R2 U' R' U R",
      "y2 R' U' R U' R U R2 U R2 U L' U R' U' L",
      "U' R' U' R F D R' U R U' R' U R D' R' U' R F'",
      "R U2 R D R2 D2 R U' R' D2 R U' R D' R2 U"
    ],
    "moves": 19,
    "desc": "3x3 - ZBLL H - ZBLL H 18 (H2)"
  },
  {
    "id": "zbll_h_zbll_h_19",
    "name": "ZBLL H 19",
    "title": "3x3 - ZBLL H - ZBLL H 19",
    "group": "ZBLL - H - H2",
    "alg": "y' F R U' R' U' R U2 R' U' F' U R U R' U R U2 R'",
    "algs": [
      "y' F R U' R' U' R U2 R' U' F' U R U R' U R U2 R'",
      "y' R' U' R f U R U2 R' U2 R' U2 R2 U R' f'",
      "R' U' R D' R U' R' U2 R U2 R U R U' R2 D",
      "y R U R' U' R' U2 R2 D R' U R D' R2 U R2 U2 R'"
    ],
    "moves": 19,
    "desc": "3x3 - ZBLL H - ZBLL H 19 (H2)"
  },
  {
    "id": "zbll_h_zbll_h_20",
    "name": "ZBLL H 20",
    "title": "3x3 - ZBLL H - ZBLL H 20",
    "group": "ZBLL - H - H2",
    "alg": "y R U R' U R U2 R' F R U' R' U' R U2 R' U' F'",
    "algs": [
      "y R U R' U R U2 R' F R U' R' U' R U2 R' U' F'",
      "y2 R2 D' r U2 r' D R' U R2 U R2 U2 R'",
      "y R U' L U L2 R' U2 L U L' U L U L U' L'",
      "y' L U' R U R2 L' U2 R U R' U R U R U' R'"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL H - ZBLL H 20 (H2)"
  },
  {
    "id": "zbll_h_zbll_h_21",
    "name": "ZBLL H 21",
    "title": "3x3 - ZBLL H - ZBLL H 21",
    "group": "ZBLL - H - H2",
    "alg": "R' F' R U2 R U2 R' F U' R U' R'",
    "algs": [
      "R' F' R U2 R U2 R' F U' R U' R'",
      "R' U' R U' R' U' L U' R U L'",
      "R' U' R2 D R' U2 R D' R' U R' U2 R",
      "y2 L' U' L U' L' U' R U' L U R'"
    ],
    "moves": 12,
    "desc": "3x3 - ZBLL H - ZBLL H 21 (H2)"
  },
  {
    "id": "zbll_h_zbll_h_22",
    "name": "ZBLL H 22",
    "title": "3x3 - ZBLL H - ZBLL H 22",
    "group": "ZBLL - H - H2",
    "alg": "R U R' U R U r' F R' F' r",
    "algs": [
      "R U R' U R U r' F R' F' r",
      "R U R' U R U L' U R' U' L",
      "y R' F R U R' U' R' F' R U' R U R' U R",
      "R U R2 D' R U2 R' D R U' R U2 R'"
    ],
    "moves": 11,
    "desc": "3x3 - ZBLL H - ZBLL H 22 (H2)"
  },
  {
    "id": "zbll_h_zbll_h_23",
    "name": "ZBLL H 23",
    "title": "3x3 - ZBLL H - ZBLL H 23",
    "group": "ZBLL - H - H2",
    "alg": "y R' F R' F' R2 U' r' U r U' r' U' r",
    "algs": [
      "y R' F R' F' R2 U' r' U r U' r' U' r",
      "y R U' L' U R2 U' R L U2 R' U' R",
      "y R U R' U R U2 R D' R U' R' D R U R",
      "y l' U R' U' x' R2 U' r' U r U' r' U' r"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL H - ZBLL H 23 (H2)"
  },
  {
    "id": "zbll_h_zbll_h_24",
    "name": "ZBLL H 24",
    "title": "3x3 - ZBLL H - ZBLL H 24",
    "group": "ZBLL - H - H2",
    "alg": "y' R U R2 F R F' r U' r' U r U r'",
    "algs": [
      "y' R U R2 F R F' r U' r' U r U r'",
      "y' l U' R U R' l' U r U' r' U r U r'",
      "y R U2 R' U' R U' R' U L' U R U' L U R'",
      "y' R' U' R U' R' U2 R' D R' U R D' R' U' R'"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL H - ZBLL H 24 (H2)"
  },
  {
    "id": "zbll_h_zbll_h_25",
    "name": "ZBLL H 25",
    "title": "3x3 - ZBLL H - ZBLL H 25",
    "group": "ZBLL - H - H3",
    "alg": "F U' R2 U R U2 R' U R2 U2 R' U' R F'",
    "algs": [
      "F U' R2 U R U2 R' U R2 U2 R' U' R F'",
      "y' R' U' R y U' R U' R' U R l U' R' U l'",
      "F' U' F U' R U' R' U R l U' R' U l'",
      "y2 R' F R' F' R2 U R' U' R U' f R' f'"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL H - ZBLL H 25 (H3)"
  },
  {
    "id": "zbll_h_zbll_h_26",
    "name": "ZBLL H 26",
    "title": "3x3 - ZBLL H - ZBLL H 26",
    "group": "ZBLL - H - H3",
    "alg": "y R U' R2 U' F2 U' R2 U R2 U F2 R2 U R'",
    "algs": [
      "y R U' R2 U' F2 U' R2 U R2 U F2 R2 U R'",
      "y' F R U R' U' R U R' U' F' U R' F' U' F U R",
      "y r U2 R2 F R F' R U2 r' L' U2 L U L' U L",
      "y r U2 R2 F R F' R U2 r' U2 R' U2 R U R' U R"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL H - ZBLL H 26 (H3)"
  },
  {
    "id": "zbll_h_zbll_h_27",
    "name": "ZBLL H 27",
    "title": "3x3 - ZBLL H - ZBLL H 27",
    "group": "ZBLL - H - H3",
    "alg": "y F R U R' U' R U R' U' R U R' U' F'",
    "algs": [
      "y F R U R' U' R U R' U' R U R' U' F'",
      "y F U R U' R' U R U' R' U R U' R' F'",
      "y R' F2 R2 U2 R' F2 R U2 R2 F2 R",
      "y f U R U' R' U R U' R' U R U' R' f'"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL H - ZBLL H 27 (H3)"
  },
  {
    "id": "zbll_h_zbll_h_28",
    "name": "ZBLL H 28",
    "title": "3x3 - ZBLL H - ZBLL H 28",
    "group": "ZBLL - H - H3",
    "alg": "x' U' R U' R' U R' F2 R U' R U R' U x",
    "algs": [
      "x' U' R U' R' U R' F2 R U' R U R' U x",
      "R U' L' U R' U' L R U' L' U R' U' L",
      "F R' F R F' R U2 R' F R' F' R F'",
      "R U' r' F R' F' r R U' r' F R' F' r"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL H - ZBLL H 28 (H3)"
  },
  {
    "id": "zbll_h_zbll_h_29",
    "name": "ZBLL H 29",
    "title": "3x3 - ZBLL H - ZBLL H 29",
    "group": "ZBLL - H - H3",
    "alg": "R' U2 R U R' U R U R' U' R U R' F' R U R' U' R' F R2",
    "algs": [
      "R' U2 R U R' U R U R' U' R U R' F' R U R' U' R' F R2",
      "R' U2 R U R' U R U' r U2 R2 F R F' R U2 r'",
      "L' U L U' L' U' L U R' U' R U L' U' L U2 R' U' R",
      "R U R' U R U2 R2 U2 L U' R U L' U R' U R"
    ],
    "moves": 21,
    "desc": "3x3 - ZBLL H - ZBLL H 29 (H3)"
  },
  {
    "id": "zbll_h_zbll_h_30",
    "name": "ZBLL H 30",
    "title": "3x3 - ZBLL H - ZBLL H 30",
    "group": "ZBLL - H - H3",
    "alg": "R' U' R U' R' U2 R2 U2 L' U R' U' L U' R U' R'",
    "algs": [
      "R' U' R U' R' U2 R2 U2 L' U R' U' L U' R U' R'",
      "R U' R' U R U R' U' L U L' U' R U R' U2 L U L'",
      "R' F2 r2 U' r' F r' F2 R2 U R' U R U2 R'",
      "R U2 R' U' R U' R' U' R U R' L' U2 R U R' U2 L"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL H - ZBLL H 30 (H3)"
  },
  {
    "id": "zbll_h_zbll_h_31",
    "name": "ZBLL H 31",
    "title": "3x3 - ZBLL H - ZBLL H 31",
    "group": "ZBLL - H - H3",
    "alg": "R' U' F' U F R U' F U R U' R' U R U' R' F'",
    "algs": [
      "R' U' F' U F R U' F U R U' R' U R U' R' F'",
      "y' R' U' R U' R' U2 R U R' U' R U R' F' R U R' U' R' F R2",
      "y R U' R2 F2 U' R2 U' R2 U F2 U R2 U R'",
      "y R' U2 R F' r' F r U F U' R' U2 F R F'"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL H - ZBLL H 31 (H3)"
  },
  {
    "id": "zbll_h_zbll_h_32",
    "name": "ZBLL H 32",
    "title": "3x3 - ZBLL H - ZBLL H 32",
    "group": "ZBLL - H - H3",
    "alg": "y' R U R' U y' R' U R U' R2 F R F' R",
    "algs": [
      "y' R U R' U y' R' U R U' R2 F R F' R",
      "F R' U R U2 R2 U' R U2 R' U' R2 U F'",
      "y2 f R f' U R' U R U' R2 F R F' R",
      "y' F U F' U2 L2 U' L2 U' L2 U2 L2 F U' F'"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL H - ZBLL H 32 (H3)"
  },
  {
    "id": "zbll_h_zbll_h_33",
    "name": "ZBLL H 33",
    "title": "3x3 - ZBLL H - ZBLL H 33",
    "group": "ZBLL - H - H4",
    "alg": "R U R' U R U' R' U R U2 R'",
    "algs": [
      "R U R' U R U' R' U R U2 R'",
      "y' f R f' U f R' f' U f R2 f'",
      "y2 L U L' U L U' L' U L U2 L'"
    ],
    "moves": 11,
    "desc": "3x3 - ZBLL H - ZBLL H 33 (H4)"
  },
  {
    "id": "zbll_h_zbll_h_34",
    "name": "ZBLL H 34",
    "title": "3x3 - ZBLL H - ZBLL H 34",
    "group": "ZBLL - H - H4",
    "alg": "R' U' R U' R' U R U' R' U2 R",
    "algs": [
      "R' U' R U' R' U R U' R' U2 R",
      "y2 L' U' L U' L' U L U' L' U2 L"
    ],
    "moves": 11,
    "desc": "3x3 - ZBLL H - ZBLL H 34 (H4)"
  },
  {
    "id": "zbll_h_zbll_h_35",
    "name": "ZBLL H 35",
    "title": "3x3 - ZBLL H - ZBLL H 35",
    "group": "ZBLL - H - H4",
    "alg": "y' R' U2 R U R' U' R U R' U R",
    "algs": [
      "y' R' U2 R U R' U' R U R' U R",
      "y L' U2 L U L' U' L U L' U L"
    ],
    "moves": 12,
    "desc": "3x3 - ZBLL H - ZBLL H 35 (H4)"
  },
  {
    "id": "zbll_h_zbll_h_36",
    "name": "ZBLL H 36",
    "title": "3x3 - ZBLL H - ZBLL H 36",
    "group": "ZBLL - H - H4",
    "alg": "y' R U2 R' U' R U R' U' R U' R'",
    "algs": [
      "y' R U2 R' U' R U R' U' R U' R'",
      "U L U2 L' U' L U L' U' L U' L'"
    ],
    "moves": 12,
    "desc": "3x3 - ZBLL H - ZBLL H 36 (H4)"
  },
  {
    "id": "zbll_h_zbll_h_37",
    "name": "ZBLL H 37",
    "title": "3x3 - ZBLL H - ZBLL H 37",
    "group": "ZBLL - H - H4",
    "alg": "y' R' U2 R U R' U R U R U R' U R U2 R'",
    "algs": [
      "y' R' U2 R U R' U R U R U R' U R U2 R'",
      "y' R U2 R2 U2 R' U2 R U2 R' U2 R2 U2 R",
      "R U R2 U' R2 U R2 U2 R2 U2 R' U R' U R",
      "y R' U R U R' U R U R U R' U R' U' R2 U' R'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL H - ZBLL H 37 (H4)"
  },
  {
    "id": "zbll_h_zbll_h_38",
    "name": "ZBLL H 38",
    "title": "3x3 - ZBLL H - ZBLL H 38",
    "group": "ZBLL - H - H4",
    "alg": "y R U2 R' U' R U' R' U' R' U' R U' R' U2 R",
    "algs": [
      "y R U2 R' U' R U' R' U' R' U' R U' R' U2 R",
      "y R U2 R' U' R U' R' U r' F' r U' r' F2 r",
      "r R U2 r' R U2 R' l' U2 y U' R2 U' R2 U' R2 U' R2 U",
      "R L F2 L' R U2 R2 F U2 y' R' U2 R' U2 R' U2 R"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL H - ZBLL H 38 (H4)"
  },
  {
    "id": "zbll_h_zbll_h_39",
    "name": "ZBLL H 39",
    "title": "3x3 - ZBLL H - ZBLL H 39",
    "group": "ZBLL - H - H4",
    "alg": "R U R' U R U2 R' U' R' U2 R U R' U R",
    "algs": [
      "R U R' U R U2 R' U' R' U2 R U R' U R",
      "y2 R' U' R U' R' U2 R U R U2 R' U' R U' R'",
      "R' U' R U' R' U2 R U R U2 R' U' R U' R'",
      "R' U' R' r2 U' R' U R' r2 U' r' U2 r"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL H - ZBLL H 39 (H4)"
  },
  {
    "id": "zbll_h_zbll_h_40",
    "name": "ZBLL H 40",
    "title": "3x3 - ZBLL H - ZBLL H 40",
    "group": "ZBLL - H - H4",
    "alg": "R U R' U R U' R' U R U' R' U R' U' R2 U' R' U R' U R",
    "algs": [
      "R U R' U R U' R' U R U' R' U R' U' R2 U' R' U R' U R",
      "F U R' F R F' R U' R' U R' F R F' R U' R' F'",
      "R U R' U R U' R' U R2 U R U R U' R' U' R' U R'",
      "R' F R U R' F R U' R' F' R U' R' F R U R' F R U' R' F' R"
    ],
    "moves": 21,
    "desc": "3x3 - ZBLL H - ZBLL H 40 (H4)"
  },
  {
    "id": "zbll_pi_zbll_pi_1",
    "name": "ZBLL Pi 1",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 1",
    "group": "ZBLL - Pi - Pi 1",
    "alg": "y' R U R' U R U2 R2 F' r U R U' r' F",
    "algs": [
      "y' R U R' U R U2 R2 F' r U R U' r' F",
      "y' R U R' U R U2 R2 U' R' F R U R U' R' F' R",
      "y F U R U2 R' U R U R' F' R U R' U R U2 R'",
      "y2 R U2 R' U' R U' R' U r U R' U' r' F R F'"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 1 (Pi 1)"
  },
  {
    "id": "zbll_pi_zbll_pi_2",
    "name": "ZBLL Pi 2",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 2",
    "group": "ZBLL - Pi - Pi 1",
    "alg": "y' r' F' r U' r' F2 r2 U R' U' r' F R F'",
    "algs": [
      "y' r' F' r U' r' F2 r2 U R' U' r' F R F'",
      "y R' U' R U' R' U2 R U' R U R D R' U' R D' R2",
      "R U2 R' U L' U2 R U R' U' R U' R' L",
      "y' L' U' L U' L' U2 L r U R' U' r' F R F'"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 2 (Pi 1)"
  },
  {
    "id": "zbll_pi_zbll_pi_3",
    "name": "ZBLL Pi 3",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 3",
    "group": "ZBLL - Pi - Pi 1",
    "alg": "F R U' R' U R U R2 F' R U2 R U' R' U R U2 R' U'",
    "algs": [
      "F R U' R' U R U R2 F' R U2 R U' R' U R U2 R' U'",
      "y2 R' U' R' D' R U R' D R3 U R' U R U2 R'",
      "y2 R' U' R' D' R U R' D R' U R' U R U2 R'",
      "S R U R U' R' F U R' U' R U R' U' f'"
    ],
    "moves": 19,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 3 (Pi 1)"
  },
  {
    "id": "zbll_pi_zbll_pi_4",
    "name": "ZBLL Pi 4",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 4",
    "group": "ZBLL - Pi - Pi 1",
    "alg": "y2 R U R D R' U' R D' R U' R U' R' U2 R",
    "algs": [
      "y2 R U R D R' U' R D' R U' R U' R' U2 R",
      "y' R' U' F U' R2 U R2 U F' R2 U2 R'",
      "y' R' D R2 U2 R2 D' R U R' D R2 U R2 D' R",
      "y2 R U R D R' U' R D' R3' U' R U' R' U2 R"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 4 (Pi 1)"
  },
  {
    "id": "zbll_pi_zbll_pi_5",
    "name": "ZBLL Pi 5",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 5",
    "group": "ZBLL - Pi - Pi 1",
    "alg": "F R' F' R U2 R U2 R' U' r U R' U R U2 r'",
    "algs": [
      "F R' F' R U2 R U2 R' U' r U R' U R U2 r'",
      "R U R' U R' F R F' R' U' F' U F R2 U' R'",
      "y R U R2 F' R U R U' R' F U R U' R' U R U2 R'",
      "y R U R2 D' R U R' D R2 U2 R' U R U R' U R U2 R'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 5 (Pi 1)"
  },
  {
    "id": "zbll_pi_zbll_pi_6",
    "name": "ZBLL Pi 6",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 6",
    "group": "ZBLL - Pi - Pi 1",
    "alg": "F R U R' U' R' F' R U2 R' U' R2 U' R2 U2 R",
    "algs": [
      "F R U R' U' R' F' R U2 R' U' R2 U' R2 U2 R",
      "y R' U2 R' D' R U R' D F' R U R U' R' F R U'",
      "y R2 F2 r U r' F R2 U2 x' U' R U l'",
      "y' R U L' R' U2 R U2 R' U2 L U' R U2 R'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 6 (Pi 1)"
  },
  {
    "id": "zbll_pi_zbll_pi_7",
    "name": "ZBLL Pi 7",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 7",
    "group": "ZBLL - Pi - Pi 1",
    "alg": "R2 F R U R U' R' F' R U' R' U' R U R' U R",
    "algs": [
      "R2 F R U R U' R' F' R U' R' U' R U R' U R",
      "y R U2 R2 U' R U' R' U2 F R U R U' R' F'",
      "y' R U R' U R U2 R' F U R U2 R' U R U R' F'",
      "R U2 R2 U' R' D R' U' R D2 L F2 L' D R2"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 7 (Pi 1)"
  },
  {
    "id": "zbll_pi_zbll_pi_8",
    "name": "ZBLL Pi 8",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 8",
    "group": "ZBLL - Pi - Pi 1",
    "alg": "y F U R U' R' U R U2 R' U' R U R' F'",
    "algs": [
      "y F U R U' R' U R U2 R' U' R U R' F'",
      "R' U R U R' U R U' R2 D' R U' R' D R U' R",
      "R U y R U' R' U R U2 R' U' R U R' F'",
      "U R' U2 R2 F' R2 F R2 U2 R' U2 F' R F U2 R2 U'"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 8 (Pi 1)"
  },
  {
    "id": "zbll_pi_zbll_pi_9",
    "name": "ZBLL Pi 9",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 9",
    "group": "ZBLL - Pi - Pi 1",
    "alg": "y' R U R' U R U' R' U' R' F' R U2 R U2 R' F",
    "algs": [
      "y' R U R' U R U' R' U' R' F' R U2 R U2 R' F",
      "y F R2 U' R2 U R2 U S R2 f'",
      "R U R' U L' U2 R U R' U2 L R U2 R'",
      "y F R2 U' R2 U R2 U F' B U2 B'"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 9 (Pi 1)"
  },
  {
    "id": "zbll_pi_zbll_pi_10",
    "name": "ZBLL Pi 10",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 10",
    "group": "ZBLL - Pi - Pi 1",
    "alg": "y' F U' R U' R' U R U R' U2 R U2 R' U F'",
    "algs": [
      "y' F U' R U' R' U R U R' U2 R U2 R' U F'",
      "y R' B' U' R2 U2 R2 U' R2 U' R2 B R",
      "y R' F' R U R U' R' F U R2 U R2 U R U' R U' R2",
      "R U' L U' R' U L' U' R' U' R2 U' R2 U2 R"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 10 (Pi 1)"
  },
  {
    "id": "zbll_pi_zbll_pi_11",
    "name": "ZBLL Pi 11",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 11",
    "group": "ZBLL - Pi - Pi 1",
    "alg": "y' R F U R2 U2 R2 U R2 U R2 F' R'",
    "algs": [
      "y' R F U R2 U2 R2 U R2 U R2 F' R'",
      "y R2 D' R U' R' D R U R' D' R U R' D R U R U' R' U' R",
      "y2 R' U R U' D' R U' R' U2 R U' R' D R' U' R",
      "y L U L2 R U2 L2 U L2 U L2 U R' U' L'"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 11 (Pi 1)"
  },
  {
    "id": "zbll_pi_zbll_pi_12",
    "name": "ZBLL Pi 12",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 12",
    "group": "ZBLL - Pi - Pi 1",
    "alg": "R' U' F' R U R' U' R' F R2 U2 R' U2 R",
    "algs": [
      "R' U' F' R U R' U' R' F R2 U2 R' U2 R",
      "R' U' R U' L U2 R' U' L' U2 L R U2 L'",
      "y' B' R2 U R2 U' R2 U' S R2 F z'"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 12 (Pi 1)"
  },
  {
    "id": "zbll_pi_zbll_pi_13",
    "name": "ZBLL Pi 13",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 13",
    "group": "ZBLL - Pi - Pi 2",
    "alg": "y R2 D' R U2 R' D R2 U R2 D' R U R' D R2",
    "algs": [
      "y R2 D' R U2 R' D R2 U R2 D' R U R' D R2",
      "y R2 U' R2 F U R2 U' R2 F' U' R2 U R2",
      "y2 R' U R U' R' U R U R' U2 L' U R U' L",
      "L' U L U' L' U L U L' U2 R' U L U' R"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 13 (Pi 2)"
  },
  {
    "id": "zbll_pi_zbll_pi_14",
    "name": "ZBLL Pi 14",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 14",
    "group": "ZBLL - Pi - Pi 2",
    "alg": "y' R2 D R' U2 R D' R2 U' R2 D R' U' R D' R2",
    "algs": [
      "y' R2 D R' U2 R D' R2 U' R2 D R' U' R D' R2",
      "y' R2 U R2 B' U' R2 U R2 B U R2 U' R2",
      "R' U2 R2 U R2 U R2 U' R' U' R' F R2 U' R' U' R U R' F'",
      "L U2 R' U L' U L U' L' U' L U' R U2 L'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 14 (Pi 2)"
  },
  {
    "id": "zbll_pi_zbll_pi_15",
    "name": "ZBLL Pi 15",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 15",
    "group": "ZBLL - Pi - Pi 2",
    "alg": "R' U' R U' R2 D' R U R' D R2 U' R' U2 R",
    "algs": [
      "R' U' R U' R2 D' R U R' D R2 U' R' U2 R",
      "R' U2 R' D R' U R D' R U R2 U2 R'",
      "y2 L' U2 L' D L' U L D' L U L2 U2 L' U2"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 15 (Pi 2)"
  },
  {
    "id": "zbll_pi_zbll_pi_16",
    "name": "ZBLL Pi 16",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 16",
    "group": "ZBLL - Pi - Pi 2",
    "alg": "R U R' U R2 D R' U' R D' R2 U R U2 R'",
    "algs": [
      "R U R' U R2 D R' U' R D' R2 U R U2 R'",
      "R U2 R D' R U' R' D R' U' R2 U2 R",
      "y2 L U L' U L2 D L' U' L D' L2 U L U2 L'"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 16 (Pi 2)"
  },
  {
    "id": "zbll_pi_zbll_pi_17",
    "name": "ZBLL Pi 17",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 17",
    "group": "ZBLL - Pi - Pi 2",
    "alg": "R' U' R U R2 F' R U R U' R' F U' R U R' U R",
    "algs": [
      "R' U' R U R2 F' R U R U' R' F U' R U R' U R",
      "R' U' R U' R' U2 R U' R' U' R U' R2 D' R U2 R' D R2",
      "R U2 R2 U' R2 U' R' U R' U2 L U' R U L'",
      "y' R' U2 R U R' U2 R U2 R' U R2 D R' U R D' R'"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 17 (Pi 2)"
  },
  {
    "id": "zbll_pi_zbll_pi_18",
    "name": "ZBLL Pi 18",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 18",
    "group": "ZBLL - Pi - Pi 2",
    "alg": "y R U2 R' U' R U2 R' U2 R U' R2 D' R U' R' D R",
    "algs": [
      "y R U2 R' U' R U2 R' U2 R U' R2 D' R U' R' D R",
      "y' R' U' F' R U2 R' U' R U' R' F U R U R' U2 R",
      "R' U2 R2 U R2 U R U' R U2 L' U R' U' L",
      "y R' U' R U' R U R2 U R F' R U2 R' U2 R' F R"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 18 (Pi 2)"
  },
  {
    "id": "zbll_pi_zbll_pi_19",
    "name": "ZBLL Pi 19",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 19",
    "group": "ZBLL - Pi - Pi 2",
    "alg": "y' F U R U2 R' U R U R' F' R U2 R' U' R U' R'",
    "algs": [
      "y' F U R U2 R' U R U R' F' R U2 R' U' R U' R'",
      "y' R2 D R' U R D' R2 U R U2 R2 U' R U' R' U2 R",
      "y R U2 R2 U' R2 U' R D' r U2 r' D R2",
      "y R' U' R U' R' U2 R2 U R' U' R' F' R U2 R U2 R' F"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 19 (Pi 2)"
  },
  {
    "id": "zbll_pi_zbll_pi_20",
    "name": "ZBLL Pi 20",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 20",
    "group": "ZBLL - Pi - Pi 2",
    "alg": "y2 R U2 R' U' R U' R' U' F U R U2 R' U R U R' F'",
    "algs": [
      "y2 R U2 R' U' R U' R' U' F U R U2 R' U R U R' F'",
      "y2 R U2 R' U' R U r' F2 r U2 R' U' r' F r",
      "L' U2 L U L' U' R U2 R' U2 L U R U' R'",
      "R2 U R' U' R' U2 R' U2 R U R' D R' U R D'"
    ],
    "moves": 19,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 20 (Pi 2)"
  },
  {
    "id": "zbll_pi_zbll_pi_21",
    "name": "ZBLL Pi 21",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 21",
    "group": "ZBLL - Pi - Pi 2",
    "alg": "y2 L' U R U' L U' R' U' R U' R'",
    "algs": [
      "y2 L' U R U' L U' R' U' R U' R'",
      "y' R U2 R' U R' D' R U2 R' D R2 U' R'",
      "y R' U' R U' R' U R' F R U R U' R' F' R",
      "R' U L U' R U' L' U' L U' L'"
    ],
    "moves": 12,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 21 (Pi 2)"
  },
  {
    "id": "zbll_pi_zbll_pi_22",
    "name": "ZBLL Pi 22",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 22",
    "group": "ZBLL - Pi - Pi 2",
    "alg": "r' U r U r' U' r U R2 F R F' R",
    "algs": [
      "r' U r U r' U' r U R2 F R F' R",
      "r' U r U r' U' r U l' R' U R U' R",
      "R' U' R' D' R U R' D R' U2 R' U' R U' R'",
      "y2 L' U R U' L U R' U' R' U' R U' R' U2 R"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 22 (Pi 2)"
  },
  {
    "id": "zbll_pi_zbll_pi_23",
    "name": "ZBLL Pi 23",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 23",
    "group": "ZBLL - Pi - Pi 2",
    "alg": "r U' r' U' r U r' U' R2 B' R' B R' U",
    "algs": [
      "r U' r' U' r U r' U' R2 B' R' B R' U",
      "r U' r' U' r U r' U' l R U' R' U l'",
      "r U' r' U' r U r' F R' F' R2 U' R'",
      "R U R D R' U' R D' R U2 R U R' U R"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 23 (Pi 2)"
  },
  {
    "id": "zbll_pi_zbll_pi_24",
    "name": "ZBLL Pi 24",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 24",
    "group": "ZBLL - Pi - Pi 2",
    "alg": "y' R U R' U F' R U2 R' U2 R' F R",
    "algs": [
      "y' R U R' U F' R U2 R' U2 R' F R",
      "R U' L' U R' U L U L' U L",
      "l F' r' x F l' U L U L' U L",
      "R U' r' F R' F r U r' F r"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 24 (Pi 2)"
  },
  {
    "id": "zbll_pi_zbll_pi_25",
    "name": "ZBLL Pi 25",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 25",
    "group": "ZBLL - Pi - Pi 3",
    "alg": "R' U' R' D' R U' R' D R2 U R' U' R U R' U R",
    "algs": [
      "R' U' R' D' R U' R' D R2 U R' U' R U R' U R",
      "R' U2 R U R' U' R U2 L U' R' U R L'",
      "R' U2 R U R' U' R U F R' U R U' F'",
      "y2 L' U2 L U L' U' L U2 R U' L' U M' x'"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 25 (Pi 3)"
  },
  {
    "id": "zbll_pi_zbll_pi_26",
    "name": "ZBLL Pi 26",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 26",
    "group": "ZBLL - Pi - Pi 3",
    "alg": "R U' R' U' R U' R' U R U R' U R' F' R U R U' R' F",
    "algs": [
      "R U' R' U' R U' R' U R U R' U R' F' R U R U' R' F",
      "y R2 F R U R U' R' F' R U2 R U R2 U R2 U2 R'",
      "y' R U2 R' U L U' R' U' R2 U' R2 U2 R L'",
      "y' R U2 R F2 R2 U' R U' R' U R2 F2 R2"
    ],
    "moves": 20,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 26 (Pi 3)"
  },
  {
    "id": "zbll_pi_zbll_pi_27",
    "name": "ZBLL Pi 27",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 27",
    "group": "ZBLL - Pi - Pi 3",
    "alg": "y R U R' U R U' R' U R2 D R' U' R D' R' U' R'",
    "algs": [
      "y R U R' U R U' R' U R2 D R' U' R D' R' U' R'",
      "y L' R U R' U' L U2 R U' R' U R U2 R'",
      "y M F R' F' r U2 R U' R' U R U2 R'",
      "F' U' L U L' F U L U' L' U L U2 L' U"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 27 (Pi 3)"
  },
  {
    "id": "zbll_pi_zbll_pi_28",
    "name": "ZBLL Pi 28",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 28",
    "group": "ZBLL - Pi - Pi 3",
    "alg": "y2 R' U2 R U R' U' R U R2 F R U R U' R' F' R",
    "algs": [
      "y2 R' U2 R U R' U' R U R2 F R U R U' R' F' R",
      "L' R U2 R2 U' R2 U' R' U' L U R' U2 R",
      "y R2 B2 R2 U R' U' R U' R2 B2 R U2 R",
      "y F' U R' F U' R' F' R2 F2 R' F' U R"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 28 (Pi 3)"
  },
  {
    "id": "zbll_pi_zbll_pi_29",
    "name": "ZBLL Pi 29",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 29",
    "group": "ZBLL - Pi - Pi 3",
    "alg": "R U' L' U R' U' L U' R U' L' U R' U' L",
    "algs": [
      "R U' L' U R' U' L U' R U' L' U R' U' L",
      "y F U R U2 R' U2 R U R2 F' R U2 R U2 R'",
      "L U' R U R' L' U2 R U2 R' U R U2 R'",
      "L' U2 R U' L U' R' U' R U2 L' U M' x'"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 29 (Pi 3)"
  },
  {
    "id": "zbll_pi_zbll_pi_30",
    "name": "ZBLL Pi 30",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 30",
    "group": "ZBLL - Pi - Pi 3",
    "alg": "y F U R U' R' U R U' R2 F' R U R U' R'",
    "algs": [
      "y F U R U' R' U R U' R2 F' R U R U' R'",
      "y' R U' R U2 R U2 R2 U R' F2 R' U R' U' R2 F2",
      "R U R' U R' F R2 U' R' U' R U R' F' U R U' R'",
      "y2 L' U' L U L F' L2 U' L U L' U' L U F"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 30 (Pi 3)"
  },
  {
    "id": "zbll_pi_zbll_pi_31",
    "name": "ZBLL Pi 31",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 31",
    "group": "ZBLL - Pi - Pi 3",
    "alg": "F U R U' R2 F' R2 U R' F' U' F U2 R U' R'",
    "algs": [
      "F U R U' R2 F' R2 U R' F' U' F U2 R U' R'",
      "y R U R' U' R U R2 D' R U R' D R U R U' R' U R U2 R'",
      "F U' R2 U R U' R' U R2 U2 R' U' R' U R U' R F'",
      "y R U R' U R U2 R' U' R U R' U R2 D R' U2 R D' R2"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 31 (Pi 3)"
  },
  {
    "id": "zbll_pi_zbll_pi_32",
    "name": "ZBLL Pi 32",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 32",
    "group": "ZBLL - Pi - Pi 3",
    "alg": "y' R U R' U R U' R2 F R F' R U' R' F' U F",
    "algs": [
      "y' R U R' U R U' R2 F R F' R U' R' F' U F",
      "f R U R2 D' R U' R' D R S' R U R' U' F'",
      "y' F' U' L' U L S' L D L' U' L D' L2 U L f U2",
      "y2 R' D' R U R' D R U2 R U2 R' U R U' R' U' R U' R'"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 32 (Pi 3)"
  },
  {
    "id": "zbll_pi_zbll_pi_33",
    "name": "ZBLL Pi 33",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 33",
    "group": "ZBLL - Pi - Pi 3",
    "alg": "y R' U' R U' B2 R' U2 R U2 l U2 l'",
    "algs": [
      "y R' U' R U' B2 R' U2 R U2 l U2 l'",
      "y r' F R F' r U R' U R U2 R' U' R U' R'",
      "y R' F R F' r U R' U R U2 r' U' R U' R'",
      "y' L' U' L U' F2 L' U2 L U2 L F2 L'"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 33 (Pi 3)"
  },
  {
    "id": "zbll_pi_zbll_pi_34",
    "name": "ZBLL Pi 34",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 34",
    "group": "ZBLL - Pi - Pi 3",
    "alg": "y' R' U' R U' R' U R U' R' U R' D' R U R' D R2",
    "algs": [
      "y' R' U' R U' R' U R U' R' U R' D' R U R' D R2",
      "y L' U R U' L U R2 U' R U' R' U2 R",
      "y R B2 R' U R2 B2 R' U' R' U' R2 B2 R2"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 34 (Pi 3)"
  },
  {
    "id": "zbll_pi_zbll_pi_35",
    "name": "ZBLL Pi 35",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 35",
    "group": "ZBLL - Pi - Pi 3",
    "alg": "y2 R2 D R' U R D' R' U R' U' R U R' U' R U' R'",
    "algs": [
      "y2 R2 D R' U R D' R' U R' U' R U R' U' R U' R'",
      "y R U2 R' U' R U' R2 U r f' U f r'",
      "y' L U2 L' U' L U' L2 U l F' L F l'",
      "y R U2 R' U' R U' R' U2 r' F R F' r U R'"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 35 (Pi 3)"
  },
  {
    "id": "zbll_pi_zbll_pi_36",
    "name": "ZBLL Pi 36",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 36",
    "group": "ZBLL - Pi - Pi 3",
    "alg": "R' U' R U' R' U2 R U' L' U R U' L U R'",
    "algs": [
      "R' U' R U' R' U2 R U' L' U R U' L U R'",
      "R' F2 R U2 R U2 R' F2 U' R U' R'",
      "y2 L' U' L U' L' U2 L U L' U R U' L U R'"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 36 (Pi 3)"
  },
  {
    "id": "zbll_pi_zbll_pi_37",
    "name": "ZBLL Pi 37",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 37",
    "group": "ZBLL - Pi - Pi 4",
    "alg": "R' F R U R' U' R' F' R2 U' R' U R U' R' U2 R",
    "algs": [
      "R' F R U R' U' R' F' R2 U' R' U R U' R' U2 R",
      "y' R U R' U R2 F2 R' U2 R' U2 R2 F2 R2",
      "y F' R U R' U R U' R' U' R' F R U' R U' R' U R U R'",
      "y R' U' F R F2 R2 F R U F' R U' F"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 37 (Pi 4)"
  },
  {
    "id": "zbll_pi_zbll_pi_38",
    "name": "ZBLL Pi 38",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 38",
    "group": "ZBLL - Pi - Pi 4",
    "alg": "R U R D R' U R D' R2 U' R U R' U' R U' R'",
    "algs": [
      "R U R D R' U R D' R2 U' R U R' U' R U' R'",
      "R U2 R' U' R U R' U2 r' F R F' M'",
      "R U2 R' U' R U R' U2 L' U R U' M' x'"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 38 (Pi 4)"
  },
  {
    "id": "zbll_pi_zbll_pi_39",
    "name": "ZBLL Pi 39",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 39",
    "group": "ZBLL - Pi - Pi 4",
    "alg": "R U2 R2 U' R2 U' R' U2 R' F R U R' U' R' F' R2",
    "algs": [
      "R U2 R2 U' R2 U' R' U2 R' F R U R' U' R' F' R2",
      "y' R2 F2 R2 U' R U R' U R2 F2 R' U2 R'",
      "y F' R U R' U' R' F R U' R U' R' U' R U R' U R U R'",
      "R' U2 R U R U2 R' U2 R' F' R U2 R U2 R' F R' U R"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 39 (Pi 4)"
  },
  {
    "id": "zbll_pi_zbll_pi_40",
    "name": "ZBLL Pi 40",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 40",
    "group": "ZBLL - Pi - Pi 4",
    "alg": "y' R' U' R U' R' U R U' R2 D' R U R' D R U R",
    "algs": [
      "y' R' U' R U' R' U R U' R2 D' R U R' D R U R",
      "y2 F U R' U' R F' U' R' U R U' R' U2 R",
      "y' R' U R' F R2 U R' U' R U R' U' F' R U2 R' U R",
      "y' R' U' R U' R' U R U2 R D R' U R D' R2 U2 R"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 40 (Pi 4)"
  },
  {
    "id": "zbll_pi_zbll_pi_41",
    "name": "ZBLL Pi 41",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 41",
    "group": "ZBLL - Pi - Pi 4",
    "alg": "R U R' U' R' F R2 U R' U' R U R' U' F'",
    "algs": [
      "R U R' U' R' F R2 U R' U' R U R' U' F'",
      "R U R' U' l' U R2 x' U R' U' R U R' U' F'"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 41 (Pi 4)"
  },
  {
    "id": "zbll_pi_zbll_pi_42",
    "name": "ZBLL Pi 42",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 42",
    "group": "ZBLL - Pi - Pi 4",
    "alg": "y2 R U2 R' U2 R' F R2 U' R' U2 R U2 R' U' F'",
    "algs": [
      "y2 R U2 R' U2 R' F R2 U' R' U2 R U2 R' U' F'",
      "y2 R' U' R' D' R U' D R' D' R U2 R' D R D' R' D R2",
      "y2 R U2 R' U2 l' U R' z' R' U' R U' r'",
      "y2 R U2 R' U2 R' F R2 l U' R' U R' D' x"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 42 (Pi 4)"
  },
  {
    "id": "zbll_pi_zbll_pi_43",
    "name": "ZBLL Pi 43",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 43",
    "group": "ZBLL - Pi - Pi 4",
    "alg": "y R U2 R' U' R U R' U' R' D' R U' R' D R2 U' R' U R U' R'",
    "algs": [
      "y R U2 R' U' R U R' U' R' D' R U' R' D R2 U' R' U R U' R'",
      "R U2 R' U R2 D R' U2 R D' R2 U' R U2 R' U' R U R'",
      "y R' U2 R U' D' R2 D R2 U' R' D' R D R' U R2",
      "y' R U R' U R2 F2 U R U R2 U' R' U' F2 R2"
    ],
    "moves": 22,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 43 (Pi 4)"
  },
  {
    "id": "zbll_pi_zbll_pi_44",
    "name": "ZBLL Pi 44",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 44",
    "group": "ZBLL - Pi - Pi 4",
    "alg": "r' F' r U r U2 r' F2 U' R U R' U' R U' R'",
    "algs": [
      "r' F' r U r U2 r' F2 U' R U R' U' R U' R'",
      "y' F U R U' R' S R' D' R U R' D R2 U' R' f'",
      "y2 R U R' U R U R' U' R U2 R' U2 R' D' R U' R' D R",
      "U' F' U' F R U R' F R' F' R2 U R' U' R U' R'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 44 (Pi 4)"
  },
  {
    "id": "zbll_pi_zbll_pi_45",
    "name": "ZBLL Pi 45",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 45",
    "group": "ZBLL - Pi - Pi 4",
    "alg": "R U R' U R U2 R' U' R U' L' U R' U' L",
    "algs": [
      "R U R' U R U2 R' U' R U' L' U R' U' L",
      "R B2 R' U2 R' U2 R B2 U R' U R",
      "y2 R U2 R' U2 R' F2 R F2 U L' U L",
      "l U2 l' U2 R' U2 R B2 U R' U R"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 45 (Pi 4)"
  },
  {
    "id": "zbll_pi_zbll_pi_46",
    "name": "ZBLL Pi 46",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 46",
    "group": "ZBLL - Pi - Pi 4",
    "alg": "y' R' U2 R U R' U R2 U' r' F R' F' r",
    "algs": [
      "y' R' U2 R U R' U R2 U' r' F R' F' r",
      "y' R' U2 R U R' U R2 U' L' U R' U' L",
      "y2 R2 D' R U' R' D R U' R U R' U' R U R' U R",
      "y' R2 B2 R2 U R U R B2 R2 U' R B2 R'"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 46 (Pi 4)"
  },
  {
    "id": "zbll_pi_zbll_pi_47",
    "name": "ZBLL Pi 47",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 47",
    "group": "ZBLL - Pi - Pi 4",
    "alg": "y R U R' U R U' R' U R U' R D R' U' R D' R2",
    "algs": [
      "y R U R' U R U' R' U R U' R D R' U' R D' R2",
      "y' L U' R' U L' U' R2 U R' U R U2 R'",
      "y' R' F2 R U' R2 F2 R U R U R2 F2 R2",
      "y R U' L' U R' U' L U2 R U R' U R U2 R'"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 47 (Pi 4)"
  },
  {
    "id": "zbll_pi_zbll_pi_48",
    "name": "ZBLL Pi 48",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 48",
    "group": "ZBLL - Pi - Pi 4",
    "alg": "y' R U R' U F2 R U2 R' U2 R' F2 R",
    "algs": [
      "y' R U R' U F2 R U2 R' U2 R' F2 R",
      "y2 R U R' U R U' R' U R' D' R U2 R' D R2 U' R' U2 R U2 R'",
      "U' R U R' F' R U' r' F R' F r U F",
      "y R U' L' U R' U' L U R' U2 R U R' U R"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 48 (Pi 4)"
  },
  {
    "id": "zbll_pi_zbll_pi_49",
    "name": "ZBLL Pi 49",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 49",
    "group": "ZBLL - Pi - Pi 5",
    "alg": "y R U2 R' U2 R' U' F U R2 U' R' U R U' R' F'",
    "algs": [
      "y R U2 R' U2 R' U' F U R2 U' R' U R U' R' F'",
      "R U D' R U R' D R2 U' R' U' R2 U2 R",
      "y2 R' U2 R U' R D R' U' R D' R2 U R U' R' U R",
      "y2 R F' U' R2 U' F U F' R2 U F R'"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 49 (Pi 5)"
  },
  {
    "id": "zbll_pi_zbll_pi_50",
    "name": "ZBLL Pi 50",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 50",
    "group": "ZBLL - Pi - Pi 5",
    "alg": "y' R U R' F' R U R' U R U2 R' F U R U2 R'",
    "algs": [
      "y' R U R' F' R U R' U R U2 R' F U R U2 R'",
      "R' F' U' F U' R U S' R' U R S",
      "r' U' R U' R' U R U' R' U R' F R F' U r",
      "y2 S' R U R' S U R U' B U' B' R'"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 50 (Pi 5)"
  },
  {
    "id": "zbll_pi_zbll_pi_51",
    "name": "ZBLL Pi 51",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 51",
    "group": "ZBLL - Pi - Pi 5",
    "alg": "y2 R F U' R2 U2 R U R' U R2 U F' R'",
    "algs": [
      "y2 R F U' R2 U2 R U R' U R2 U F' R'",
      "y2 R2 D R' U2 R D' R' U' R' U R2 D R' U2 R D' R2",
      "S' R U R' S R U' R2 F' U' F U' R U R' U R",
      "R2 D' R U2 R' D R2 U R' U' R' D' R U2 R' D R2"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 51 (Pi 5)"
  },
  {
    "id": "zbll_pi_zbll_pi_52",
    "name": "ZBLL Pi 52",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 52",
    "group": "ZBLL - Pi - Pi 5",
    "alg": "y R U R' U' R U R2 D' R U' R' D R U' R U2 R'",
    "algs": [
      "y R U R' U' R U R2 D' R U' R' D R U' R U2 R'",
      "R' U R U F R' U R U' F' U' R' U' R",
      "F' L' U' L U L' U' L2 U F U' L' U2 L' U2 L",
      "y' R U2 R2 U' R' U' R2 D R' U R U D' R"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 52 (Pi 5)"
  },
  {
    "id": "zbll_pi_zbll_pi_53",
    "name": "ZBLL Pi 53",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 53",
    "group": "ZBLL - Pi - Pi 5",
    "alg": "F U R' U' R2 U' R2 U2 R U2 R U R' F'",
    "algs": [
      "F U R' U' R2 U' R2 U2 R U2 R U R' F'",
      "y2 R U' R2 D' R U2 R' D U2 R2 U R2 U R",
      "F U R' U' R2 U' R2 U2 R F' L' U L",
      "y' R' U' R' F R F' R U' R' U2 R S R' F' R S' R' F R U' M' U2 M"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 53 (Pi 5)"
  },
  {
    "id": "zbll_pi_zbll_pi_54",
    "name": "ZBLL Pi 54",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 54",
    "group": "ZBLL - Pi - Pi 5",
    "alg": "R U2 R2 F R F' R' F R F' R' F R F' R U2 R'",
    "algs": [
      "R U2 R2 F R F' R' F R F' R' F R F' R U2 R'",
      "y R' U' R' D' R U R' D R U2 R' D' R U2 R' D R2",
      "y R2 D' R U2 R' D R U2 R' D' R U' R' D R U R",
      "y' R' F2 D R U2 R' D' R2 U2 R' F2 R U2 R'"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 54 (Pi 5)"
  },
  {
    "id": "zbll_pi_zbll_pi_55",
    "name": "ZBLL Pi 55",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 55",
    "group": "ZBLL - Pi - Pi 5",
    "alg": "R2 D R' U' R D' R' U' R' U R U' R' U' R U' R'",
    "algs": [
      "R2 D R' U' R D' R' U' R' U R U' R' U' R U' R'",
      "R U R' U L' U2 R U2 R' U2 L U' R U' R'",
      "y2 R U R' U R U R' U' R U R D R' U R D' R2",
      "y2 L2 D L' U' L D' L' U' L' U L U' L' U' L U' L'"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 55 (Pi 5)"
  },
  {
    "id": "zbll_pi_zbll_pi_56",
    "name": "ZBLL Pi 56",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 56",
    "group": "ZBLL - Pi - Pi 5",
    "alg": "R2 D' R U R' D R U R U' R' U R U R' U R",
    "algs": [
      "R2 D' R U R' D R U R U' R' U R U R' U R",
      "R' U' R U2 F U' R' U2 R U F' U2 R' U R",
      "L U L' U R' U L U R U R' U M x",
      "y2 R' U' R U' R' U' R U R' U' R' D' R U' R' D R2"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 56 (Pi 5)"
  },
  {
    "id": "zbll_pi_zbll_pi_57",
    "name": "ZBLL Pi 57",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 57",
    "group": "ZBLL - Pi - Pi 5",
    "alg": "y2 R U2 R' U R' D' R U R' D R2 U' R' U R U' R'",
    "algs": [
      "y2 R U2 R' U R' D' R U R' D R2 U' R' U R U' R'",
      "y2 R' U R U F U R' U' R F' U' R' U' R",
      "y L' U2 L U2 L U F' U' L2 U L U' L' U L F",
      "y' F' R U F2 U R' U' R F2 U' R' F"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 57 (Pi 5)"
  },
  {
    "id": "zbll_pi_zbll_pi_58",
    "name": "ZBLL Pi 58",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 58",
    "group": "ZBLL - Pi - Pi 5",
    "alg": "R2 D R' U2 R D' R2 U' R U R D R' U2 R D' R2",
    "algs": [
      "R2 D R' U2 R D' R2 U' R U R D R' U2 R D' R2",
      "R F U' R2 U' R U' R' U2 R2 U F' R'",
      "F R2 U' R U' R U' R' U2 R' U R2 F'",
      "y2 R2 U R' U2 R' U' R U R D R' U R D' R' U R U' R2"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 58 (Pi 5)"
  },
  {
    "id": "zbll_pi_zbll_pi_59",
    "name": "ZBLL Pi 59",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 59",
    "group": "ZBLL - Pi - Pi 5",
    "alg": "y' r U R' U R' F R F' R U' R' U R U2 r'",
    "algs": [
      "y' r U R' U R' F R F' R U' R' U R U2 r'",
      "R F' U' R2 F U' F' U R2 U F R'",
      "y' R' U' R U R' U' R2 D R' U R D' R' U R' U2 R",
      "y2 F R U R' U' R U R2 U' F' U R U2 R U2 R'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 59 (Pi 5)"
  },
  {
    "id": "zbll_pi_zbll_pi_60",
    "name": "ZBLL Pi 60",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 60",
    "group": "ZBLL - Pi - Pi 5",
    "alg": "y R U2 R' U' F' R U2 R' U' R U' R' F R U' R'",
    "algs": [
      "y R U2 R' U' F' R U2 R' U' R U' R' F R U' R'",
      "y2 S' R' U' R S U' R' U F' U F R",
      "r U R' U R U' R' U x' R F' R U' R' U F' L'",
      "y R U2 R2 U' R2 U' M' x' U' R' U L' U2 R"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 60 (Pi 5)"
  },
  {
    "id": "zbll_pi_zbll_pi_61",
    "name": "ZBLL Pi 61",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 61",
    "group": "ZBLL - Pi - Pi 6",
    "alg": "R U2 R2 U' R2 U' R2 U2 R",
    "algs": [
      "R U2 R2 U' R2 U' R2 U2 R",
      "R U2 R2 U' R2 U' R2 U2 R U2",
      "y2 L U2 L2 U' L2 U' L2 U2 L"
    ],
    "moves": 9,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 61 (Pi 6)"
  },
  {
    "id": "zbll_pi_zbll_pi_62",
    "name": "ZBLL Pi 62",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 62",
    "group": "ZBLL - Pi - Pi 6",
    "alg": "y' R' U2 R U R' U R2 U R' U R U2 R'",
    "algs": [
      "y' R' U2 R U R' U R2 U R' U R U2 R'",
      "S' r' U r2 U' r2 U' r2 U r' S",
      "y R U R' U R U2 R2 U2 R U R' U R",
      "R U2 R' U' R U' R' U2 R' U' R U' R' U2 R"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 62 (Pi 6)"
  },
  {
    "id": "zbll_pi_zbll_pi_63",
    "name": "ZBLL Pi 63",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 63",
    "group": "ZBLL - Pi - Pi 6",
    "alg": "y' R U2 R' U2 R U' R' U2 R U' R' U2 R U R'",
    "algs": [
      "y' R U2 R' U2 R U' R' U2 R U' R' U2 R U R'",
      "S R2 S' R U2 R2 U R2 U' R2 U2 R",
      "y2 R U R' U' R2 U R' U R' U' R U R U2 R2",
      "y R U2 L' U R' U' R U R' U' R L U2 R'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 63 (Pi 6)"
  },
  {
    "id": "zbll_pi_zbll_pi_64",
    "name": "ZBLL Pi 64",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 64",
    "group": "ZBLL - Pi - Pi 6",
    "alg": "y R' U2 R U2 R' U R U2 R' U R U2 R' U' R",
    "algs": [
      "y R' U2 R U2 R' U R U2 R' U R U2 R' U' R",
      "y2 R U R' U' R2 U R' U R U2 R2 U' R U R'",
      "y2 S' U2 S R U2 R2 U' R2 U R2 U2 R'",
      "y L' U2 R U' L U L' U' L U L' R' U2 L"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 64 (Pi 6)"
  },
  {
    "id": "zbll_pi_zbll_pi_65",
    "name": "ZBLL Pi 65",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 65",
    "group": "ZBLL - Pi - Pi 6",
    "alg": "y2 R' U R U' R2 U2 R U R' U R2 U' R' U R",
    "algs": [
      "y2 R' U R U' R2 U2 R U R' U R2 U' R' U R",
      "y' r U2 R2 F R F' R' F R F' R U2 r'",
      "R' U2 R2 U R2 U' R2 U2 R' S R2 S'",
      "y2 R U' R' U2 R U R' U2 R U R' U2 R U2 R'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 65 (Pi 6)"
  },
  {
    "id": "zbll_pi_zbll_pi_66",
    "name": "ZBLL Pi 66",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 66",
    "group": "ZBLL - Pi - Pi 6",
    "alg": "y2 R U' R' U R2 U2 R' U' R U' R2 U R U' R'",
    "algs": [
      "y2 R U' R' U R2 U2 R' U' R U' R2 U R U' R'",
      "R U2 R2 U' R2 U R2 U2 R S R2 S'",
      "y2 R2 U2 R U R U' R' U R' U R2 U' R' U R",
      "y2 R' U R U2 R' U' R U2 R' U' R U2 R' U2 R"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 66 (Pi 6)"
  },
  {
    "id": "zbll_pi_zbll_pi_67",
    "name": "ZBLL Pi 67",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 67",
    "group": "ZBLL - Pi - Pi 6",
    "alg": "y R U2 R' U' R U' R2 U' R U' R' U2 R",
    "algs": [
      "y R U2 R' U' R U' R2 U' R U' R' U2 R",
      "S' r U' r2 U r2 U r2 U' r S",
      "y' R' U' R U' R' U2 R2 U2 R' U' R U' R'",
      "R' U2 R U R' U R U2 R U R' U R U2 R'"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 67 (Pi 6)"
  },
  {
    "id": "zbll_pi_zbll_pi_68",
    "name": "ZBLL Pi 68",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 68",
    "group": "ZBLL - Pi - Pi 6",
    "alg": "R' U2 R2 U R2 U R2 U2 R'",
    "algs": [
      "R' U2 R2 U R2 U R2 U2 R'",
      "R' U2 R2 U R2 U R2 U2 R' U2",
      "y2 L' U2 L2 U L2 U L2 U2 L'"
    ],
    "moves": 9,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 68 (Pi 6)"
  },
  {
    "id": "zbll_pi_zbll_pi_69",
    "name": "ZBLL Pi 69",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 69",
    "group": "ZBLL - Pi - Pi 6",
    "alg": "R U R' U R U2 R' U' R U R' U R U2 R'",
    "algs": [
      "R U R' U R U2 R' U' R U R' U R U2 R'",
      "R' U' R U R U2 R' U' R U' R2 U2 R",
      "F' U' L' U L S' U' L' U L f",
      "R U R' U R U2 R' U' R U R' U R U2 R' U"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 69 (Pi 6)"
  },
  {
    "id": "zbll_pi_zbll_pi_70",
    "name": "ZBLL Pi 70",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 70",
    "group": "ZBLL - Pi - Pi 6",
    "alg": "R' U' R U' R' U2 R U R' U' R U' R' U2 R",
    "algs": [
      "R' U' R U' R' U2 R U R' U' R U' R' U2 R",
      "R U R' U' R' U2 R U R' U R2 U2 R'",
      "R U2 R2 U' R U' R' U2 R U R U' R'",
      "y2 F U R U' R' S U R U' R' f'"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 70 (Pi 6)"
  },
  {
    "id": "zbll_pi_zbll_pi_71",
    "name": "ZBLL Pi 71",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 71",
    "group": "ZBLL - Pi - Pi 6",
    "alg": "y R U R' U R U2 R' U R U R' U R U2 R'",
    "algs": [
      "y R U R' U R U2 R' U R U R' U R U2 R'",
      "R' U2 R U R' U R U R' U2 R U R' U R",
      "y' R' U' R U' R' U2 R U' R' U' R U' R' U2 R",
      "y R2 D' R U' R' D R U R' D' R U2 R' D R U2 R"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 71 (Pi 6)"
  },
  {
    "id": "zbll_pi_zbll_pi_72",
    "name": "ZBLL Pi 72",
    "title": "3x3 - ZBLL Pi - ZBLL Pi 72",
    "group": "ZBLL - Pi - Pi 6",
    "alg": "F R U R' U' R U R' U' F' R U R' U' M' U R U' r'",
    "algs": [
      "F R U R' U' R U R' U' F' R U R' U' M' U R U' r'",
      "R U R2 U' R2 U' R2 U2 R2 U' R' U R U2 R'",
      "R U R' U' R' U' R U R U R' U' R' U R U' R U' R'",
      "S R' U2 R2 U S R2 S' U' R2 U2 R S'"
    ],
    "moves": 19,
    "desc": "3x3 - ZBLL Pi - ZBLL Pi 72 (Pi 6)"
  },
  {
    "id": "zbll_s_zbll_s_1",
    "name": "ZBLL S 1",
    "title": "3x3 - ZBLL S - ZBLL S 1",
    "group": "ZBLL - Sune - S1",
    "alg": "y2 R' U2 R U F R' U R U' F'",
    "algs": [
      "y2 R' U2 R U F R' U R U' F'",
      "L' U2 L U2 R U' L' U R' L",
      "U2 R' U2 R U F R' U R U' F' U'",
      "R U R' U R U2 R' l' U R' D2 R U' R' D2 R2"
    ],
    "moves": 11,
    "desc": "3x3 - ZBLL S - ZBLL S 1 (S1)"
  },
  {
    "id": "zbll_s_zbll_s_2",
    "name": "ZBLL S 2",
    "title": "3x3 - ZBLL S - ZBLL S 2",
    "group": "ZBLL - Sune - S1",
    "alg": "R U R' U R U' R2 F' R U R U' R' F R U' R'",
    "algs": [
      "R U R' U R U' R2 F' R U R U' R' F R U' R'",
      "y R U2 R D R' U' R D' R2 U R U2 R'",
      "R U R' U R U L U2 R' U R U2 R' L'"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL S - ZBLL S 2 (S1)"
  },
  {
    "id": "zbll_s_zbll_s_3",
    "name": "ZBLL S 3",
    "title": "3x3 - ZBLL S - ZBLL S 3",
    "group": "ZBLL - Sune - S1",
    "alg": "R' U R U2 R' U R2 D R' U R D' R'",
    "algs": [
      "R' U R U2 R' U R2 D R' U R D' R'",
      "y' R U R' U R2 D R' U' R D' R' U' R'",
      "y' R' U' R U R2 F' R U R U' R' F U R",
      "y' R U R' U2 R' D' R U' R' D R2 U2 R'"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL S - ZBLL S 3 (S1)"
  },
  {
    "id": "zbll_s_zbll_s_4",
    "name": "ZBLL S 4",
    "title": "3x3 - ZBLL S - ZBLL S 4",
    "group": "ZBLL - Sune - S1",
    "alg": "y2 S' U2 L' U2 L U2 L F' L' f",
    "algs": [
      "y2 S' U2 L' U2 L U2 L F' L' f",
      "R' U2 R D R D' R' U' R D R' D' U2 R' U R",
      "y2 R' U2 R U2 R' U R L' U R' U' R L",
      "y L' U2 L U F L' U' L U L F' L2 U L"
    ],
    "moves": 11,
    "desc": "3x3 - ZBLL S - ZBLL S 4 (S1)"
  },
  {
    "id": "zbll_s_zbll_s_5",
    "name": "ZBLL S 5",
    "title": "3x3 - ZBLL S - ZBLL S 5",
    "group": "ZBLL - Sune - S1",
    "alg": "y R' F R U R' U' R' F' D' R U R' D R2",
    "algs": [
      "y R' F R U R' U' R' F' D' R U R' D R2",
      "U' R2 D' R U' R' D R2 F R' U R U' F'",
      "y' R2 D' R U' R' D R2 F R' U R U' F'",
      "L' R U R' U' L U R U2 L' U R' U' L"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL S - ZBLL S 5 (S1)"
  },
  {
    "id": "zbll_s_zbll_s_6",
    "name": "ZBLL S 6",
    "title": "3x3 - ZBLL S - ZBLL S 6",
    "group": "ZBLL - Sune - S1",
    "alg": "F' R U R' U R U2 R' F U R U' R' U2 R U' R'",
    "algs": [
      "F' R U R' U R U2 R' F U R U' R' U2 R U' R'",
      "y' R U' R2 U2 R2 U R' D' U R U R' D U' R' U R",
      "y' R' U2 R' D R' U R D' R U R U' R U' R'",
      "F' U' F U' F R' D R2 U R2 D' R U' F'"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL S - ZBLL S 6 (S1)"
  },
  {
    "id": "zbll_s_zbll_s_7",
    "name": "ZBLL S 7",
    "title": "3x3 - ZBLL S - ZBLL S 7",
    "group": "ZBLL - Sune - S1",
    "alg": "y' R' U' R U R2 U' R' U' R U D' R U R' D R'",
    "algs": [
      "y' R' U' R U R2 U' R' U' R U D' R U R' D R'",
      "y' R' U2 R U R' U R2 U R' F' R U R' U' R' F R2 U' R'",
      "R' U L' U2 R U' R' U2 R U2 L U L' U L",
      "S' r' F' r U r U' r' S L' U' L U F"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL S - ZBLL S 7 (S1)"
  },
  {
    "id": "zbll_s_zbll_s_8",
    "name": "ZBLL S 8",
    "title": "3x3 - ZBLL S - ZBLL S 8",
    "group": "ZBLL - Sune - S1",
    "alg": "y2 R U R' U R2 D r' U2 r D' R2",
    "algs": [
      "y2 R U R' U R2 D r' U2 r D' R2",
      "y2 R U R' U R2 D r' U2 r D' R2 U",
      "y2 F R U R2 U' R2 U' R2 U2 R U R U R' F'"
    ],
    "moves": 12,
    "desc": "3x3 - ZBLL S - ZBLL S 8 (S1)"
  },
  {
    "id": "zbll_s_zbll_s_9",
    "name": "ZBLL S 9",
    "title": "3x3 - ZBLL S - ZBLL S 9",
    "group": "ZBLL - Sune - S1",
    "alg": "y R U R' U' R U R2 D' R U R' D R U R U2 R'",
    "algs": [
      "y R U R' U' R U R2 D' R U R' D R U R U2 R'",
      "y' R' U2 R' D R' U R D' R' U' R' U R' U R",
      "y' R' U2 R U R' U' R' F' R U R U' R' F R U R' U R"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL S - ZBLL S 9 (S1)"
  },
  {
    "id": "zbll_s_zbll_s_10",
    "name": "ZBLL S 10",
    "title": "3x3 - ZBLL S - ZBLL S 10",
    "group": "ZBLL - Sune - S1",
    "alg": "y2 R U R' U R2 D R' U2 R D' R2",
    "algs": [
      "y2 R U R' U R2 D R' U2 R D' R2"
    ],
    "moves": 12,
    "desc": "3x3 - ZBLL S - ZBLL S 10 (S1)"
  },
  {
    "id": "zbll_s_zbll_s_11",
    "name": "ZBLL S 11",
    "title": "3x3 - ZBLL S - ZBLL S 11",
    "group": "ZBLL - Sune - S1",
    "alg": "y' R' D' R U2 R' D R U' R U R' U2 R U R'",
    "algs": [
      "y' R' D' R U2 R' D R U' R U R' U2 R U R'",
      "R U R2 F' R U2 R U2 R' F R U' R'",
      "R U R2 F' R U2 R U2 R' F R U' R' U",
      "F R' U' R2 U' R2 U2 R2 U' R' F'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL S - ZBLL S 11 (S1)"
  },
  {
    "id": "zbll_s_zbll_s_12",
    "name": "ZBLL S 12",
    "title": "3x3 - ZBLL S - ZBLL S 12",
    "group": "ZBLL - Sune - S1",
    "alg": "R U2 R D R' U2 R D' R' U R' U R U2 R'",
    "algs": [
      "R U2 R D R' U2 R D' R' U R' U R U2 R'",
      "R U R' U' L U' R U L' U' R' U' R U2 R'"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL S - ZBLL S 12 (S1)"
  },
  {
    "id": "zbll_s_zbll_s_13",
    "name": "ZBLL S 13",
    "title": "3x3 - ZBLL S - ZBLL S 13",
    "group": "ZBLL - Sune - S2",
    "alg": "R U R' U' R2 U' L' U R2 U' L U' R U2 R'",
    "algs": [
      "R U R' U' R2 U' L' U R2 U' L U' R U2 R'",
      "y2 R U' R' U' R U' R' U2 R U R2 D' R U2 R' D R",
      "R2 u R' U R2 U' R u' R2 U F' U2 F",
      "D' R2 U R' U R2 U' R U' R2 D R' U2 R"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL S - ZBLL S 13 (S2)"
  },
  {
    "id": "zbll_s_zbll_s_14",
    "name": "ZBLL S 14",
    "title": "3x3 - ZBLL S - ZBLL S 14",
    "group": "ZBLL - Sune - S2",
    "alg": "R U R' U R' F R F' R U' R' F' U F R U' R'",
    "algs": [
      "R U R' U R' F R F' R U' R' F' U F R U' R'",
      "y F U R U' R' U l F' R U' R2 D' R U l'",
      "f R2 f' U R2 u' R U' R2 U R' u R2",
      "y R D R' U2 R D' R2 U R U2 R' U' R U' R' U' R"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL S - ZBLL S 14 (S2)"
  },
  {
    "id": "zbll_s_zbll_s_15",
    "name": "ZBLL S 15",
    "title": "3x3 - ZBLL S - ZBLL S 15",
    "group": "ZBLL - Sune - S2",
    "alg": "y R' U' F2 U' R2 U R2 U F2 R2 U2 R'",
    "algs": [
      "y R' U' F2 U' R2 U R2 U F2 R2 U2 R'",
      "y R' U' R U' R2 F' R U R U' R' F U2 R",
      "y R2 D' R U2 R' D R U R U' R' U R U' R' U2 R",
      "y R' U' R U L U2 R' U R U2 L' U R' U2 R"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL S - ZBLL S 15 (S2)"
  },
  {
    "id": "zbll_s_zbll_s_16",
    "name": "ZBLL S 16",
    "title": "3x3 - ZBLL S - ZBLL S 16",
    "group": "ZBLL - Sune - S2",
    "alg": "y2 R U2 R' U' R U R' U' R U R D R' U2 R D' R2",
    "algs": [
      "y2 R U2 R' U' R U R' U' R U R D R' U2 R D' R2",
      "y2 R U2 R D R2 U' R U R2 D' R U' R U' R'",
      "R U R' U R U2 R' U R U R' U' R' F R2 U' R' U' R U R' F'",
      "U2 R U2 R' U' R U R' U' R U R D R' U2 R D' R2"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL S - ZBLL S 16 (S2)"
  },
  {
    "id": "zbll_s_zbll_s_17",
    "name": "ZBLL S 17",
    "title": "3x3 - ZBLL S - ZBLL S 17",
    "group": "ZBLL - Sune - S2",
    "alg": "y' F R' U R U F' R' U F U F' R",
    "algs": [
      "y' F R' U R U F' R' U F U F' R",
      "R U' L' U R2 D2 R U' R' D2 R L",
      "R U R' U R U2 R2 U2 R U2 R' F R U R' U' R' F' R2",
      "R U R' U R U2 R2 U2 R' D' R U' R' D R U R U' R' U' R"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL S - ZBLL S 17 (S2)"
  },
  {
    "id": "zbll_s_zbll_s_18",
    "name": "ZBLL S 18",
    "title": "3x3 - ZBLL S - ZBLL S 18",
    "group": "ZBLL - Sune - S2",
    "alg": "R' D R2 D' R2 U R2 D R2 D' R2 U' R'",
    "algs": [
      "R' D R2 D' R2 U R2 D R2 D' R2 U' R'",
      "y' F R' U2 R F' R' F U2 F' R",
      "y' x U R' B2 R U' R' U B2 U' R x'",
      "y' R' F R' D' R U2 R' D R U2 F' R"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL S - ZBLL S 18 (S2)"
  },
  {
    "id": "zbll_s_zbll_s_19",
    "name": "ZBLL S 19",
    "title": "3x3 - ZBLL S - ZBLL S 19",
    "group": "ZBLL - Sune - S2",
    "alg": "y' R U R' U R U' R D R' U R r' U2 r D' R2",
    "algs": [
      "y' R U R' U R U' R D R' U R r' U2 r D' R2",
      "R' F r2 R2 U2 r U r' U2 R r2 F' R2",
      "y2 R2 D' r U2 r' R U R' D R U' R U R' U R",
      "y2 r' U r' F' r' U' r' U2 R' F' R U2 r U r'"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL S - ZBLL S 19 (S2)"
  },
  {
    "id": "zbll_s_zbll_s_20",
    "name": "ZBLL S 20",
    "title": "3x3 - ZBLL S - ZBLL S 20",
    "group": "ZBLL - Sune - S2",
    "alg": "R U' R' U' R U R D R' U2 R D' R2 U R U2 R'",
    "algs": [
      "R U' R' U' R U R D R' U2 R D' R2 U R U2 R'",
      "y' F R U R' U' R' F' U2 R U R U' R' U R' U R",
      "y R' U2 R U R2 D' R U2 R' D R U R U' R' U' R",
      "y R2 U' R2 U' R' U2 R U2 R U D' R U' R' D"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL S - ZBLL S 20 (S2)"
  },
  {
    "id": "zbll_s_zbll_s_21",
    "name": "ZBLL S 21",
    "title": "3x3 - ZBLL S - ZBLL S 21",
    "group": "ZBLL - Sune - S2",
    "alg": "y' R' U2 R' D' R U R' D R U' R U R' U R",
    "algs": [
      "y' R' U2 R' D' R U R' D R U' R U R' U R",
      "y' R' U2 R U' R D R' U R D' R' U R' U R",
      "y2 R U R' L' U2 R U2 R' U2 L U2 R U' R'",
      "y R' B2 R U R U R' U2 R U R2 B2 R"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL S - ZBLL S 21 (S2)"
  },
  {
    "id": "zbll_s_zbll_s_22",
    "name": "ZBLL S 22",
    "title": "3x3 - ZBLL S - ZBLL S 22",
    "group": "ZBLL - Sune - S2",
    "alg": "y2 R U R' U R U' R D R' U R D' R' U2 R'",
    "algs": [
      "y2 R U R' U R U' R D R' U R D' R' U2 R'",
      "R U R' f' R U R' U R U2 R' U f R U' R'",
      "y2 R U R' U R' D' R U R' D R U' R U2 R'",
      "y R D' R2 U' F2 U' F2 R U2 R2 D R2"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL S - ZBLL S 22 (S2)"
  },
  {
    "id": "zbll_s_zbll_s_23",
    "name": "ZBLL S 23",
    "title": "3x3 - ZBLL S - ZBLL S 23",
    "group": "ZBLL - Sune - S2",
    "alg": "y' R U R' U R U' R D R' U' R D' R2",
    "algs": [
      "y' R U R' U R U' R D R' U' R D' R2",
      "y2 L R U2 R' U' R U2 L2 U R' U' L",
      "y' L' U R U' L U R' L U2 L' U' L U' L'"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL S - ZBLL S 23 (S2)"
  },
  {
    "id": "zbll_s_zbll_s_24",
    "name": "ZBLL S 24",
    "title": "3x3 - ZBLL S - ZBLL S 24",
    "group": "ZBLL - Sune - S2",
    "alg": "y2 R2 D' R U' R' D R U' R U R' U R",
    "algs": [
      "y2 R2 D' R U' R' D R U' R U R' U R",
      "R U R' U' R' F R F' r U R' U R U2 r'",
      "y R' U' R U' R' U2 R L' U R U' L U R'",
      "R U' L' U R2 U2 L U' L' U2 L R"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL S - ZBLL S 24 (S2)"
  },
  {
    "id": "zbll_s_zbll_s_25",
    "name": "ZBLL S 25",
    "title": "3x3 - ZBLL S - ZBLL S 25",
    "group": "ZBLL - Sune - S3",
    "alg": "R2 D R' U2 R D' R' U' R' U R U2 R'",
    "algs": [
      "R2 D R' U2 R D' R' U' R' U R U2 R'",
      "R U R' U' F' L' U2 L U x U2 R' U' l"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL S - ZBLL S 25 (S3)"
  },
  {
    "id": "zbll_s_zbll_s_26",
    "name": "ZBLL S 26",
    "title": "3x3 - ZBLL S - ZBLL S 26",
    "group": "ZBLL - Sune - S3",
    "alg": "y' R' U2 F' R U R' U' R' F R U2 R",
    "algs": [
      "y' R' U2 F' R U R' U' R' F R U2 R"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL S - ZBLL S 26 (S3)"
  },
  {
    "id": "zbll_s_zbll_s_27",
    "name": "ZBLL S 27",
    "title": "3x3 - ZBLL S - ZBLL S 27",
    "group": "ZBLL - Sune - S3",
    "alg": "y R' U2 R U R' U' R' D' R U2 R' D R2",
    "algs": [
      "y R' U2 R U R' U' R' D' R U2 R' D R2",
      "R' U2 R U R' U' R U R2 F' R U R U' R' F R",
      "R' U2 R L U2 R' U L' U' L U' R U2 L'",
      "R' U' R' D' R U R' D R U2 R U R' U' R U R' U R"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL S - ZBLL S 27 (S3)"
  },
  {
    "id": "zbll_s_zbll_s_28",
    "name": "ZBLL S 28",
    "title": "3x3 - ZBLL S - ZBLL S 28",
    "group": "ZBLL - Sune - S3",
    "alg": "y R U R' U R U' R2 D' R U R' D R2 U2 R'",
    "algs": [
      "y R U R' U R U' R2 D' R U R' D R2 U2 R'",
      "y R U2 R' U2 R' F R2 U R' U' R U R' U' F'",
      "L U2 L F L' U' L' U L F' U2 L'",
      "z U R2 U F U' R' U' R U F' R2 U'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL S - ZBLL S 28 (S3)"
  },
  {
    "id": "zbll_s_zbll_s_29",
    "name": "ZBLL S 29",
    "title": "3x3 - ZBLL S - ZBLL S 29",
    "group": "ZBLL - Sune - S3",
    "alg": "R U' L' U R' U' L",
    "algs": [
      "R U' L' U R' U' L",
      "R U' r' F R' F' r",
      "y2 L U' R' U L' U' R",
      "R U' L' U R' U' L U"
    ],
    "moves": 7,
    "desc": "3x3 - ZBLL S - ZBLL S 29 (S3)"
  },
  {
    "id": "zbll_s_zbll_s_30",
    "name": "ZBLL S 30",
    "title": "3x3 - ZBLL S - ZBLL S 30",
    "group": "ZBLL - Sune - S3",
    "alg": "y' R' U2 R2 U R D' R U R' D R2 U' R U' R'",
    "algs": [
      "y' R' U2 R2 U R D' R U R' D R2 U' R U' R'",
      "F R2 D R' U R D' R2 U' R U R' U' R U R' U' F'",
      "U2 R' U' R U' R' U R U' R2 D' R U R' D R2 U' R' U2 R",
      "R U R' U R U' R' U' D R2 U' R U' R' U R' U R2 D'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL S - ZBLL S 30 (S3)"
  },
  {
    "id": "zbll_s_zbll_s_31",
    "name": "ZBLL S 31",
    "title": "3x3 - ZBLL S - ZBLL S 31",
    "group": "ZBLL - Sune - S3",
    "alg": "y' R U R' U R U2 R2 U R U2 L' R' U R U' L",
    "algs": [
      "y' R U R' U R U2 R2 U R U2 L' R' U R U' L",
      "R U' R' U R U' R' F R' F' R U' F' U F",
      "L' U' L U' L' U' R U' L U' R' U' R U' R'",
      "y' R U R' U R U2 R2 U R U2 R' L' U R U' L"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL S - ZBLL S 31 (S3)"
  },
  {
    "id": "zbll_s_zbll_s_32",
    "name": "ZBLL S 32",
    "title": "3x3 - ZBLL S - ZBLL S 32",
    "group": "ZBLL - Sune - S3",
    "alg": "y2 R U R' F' R U R' U R U' R' U' R' F R2 U' R'",
    "algs": [
      "y2 R U R' F' R U R' U R U' R' U' R' F R2 U' R'",
      "y' D' R2 U R U' R2 U' R U R' D R' U R",
      "y2 R U R' F' R U R' U R U' R' U' R' F R2 U' R' U",
      "R U R' U R U R' U' R U R D R' U' R D' R' U2 R'"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL S - ZBLL S 32 (S3)"
  },
  {
    "id": "zbll_s_zbll_s_33",
    "name": "ZBLL S 33",
    "title": "3x3 - ZBLL S - ZBLL S 33",
    "group": "ZBLL - Sune - S3",
    "alg": "y R' U' R' U R2 D' U2 R U R' U' D R'",
    "algs": [
      "y R' U' R' U R2 D' U2 R U R' U' D R'",
      "R' L' U2 R L2 U' R' U L2 U2 R U' L",
      "y' R' U2 R y R U' R' U' R U2 R' U' y' R' U' R",
      "y R' U' R' U R2 U2 D' R U R' U' D R'"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL S - ZBLL S 33 (S3)"
  },
  {
    "id": "zbll_s_zbll_s_34",
    "name": "ZBLL S 34",
    "title": "3x3 - ZBLL S - ZBLL S 34",
    "group": "ZBLL - Sune - S3",
    "alg": "y2 L U' R' U L' R' U' R' U' R' U R U R2",
    "algs": [
      "y2 L U' R' U L' R' U' R' U' R' U R U R2",
      "y R' U2 R U R' U' R' D' r U2 r' D R2",
      "y R' D' L D R' D' L' D' F2 R2 B2 U R2 F2 L2 D' R2 U'",
      "R U R' U R U' R' U' R' F R2 U' R' U' R U R' F' U"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL S - ZBLL S 34 (S3)"
  },
  {
    "id": "zbll_s_zbll_s_35",
    "name": "ZBLL S 35",
    "title": "3x3 - ZBLL S - ZBLL S 35",
    "group": "ZBLL - Sune - S3",
    "alg": "R2 D r' U2 r D' R' U' R' U R U2 R'",
    "algs": [
      "R2 D r' U2 r D' R' U' R' U R U2 R'",
      "y R' U' R U' R' U R U' R D R' U' R D' R' U R' U2 R",
      "R2 U R U R' U' R' U' R' L' U R' U' L",
      "y2 z U2 R U R U' R' U' R' D' U' R U' R' D"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL S - ZBLL S 35 (S3)"
  },
  {
    "id": "zbll_s_zbll_s_36",
    "name": "ZBLL S 36",
    "title": "3x3 - ZBLL S - ZBLL S 36",
    "group": "ZBLL - Sune - S3",
    "alg": "y' R' U' D R' U R D' U2 R2 U R' U' R'",
    "algs": [
      "y' R' U' D R' U R D' U2 R2 U R' U' R'",
      "y' R' U' D R' U R U2 D' R2 U R' U' R'",
      "y2 R U' R' y' U' R' U2 R U' R' U' R y R U2 R'",
      "y2 R U' R' U' y' R' U2 R U' R' U' R y R U2 R'"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL S - ZBLL S 36 (S3)"
  },
  {
    "id": "zbll_s_zbll_s_37",
    "name": "ZBLL S 37",
    "title": "3x3 - ZBLL S - ZBLL S 37",
    "group": "ZBLL - Sune - S4",
    "alg": "L' R U R' U' L U2 R U2 R'",
    "algs": [
      "L' R U R' U' L U2 R U2 R'",
      "M F R' F' r U2 R U2 R'",
      "r' R F R' F' r U2 R U2 R'"
    ],
    "moves": 10,
    "desc": "3x3 - ZBLL S - ZBLL S 37 (S4)"
  },
  {
    "id": "zbll_s_zbll_s_38",
    "name": "ZBLL S 38",
    "title": "3x3 - ZBLL S - ZBLL S 38",
    "group": "ZBLL - Sune - S4",
    "alg": "y R' D' R U R' D R2 U R' U2 R U R'",
    "algs": [
      "y R' D' R U R' D R2 U R' U2 R U R'",
      "y' R' U2 R2 D R' U' R D' R' U2 R' U R",
      "R U2 R2 U' R2 U' R2 U' L U' R U L'",
      "U R' D' R U R' D R2 U R' U2 R U R'"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL S - ZBLL S 38 (S4)"
  },
  {
    "id": "zbll_s_zbll_s_39",
    "name": "ZBLL S 39",
    "title": "3x3 - ZBLL S - ZBLL S 39",
    "group": "ZBLL - Sune - S4",
    "alg": "y R' U2 R U R2 D' R U' R' D R U2 R",
    "algs": [
      "y R' U2 R U R2 D' R U' R' D R U2 R",
      "F R U' R' U' R U R' U R U' R2 F' R U R U' R'",
      "L' R' U2 R U R' U2 L U R U R' U R"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL S - ZBLL S 39 (S4)"
  },
  {
    "id": "zbll_s_zbll_s_40",
    "name": "ZBLL S 40",
    "title": "3x3 - ZBLL S - ZBLL S 40",
    "group": "ZBLL - Sune - S4",
    "alg": "f R' F' R U2 R U2 R' U2 S'",
    "algs": [
      "f R' F' R U2 R U2 R' U2 S'",
      "y R U R2 F' R U R U' R' F U R U2 R'",
      "y' L R U' R' U L' R U R' U2 R U2 R'",
      "y R U R' F' R U R' U' R' F R2 U' R' L U' R' U L' U' R"
    ],
    "moves": 10,
    "desc": "3x3 - ZBLL S - ZBLL S 40 (S4)"
  },
  {
    "id": "zbll_s_zbll_s_41",
    "name": "ZBLL S 41",
    "title": "3x3 - ZBLL S - ZBLL S 41",
    "group": "ZBLL - Sune - S4",
    "alg": "y R U' L' U R' U2 L U R U' L' U R' L",
    "algs": [
      "y R U' L' U R' U2 L U R U' L' U R' L",
      "y' L' R U R' U' L U R2 D R' U' R D' R2",
      "y' M F R' F' r U R2 D R' U' R D' R2",
      "R' U2 R U R' U R' D' r U2 r' D R U2 R"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL S - ZBLL S 41 (S4)"
  },
  {
    "id": "zbll_s_zbll_s_42",
    "name": "ZBLL S 42",
    "title": "3x3 - ZBLL S - ZBLL S 42",
    "group": "ZBLL - Sune - S4",
    "alg": "R' F' R U R U R' U' R U' R' F R U R' U R U' R'",
    "algs": [
      "R' F' R U R U R' U' R U' R' F R U R' U R U' R'",
      "y' R' U' F U' R2 U R2 U F' R U' R U' R'",
      "y L U' R' U L' U R' D' R U2 R' D R2",
      "y' R' U2 R2 U R2 U D' R U R' D R U2 R U' R'"
    ],
    "moves": 19,
    "desc": "3x3 - ZBLL S - ZBLL S 42 (S4)"
  },
  {
    "id": "zbll_s_zbll_s_43",
    "name": "ZBLL S 43",
    "title": "3x3 - ZBLL S - ZBLL S 43",
    "group": "ZBLL - Sune - S4",
    "alg": "y2 R2 D' r U2 r' D R2 U R' U R",
    "algs": [
      "y2 R2 D' r U2 r' D R2 U R' U R",
      "y2 L U2 L' U R' U2 L U' L' R U R' U R"
    ],
    "moves": 12,
    "desc": "3x3 - ZBLL S - ZBLL S 43 (S4)"
  },
  {
    "id": "zbll_s_zbll_s_44",
    "name": "ZBLL S 44",
    "title": "3x3 - ZBLL S - ZBLL S 44",
    "group": "ZBLL - Sune - S4",
    "alg": "F U R U' R' S R' F' R U R U' R' S'",
    "algs": [
      "F U R U' R' S R' F' R U R U' R' S'",
      "R' D R' U R D' U R U' R' U' R2 U R U' R'",
      "R U R' U R U2 R2 U2 R U R' F' R U R' U' R' F R2 U' R' U R",
      "F U R U' R' S R' F' R U R U' R' S' U'"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL S - ZBLL S 44 (S4)"
  },
  {
    "id": "zbll_s_zbll_s_45",
    "name": "ZBLL S 45",
    "title": "3x3 - ZBLL S - ZBLL S 45",
    "group": "ZBLL - Sune - S4",
    "alg": "F R U R' U' R' F' R U2 R U' R' U R U2 R'",
    "algs": [
      "F R U R' U' R' F' R U2 R U' R' U R U2 R'",
      "y R U R2 F' r U R U' r' F U R U2 R'",
      "R' U2 R U R D R' U R D' R2 U R U' R' U R",
      "R' U2 R U2 R2 D' R U R' D R2 U' R' U R"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL S - ZBLL S 45 (S4)"
  },
  {
    "id": "zbll_s_zbll_s_46",
    "name": "ZBLL S 46",
    "title": "3x3 - ZBLL S - ZBLL S 46",
    "group": "ZBLL - Sune - S4",
    "alg": "R' U2 R U R' U R' D' R U2 R' D R U2 R",
    "algs": [
      "R' U2 R U R' U R' D' R U2 R' D R U2 R",
      "R U R' U R U2 R' U2 R U R' U' R' F R2 U' R' U' R U R' F'",
      "R U R' U R U2 R' L' U' L U L F' L2 U L U L' U' L F",
      "y R U' L U' R2 D' F2 D R2 U2 L' R'"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL S - ZBLL S 46 (S4)"
  },
  {
    "id": "zbll_s_zbll_s_47",
    "name": "ZBLL S 47",
    "title": "3x3 - ZBLL S - ZBLL S 47",
    "group": "ZBLL - Sune - S4",
    "alg": "R2 F R U R U' R' F' R U' R' U R",
    "algs": [
      "R2 F R U R U' R' F' R U' R' U R",
      "R U R' U' R' F R2 U' R' U' R U R' F' R U R' U R U2 R'",
      "R2 F R U R U' R' F' R U' R' U R U",
      "R' U R U R' U' R' D' R U R' D R2 U R' U R"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL S - ZBLL S 47 (S4)"
  },
  {
    "id": "zbll_s_zbll_s_48",
    "name": "ZBLL S 48",
    "title": "3x3 - ZBLL S - ZBLL S 48",
    "group": "ZBLL - Sune - S4",
    "alg": "y2 R2 D' R U2 R' D R2 U R' U R",
    "algs": [
      "y2 R2 D' R U2 R' D R2 U R' U R",
      "L2 D' L U2 L' D L2 U L' U L",
      "R U R' U R U2 x R D2 R U R' D2 R U' R"
    ],
    "moves": 12,
    "desc": "3x3 - ZBLL S - ZBLL S 48 (S4)"
  },
  {
    "id": "zbll_s_zbll_s_49",
    "name": "ZBLL S 49",
    "title": "3x3 - ZBLL S - ZBLL S 49",
    "group": "ZBLL - Sune - S5",
    "alg": "y R2 U R2 F' R U2 R' U' R U' R' F R2 U' R2",
    "algs": [
      "y R2 U R2 F' R U2 R' U' R U' R' F R2 U' R2",
      "y2 R U' R D R2 U' R U' R' U2 R2 D' R' U R'",
      "y2 R U' R' U' R U' R' U2 R U R' U R' D' R U R' D R",
      "y' z R' U' R' U R U R F' R' U2 R U R' U' R U F z'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL S - ZBLL S 49 (S5)"
  },
  {
    "id": "zbll_s_zbll_s_50",
    "name": "ZBLL S 50",
    "title": "3x3 - ZBLL S - ZBLL S 50",
    "group": "ZBLL - Sune - S5",
    "alg": "y F U R' F R F' R U' R' U R U' R' F'",
    "algs": [
      "y F U R' F R F' R U' R' U R U' R' F'",
      "y' F' L' U' L U L' U' L F' L F L' U F",
      "y' R U R' U R U' R' U R U' R' L' U2 R U R' U2 L"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL S - ZBLL S 50 (S5)"
  },
  {
    "id": "zbll_s_zbll_s_51",
    "name": "ZBLL S 51",
    "title": "3x3 - ZBLL S - ZBLL S 51",
    "group": "ZBLL - Sune - S5",
    "alg": "y' R U' R2 U2 D' R U R' U D R2 U R'",
    "algs": [
      "y' R U' R2 U2 D' R U R' U D R2 U R'",
      "U R' U R2 U D R' U R D' U2 R2 U' R",
      "y2 R' U' R U R' F' R U R' U' R' F R U2 R U R' U R",
      "y' R U' R2 U2 R F' U R' U' R F R' U2 R2 U R'"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL S - ZBLL S 51 (S5)"
  },
  {
    "id": "zbll_s_zbll_s_52",
    "name": "ZBLL S 52",
    "title": "3x3 - ZBLL S - ZBLL S 52",
    "group": "ZBLL - Sune - S5",
    "alg": "y F' R U R' D R U R' U' D' R U' R' F",
    "algs": [
      "y F' R U R' D R U R' U' D' R U' R' F",
      "R' U R U2 R' U2 R' F' R U R U' R' F U' R",
      "R' U R' D' R2 U2 R' U' R U' R2 D R U' R",
      "y R2 U' R2 B R' U' R U' R' U2 R B' R2 U R2"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL S - ZBLL S 52 (S5)"
  },
  {
    "id": "zbll_s_zbll_s_53",
    "name": "ZBLL S 53",
    "title": "3x3 - ZBLL S - ZBLL S 53",
    "group": "ZBLL - Sune - S5",
    "alg": "y' R' U2 R2 U R' F' R U R' U' R' F R2 U' R2 U R",
    "algs": [
      "y' R' U2 R2 U R' F' R U R' U' R' F R2 U' R2 U R",
      "y' R' U' F U R U' R' F' R2 U R' U' R' F R F'",
      "y' R U' L' U R' U' R U' L U R' U' L' U L",
      "R U R' U' L' U R U' L U' L' U R' U' L"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL S - ZBLL S 53 (S5)"
  },
  {
    "id": "zbll_s_zbll_s_54",
    "name": "ZBLL S 54",
    "title": "3x3 - ZBLL S - ZBLL S 54",
    "group": "ZBLL - Sune - S5",
    "alg": "F R U R' U R U2 R U2 R2 U' R2 U' R2 F'",
    "algs": [
      "F R U R' U R U2 R U2 R2 U' R2 U' R2 F'",
      "R' U2 R U R' U' L U' L' U2 R U L U2 L'",
      "R U R2 F2 R U2 R U2 R' F2 U R U2 R'",
      "y' f R' F' R f' R' D R U R' D' R U2 F"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL S - ZBLL S 54 (S5)"
  },
  {
    "id": "zbll_s_zbll_s_55",
    "name": "ZBLL S 55",
    "title": "3x3 - ZBLL S - ZBLL S 55",
    "group": "ZBLL - Sune - S5",
    "alg": "R' U2 R U R' U' R F U' R' U' R U F'",
    "algs": [
      "R' U2 R U R' U' R F U' R' U' R U F'",
      "R U R' U R U2 R' F R U' R' U' R U R' F' R U R' U' R' F R F'",
      "y' R U2 R' U' R U R' U' F' R U2 R' U' R U' R' F R U' R'",
      "y R' U2 R U R' U' R L U' R' U L' U2 R"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL S - ZBLL S 55 (S5)"
  },
  {
    "id": "zbll_s_zbll_s_56",
    "name": "ZBLL S 56",
    "title": "3x3 - ZBLL S - ZBLL S 56",
    "group": "ZBLL - Sune - S5",
    "alg": "L' U2 R U' R' U2 L U R U' R' U R U2 R'",
    "algs": [
      "L' U2 R U' R' U2 L U R U' R' U R U2 R'",
      "y2 r F' U2 F r' U2 R' U' R' U R' U R2",
      "y' R' U' R f R' U R U' F' R U R' U' R' F R f'",
      "F R' F' R U R U' R' F U R U2 R' U' R U R' F'"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL S - ZBLL S 56 (S5)"
  },
  {
    "id": "zbll_s_zbll_s_57",
    "name": "ZBLL S 57",
    "title": "3x3 - ZBLL S - ZBLL S 57",
    "group": "ZBLL - Sune - S5",
    "alg": "y2 R U R' U L' U R U' L U2 R'",
    "algs": [
      "y2 R U R' U L' U R U' L U2 R'",
      "U2 R U R' U r' F R F' r U2 R'",
      "F' R U2 R' U2 R' F2 R U R U' R' F'",
      "y2 R U R' F' r U R' U R U2 r' F R U' R'"
    ],
    "moves": 12,
    "desc": "3x3 - ZBLL S - ZBLL S 57 (S5)"
  },
  {
    "id": "zbll_s_zbll_s_58",
    "name": "ZBLL S 58",
    "title": "3x3 - ZBLL S - ZBLL S 58",
    "group": "ZBLL - Sune - S5",
    "alg": "F U' R' U R U F' R U R2 U R2 U2 R'",
    "algs": [
      "F U' R' U R U F' R U R2 U R2 U2 R'",
      "R U R' D' R2 U R U' R2 D R' U R2 U2 R'",
      "R U R U R U' R2 D R' U R D' R U2 R'",
      "R U R' U R U' R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL S - ZBLL S 58 (S5)"
  },
  {
    "id": "zbll_s_zbll_s_59",
    "name": "ZBLL S 59",
    "title": "3x3 - ZBLL S - ZBLL S 59",
    "group": "ZBLL - Sune - S5",
    "alg": "R' U2 L U' R U L' U R' U R",
    "algs": [
      "R' U2 L U' R U L' U R' U R",
      "R' U R U2 R' U R U2 R D R' U' R D' R'",
      "U2 r' F2 R F' r U R' U r' F r",
      "y2 L' U2 R U' L U R' U L' U L"
    ],
    "moves": 11,
    "desc": "3x3 - ZBLL S - ZBLL S 59 (S5)"
  },
  {
    "id": "zbll_s_zbll_s_60",
    "name": "ZBLL S 60",
    "title": "3x3 - ZBLL S - ZBLL S 60",
    "group": "ZBLL - Sune - S5",
    "alg": "F R U' R2 U2 R U R' U R2 U R' F'",
    "algs": [
      "F R U' R2 U2 R U R' U R2 U R' F'",
      "R' F R F' U R U R' U2 F R' F' R",
      "y2 R U R' F' R U R' U R U2 R' F R U' R'"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL S - ZBLL S 60 (S5)"
  },
  {
    "id": "zbll_s_zbll_s_61",
    "name": "ZBLL S 61",
    "title": "3x3 - ZBLL S - ZBLL S 61",
    "group": "ZBLL - Sune - S6",
    "alg": "y' R U R' U' R' U2 R U R' U R U' R U' R'",
    "algs": [
      "y' R U R' U' R' U2 R U R' U R U' R U' R'",
      "y' R' U2 R U R' U R U R' U R' U' R3 U' R' U R U R2",
      "y L' R u R2 u' R2 U R U' L",
      "S r U R' U R U2 r' U2 S'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL S - ZBLL S 61 (S6)"
  },
  {
    "id": "zbll_s_zbll_s_62",
    "name": "ZBLL S 62",
    "title": "3x3 - ZBLL S - ZBLL S 62",
    "group": "ZBLL - Sune - S6",
    "alg": "R U R' U R U' R' U R' U' R2 U' R' U R' U R",
    "algs": [
      "R U R' U R U' R' U R' U' R2 U' R' U R' U R",
      "y' R2 U' R2 U' R U2 R U' R' U' R U R2",
      "R U R' U R U' R' U' L' U' L U2 R U' R' U' L' U L",
      "R U R' U R U2 R U' R' U' R U R U R U' R"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL S - ZBLL S 62 (S6)"
  },
  {
    "id": "zbll_s_zbll_s_63",
    "name": "ZBLL S 63",
    "title": "3x3 - ZBLL S - ZBLL S 63",
    "group": "ZBLL - Sune - S6",
    "alg": "R U R2 U' R2 U' R2 U2 R2 U2 R'",
    "algs": [
      "R U R2 U' R2 U' R2 U2 R2 U2 R'",
      "y' R' U2 R U R' U R U' R' U R' U' R3 U' R' U R U R2",
      "y R U2 R' U2 R' U2 R U R' U R2 U2 R'",
      "y2 R' U' R2 U R U R' U' R U R2 U2 R' U'"
    ],
    "moves": 11,
    "desc": "3x3 - ZBLL S - ZBLL S 63 (S6)"
  },
  {
    "id": "zbll_s_zbll_s_64",
    "name": "ZBLL S 64",
    "title": "3x3 - ZBLL S - ZBLL S 64",
    "group": "ZBLL - Sune - S6",
    "alg": "y' R' U2 R U R' U R",
    "algs": [
      "y' R' U2 R U R' U R",
      "y' R' U2 R U R' U R U2",
      "y L' U2 L U L' U L"
    ],
    "moves": 8,
    "desc": "3x3 - ZBLL S - ZBLL S 64 (S6)"
  },
  {
    "id": "zbll_s_zbll_s_65",
    "name": "ZBLL S 65",
    "title": "3x3 - ZBLL S - ZBLL S 65",
    "group": "ZBLL - Sune - S6",
    "alg": "R U R' U R U R U R U R U' R' U' R2",
    "algs": [
      "R U R' U R U R U R U R U' R' U' R2",
      "y' R2 U R' U' R' U' R U2 R' U' R2 U' R2",
      "y2 R' U' R U' R U R' U R U2 R' U' R' U R",
      "R U' R' U R U R2 U' R U' R U R2 U R"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL S - ZBLL S 65 (S6)"
  },
  {
    "id": "zbll_s_zbll_s_66",
    "name": "ZBLL S 66",
    "title": "3x3 - ZBLL S - ZBLL S 66",
    "group": "ZBLL - Sune - S6",
    "alg": "R U R2 F' R U2 R U' R' U' R' F R2 U' R'",
    "algs": [
      "R U R2 F' R U2 R U' R' U' R' F R2 U' R'",
      "y R U R' U R' U' R2 U' R' U R' U' R U R' U R",
      "y' R' U2 R U R' U R2 U' R U R U R U' R' U' R2",
      "y' R2 U R U' R' U' R U2 R U' R2 U' R2"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL S - ZBLL S 66 (S6)"
  },
  {
    "id": "zbll_s_zbll_s_67",
    "name": "ZBLL S 67",
    "title": "3x3 - ZBLL S - ZBLL S 67",
    "group": "ZBLL - Sune - S6",
    "alg": "R U R' U R U2 R'",
    "algs": [
      "R U R' U R U2 R'",
      "R U R2 U' R2 U R' S R2 S'",
      "l b d' r f d2 b'",
      "R U R' U R U2 R' U2"
    ],
    "moves": 7,
    "desc": "3x3 - ZBLL S - ZBLL S 67 (S6)"
  },
  {
    "id": "zbll_s_zbll_s_68",
    "name": "ZBLL S 68",
    "title": "3x3 - ZBLL S - ZBLL S 68",
    "group": "ZBLL - Sune - S6",
    "alg": "R' U2 R2 U2 R2 U' R2 U' R2 U R",
    "algs": [
      "R' U2 R2 U2 R2 U' R2 U' R2 U R",
      "R' U2 R2 U R' U R U2 R' U2 R' U2 R",
      "R U R' U R U2 R' U R' U R' U' R3 U' R' U R U R2",
      "y' R' U2 R2 U R U' R' U R U R2 U' R'"
    ],
    "moves": 11,
    "desc": "3x3 - ZBLL S - ZBLL S 68 (S6)"
  },
  {
    "id": "zbll_s_zbll_s_69",
    "name": "ZBLL S 69",
    "title": "3x3 - ZBLL S - ZBLL S 69",
    "group": "ZBLL - Sune - S6",
    "alg": "y' R U R' U' R' U2 R U R U' R' U R' U R",
    "algs": [
      "y' R U R' U' R' U2 R U R U' R' U R' U R",
      "R U R' U R2 U R U R2 U' R' U' R2",
      "y' R2 U' R' U' R2 U R U R2 U R' U R",
      "R U R' U R U' R' U' R' U2 R U R U' R2 U2 R"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL S - ZBLL S 69 (S6)"
  },
  {
    "id": "zbll_s_zbll_s_70",
    "name": "ZBLL S 70",
    "title": "3x3 - ZBLL S - ZBLL S 70",
    "group": "ZBLL - Sune - S6",
    "alg": "y' R' U' R U R U R' U' R' U R U R U' R'",
    "algs": [
      "y' R' U' R U R U R' U' R' U R U R U' R'",
      "R' F' U' F U R F U R U' R' F'",
      "y F' L' U' L U F U' F U R U' R' F'",
      "y' R' U2 R2 U R U R U' R' U' R2 U R"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL S - ZBLL S 70 (S6)"
  },
  {
    "id": "zbll_s_zbll_s_71",
    "name": "ZBLL S 71",
    "title": "3x3 - ZBLL S - ZBLL S 71",
    "group": "ZBLL - Sune - S6",
    "alg": "y' R' U2 R2 U R2 U R U' R U' R'",
    "algs": [
      "y' R' U2 R2 U R2 U R U' R U' R'",
      "y2 R' U' R U' R U R2 U R2 U2 R'",
      "y L' U2 L2 U L2 U L U' L U' L'",
      "z U' R' U R' U R U2 R U2 R2 U'"
    ],
    "moves": 12,
    "desc": "3x3 - ZBLL S - ZBLL S 71 (S6)"
  },
  {
    "id": "zbll_s_zbll_s_72",
    "name": "ZBLL S 72",
    "title": "3x3 - ZBLL S - ZBLL S 72",
    "group": "ZBLL - Sune - S6",
    "alg": "R U R' U' R U R' U R U R U2 R' U' R U' R' U R'",
    "algs": [
      "R U R' U' R U R' U R U R U2 R' U' R U' R' U R'",
      "y' R' F R U R' U' R' F' R U' R' D' R U2 R' D R2",
      "R U R' U R U2 R' U R U R' U R' U' R2 U' R' U R' U R",
      "R2 U' S' U2 S U' R' U R' U R U2 R'"
    ],
    "moves": 19,
    "desc": "3x3 - ZBLL S - ZBLL S 72 (S6)"
  },
  {
    "id": "zbll_as_zbll_as_1",
    "name": "ZBLL AS 1",
    "title": "3x3 - ZBLL AS - ZBLL AS 1",
    "group": "ZBLL - Anti-Sune - AS1",
    "alg": "y' R2 D R' U2 R D' R' U' R' U R U' R' U R U2 R'",
    "algs": [
      "y' R2 D R' U2 R D' R' U' R' U R U' R' U R U2 R'",
      "y' R U R' U R' D R2 U' R' U R2 D' R' U2 R'",
      "y' R U R' U' L' U2 R U' R' U2 L U' R U2 R'",
      "y R U R2 F' U' F U R F R' F' R2 U2 R'"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL AS - ZBLL AS 1 (AS1)"
  },
  {
    "id": "zbll_as_zbll_as_2",
    "name": "ZBLL AS 2",
    "title": "3x3 - ZBLL AS - ZBLL AS 2",
    "group": "ZBLL - Anti-Sune - AS1",
    "alg": "y2 R' U2 F' R U R' U' R' F R2 U R' U R",
    "algs": [
      "y2 R' U2 F' R U R' U' R' F R2 U R' U R",
      "R U2 R2 F2 U' R2 U' R2 U F2 U R",
      "y2 R' U2 R U R' U' R U R' U' R' D' R U2 R' D R2",
      "R U2 R2 F2 D' F2 U' F2 D F2 U R"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL AS - ZBLL AS 2 (AS1)"
  },
  {
    "id": "zbll_as_zbll_as_3",
    "name": "ZBLL AS 3",
    "title": "3x3 - ZBLL AS - ZBLL AS 3",
    "group": "ZBLL - Anti-Sune - AS1",
    "alg": "y2 R' U R U R' U R U2 R' U' R2 D R' U2 R D' R'",
    "algs": [
      "y2 R' U R U R' U R U2 R' U' R2 D R' U2 R D' R'",
      "D R2 U' R U' R2 U R' U R2 D' R U2 R'",
      "R' U' R U' R D' R U2 R' D R U2 R U2 R",
      "R U R' U' R' F R U2 F' U' F U' R U R' U' F'"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL AS - ZBLL AS 3 (AS1)"
  },
  {
    "id": "zbll_as_zbll_as_4",
    "name": "ZBLL AS 4",
    "title": "3x3 - ZBLL AS - ZBLL AS 4",
    "group": "ZBLL - Anti-Sune - AS1",
    "alg": "y' R' D' R U2 R' D R2 U' R' U2 R U R' U R U R'",
    "algs": [
      "y' R' D' R U2 R' D R2 U' R' U2 R U R' U R U R'",
      "y2 R' U2 R' U2 F' R U R U' R' F R' U2 R U2 R",
      "y2 r U' r' U2 R' F R U2 F2 U' R U' R' F'",
      "y' R U2 R U2 R' U' R' U R F' R U2 R' U2 R' F"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL AS - ZBLL AS 4 (AS1)"
  },
  {
    "id": "zbll_as_zbll_as_5",
    "name": "ZBLL AS 5",
    "title": "3x3 - ZBLL AS - ZBLL AS 5",
    "group": "ZBLL - Anti-Sune - AS1",
    "alg": "y2 R' F U2 F' R F R' U2 R F'",
    "algs": [
      "y2 R' F U2 F' R F R' U2 R F'",
      "y2 R' F U2 R' D' R U2 R' D R F' R",
      "y2 x R' U B2 U' R U R' B2 R U' x'",
      "y' R U R2 D R2 D' R2 U' R2 D R2 D' R"
    ],
    "moves": 11,
    "desc": "3x3 - ZBLL AS - ZBLL AS 5 (AS1)"
  },
  {
    "id": "zbll_as_zbll_as_6",
    "name": "ZBLL AS 6",
    "title": "3x3 - ZBLL AS - ZBLL AS 6",
    "group": "ZBLL - Anti-Sune - AS1",
    "alg": "y2 R' F U' F' U' R F U' R' U' R F'",
    "algs": [
      "y2 R' F U' F' U' R F U' R' U' R F'",
      "y2 R U R' U R' U' R U' R D R' U R D' U' R2 U2 R",
      "y2 R' F U' F' U' R F U' R' U' R F' U",
      "L' R' D2 R U R' D2 R2 U' L U R'"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL AS - ZBLL AS 6 (AS1)"
  },
  {
    "id": "zbll_as_zbll_as_7",
    "name": "ZBLL AS 7",
    "title": "3x3 - ZBLL AS - ZBLL AS 7",
    "group": "ZBLL - Anti-Sune - AS1",
    "alg": "y2 R2 D r' U2 r R' U' R D' R' U R' U' R U' R'",
    "algs": [
      "y2 R2 D r' U2 r R' U' R D' R' U R' U' R U' R'",
      "R B' r2 R2 U2 r' U' r U2 R' r2 B R2",
      "y R' U' R U' R' U R' D' R U' R' r U2 r' D R2",
      "y R' F R' F' R' U2 R' U2 R2 U2 R U2 F R2 F'"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL AS - ZBLL AS 7 (AS1)"
  },
  {
    "id": "zbll_as_zbll_as_8",
    "name": "ZBLL AS 8",
    "title": "3x3 - ZBLL AS - ZBLL AS 8",
    "group": "ZBLL - Anti-Sune - AS1",
    "alg": "y' R U2 R' U' R2 D R' U2 R D' R' U' R' U R U R'",
    "algs": [
      "y' R U2 R' U' R2 D R' U2 R D' R' U' R' U R U R'",
      "y2 R' U' R U' R U R' U' R' U2 F R U R U' R' F'",
      "y' R2 U R2 U R U2 R' U2 R' U' D R' U R D'",
      "y' R2 F' R2 U R2 D' F' U' D F' U F2 R2"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL AS - ZBLL AS 8 (AS1)"
  },
  {
    "id": "zbll_as_zbll_as_9",
    "name": "ZBLL AS 9",
    "title": "3x3 - ZBLL AS - ZBLL AS 9",
    "group": "ZBLL - Anti-Sune - AS1",
    "alg": "y2 R' U' R U' R D R' U' R D' R' U R' U2 R",
    "algs": [
      "y2 R' U' R U' R D R' U' R D' R' U R' U2 R",
      "y2 R' U' R U' R' U R' D' R U' R' D R U2 R",
      "y R U R D' R' U2 R D R' D' R' U2 R U' D R'",
      "y R U R' U2 L' U2 R U2 L U L' R' U2 L"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL AS - ZBLL AS 9 (AS1)"
  },
  {
    "id": "zbll_as_zbll_as_10",
    "name": "ZBLL AS 10",
    "title": "3x3 - ZBLL AS - ZBLL AS 10",
    "group": "ZBLL - Anti-Sune - AS1",
    "alg": "y R U2 R D R' U' R D' R' U R' U' R U' R'",
    "algs": [
      "y R U2 R D R' U' R D' R' U R' U' R U' R'",
      "y R U2 R' U R' D' R U' R' D R U' R U' R'",
      "y R' U L U' R U' R' L' U L U' R U2 L'",
      "y R U2 R D R' U' R D' R' U R' U' R U' R' U2"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL AS - ZBLL AS 10 (AS1)"
  },
  {
    "id": "zbll_as_zbll_as_11",
    "name": "ZBLL AS 11",
    "title": "3x3 - ZBLL AS - ZBLL AS 11",
    "group": "ZBLL - Anti-Sune - AS1",
    "alg": "y2 R2 D R' U R D' R' U R' U' R U' R'",
    "algs": [
      "y2 R2 D R' U R D' R' U R' U' R U' R'",
      "y2 L' U R U' L2 U2 R' U R U2 L' R'",
      "U R U R' U' D R' U' R U R2 U' R U R2 D'",
      "y2 R' F' r U R U' r' F r' F' r U' r' F2 r"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL AS - ZBLL AS 11 (AS1)"
  },
  {
    "id": "zbll_as_zbll_as_12",
    "name": "ZBLL AS 12",
    "title": "3x3 - ZBLL AS - ZBLL AS 12",
    "group": "ZBLL - Anti-Sune - AS1",
    "alg": "y R' U' R U' R' U R' D' R U R' D R2",
    "algs": [
      "y R' U' R U' R' U R' D' R U R' D R2",
      "y' r U2 R' U' R U' r' F R' F' R U R U' R'",
      "y' R U' L' U R' U' L R' U2 R U R' U R"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL AS - ZBLL AS 12 (AS1)"
  },
  {
    "id": "zbll_as_zbll_as_13",
    "name": "ZBLL AS 13",
    "title": "3x3 - ZBLL AS - ZBLL AS 13",
    "group": "ZBLL - Anti-Sune - AS2",
    "alg": "R U' R' U2 R U' R2 D' R U' R' D R",
    "algs": [
      "R U' R' U2 R U' R2 D' R U' R' D R",
      "y' L U' R' U L' U R2 U R2 U R2 U2 R'",
      "y R' U' R U2 R D R' U R D' R2 U2 R",
      "y R' U' R U' R2 D' R U R' D R U R"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL AS - ZBLL AS 13 (AS2)"
  },
  {
    "id": "zbll_as_zbll_as_14",
    "name": "ZBLL AS 14",
    "title": "3x3 - ZBLL AS - ZBLL AS 14",
    "group": "ZBLL - Anti-Sune - AS2",
    "alg": "S U2 R U2 R' U2 R' F R f'",
    "algs": [
      "S U2 R U2 R' U2 R' F R f'",
      "y R U2 R' U' F' R U R' U' R' F R2 U' R'",
      "y2 R U2 R' U2 R U' R' L U' R U R' L'",
      "y2 R U' R U F' U2 R' U2 R F U' R2"
    ],
    "moves": 10,
    "desc": "3x3 - ZBLL AS - ZBLL AS 14 (AS2)"
  },
  {
    "id": "zbll_as_zbll_as_15",
    "name": "ZBLL AS 15",
    "title": "3x3 - ZBLL AS - ZBLL AS 15",
    "group": "ZBLL - Anti-Sune - AS2",
    "alg": "y2 R U2 R' U2 L' U R U' R' L",
    "algs": [
      "y2 R U2 R' U2 L' U R U' R' L",
      "y' F U2 F' U' R' F U' F' U R",
      "y2 R U2 R' U2 r' F R F' r R'",
      "y2 R U2 R' U2 L' U R U' M' x'"
    ],
    "moves": 11,
    "desc": "3x3 - ZBLL AS - ZBLL AS 15 (AS2)"
  },
  {
    "id": "zbll_as_zbll_as_16",
    "name": "ZBLL AS 16",
    "title": "3x3 - ZBLL AS - ZBLL AS 16",
    "group": "ZBLL - Anti-Sune - AS2",
    "alg": "y' R' U2 R' D' R U R' D R2 U' R' U2 R",
    "algs": [
      "y' R' U2 R' D' R U R' D R2 U' R' U2 R",
      "R' U' R U' R' U' L' U2 R U' R' U2 R L"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL AS - ZBLL AS 16 (AS2)"
  },
  {
    "id": "zbll_as_zbll_as_17",
    "name": "ZBLL AS 17",
    "title": "3x3 - ZBLL AS - ZBLL AS 17",
    "group": "ZBLL - Anti-Sune - AS2",
    "alg": "y R U R' U' R U' R' F' R U R' U R U' R' U' R' F R",
    "algs": [
      "y R U R' U' R U' R' F' R U R' U R U' R' U' R' F R",
      "y R U R' U R' F U' R2 U' R2 U F' U R",
      "y R U R' U2 R' D' R U' R' D U' R2 U' R2 U2 R",
      "y' R' U2 R' D' r U2 r' R U' R' D R2 U' R' U2 R"
    ],
    "moves": 20,
    "desc": "3x3 - ZBLL AS - ZBLL AS 17 (AS2)"
  },
  {
    "id": "zbll_as_zbll_as_18",
    "name": "ZBLL AS 18",
    "title": "3x3 - ZBLL AS - ZBLL AS 18",
    "group": "ZBLL - Anti-Sune - AS2",
    "alg": "y R2 D R' U R D' R2 U' r' F R F' M'",
    "algs": [
      "y R2 D R' U R D' R2 U' r' F R F' M'",
      "y R2 D R' U R D' R2 U' L' U R U' R' L",
      "y2 R L' U' L U R' U' L' U2 R U' L U R'",
      "y2 F2 D F' U F D' F2 R' F U' F' U R"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL AS - ZBLL AS 18 (AS2)"
  },
  {
    "id": "zbll_as_zbll_as_19",
    "name": "ZBLL AS 19",
    "title": "3x3 - ZBLL AS - ZBLL AS 19",
    "group": "ZBLL - Anti-Sune - AS2",
    "alg": "y2 S R U R' U' R' F R S' R U R' U' F'",
    "algs": [
      "y2 S R U R' U' R' F R S' R U R' U' F'",
      "y2 S R U R' U' R' F R f' F R U R' U' F'",
      "F R' F' U2 R U F' R' U R U F R U' R'",
      "R U' L U2 R' U R U2 R' U2 L' U' L U' L'"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL AS - ZBLL AS 19 (AS2)"
  },
  {
    "id": "zbll_as_zbll_as_20",
    "name": "ZBLL AS 20",
    "title": "3x3 - ZBLL AS - ZBLL AS 20",
    "group": "ZBLL - Anti-Sune - AS2",
    "alg": "y2 R' U' R U' R2 D' r U2 r' D R2",
    "algs": [
      "y2 R' U' R U' R2 D' r U2 r' D R2",
      "R D' R U' R D R' U R2 D' R U2 D R' U2 R"
    ],
    "moves": 12,
    "desc": "3x3 - ZBLL AS - ZBLL AS 20 (AS2)"
  },
  {
    "id": "zbll_as_zbll_as_21",
    "name": "ZBLL AS 21",
    "title": "3x3 - ZBLL AS - ZBLL AS 21",
    "group": "ZBLL - Anti-Sune - AS2",
    "alg": "y2 R' U' R U' R2 D' R U2 R' D R2",
    "algs": [
      "y2 R' U' R U' R2 D' R U2 R' D R2",
      "y2 R' U' R U' R2 D' R U2 R' D R2 U",
      "y2 R' U' R U' R2 D' R U2 R' D R2 U'"
    ],
    "moves": 12,
    "desc": "3x3 - ZBLL AS - ZBLL AS 21 (AS2)"
  },
  {
    "id": "zbll_as_zbll_as_22",
    "name": "ZBLL AS 22",
    "title": "3x3 - ZBLL AS - ZBLL AS 22",
    "group": "ZBLL - Anti-Sune - AS2",
    "alg": "y2 R U2 R' U' R U R' U2 R' F R U R U' R' F'",
    "algs": [
      "y2 R U2 R' U' R U R' U2 R' F R U R U' R' F'",
      "y R U2 R' U' F' r U R' U' r' F R2 U' R'",
      "y L U L' U L U2 L2 R U R' U' L U2 R U2 R'"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL AS - ZBLL AS 22 (AS2)"
  },
  {
    "id": "zbll_as_zbll_as_23",
    "name": "ZBLL AS 23",
    "title": "3x3 - ZBLL AS - ZBLL AS 23",
    "group": "ZBLL - Anti-Sune - AS2",
    "alg": "R' U2 R' D' R U2 R' D R U' R U' R' U2 R",
    "algs": [
      "R' U2 R' D' R U2 R' D R U' R U' R' U2 R",
      "y R' U' R U' R' U R U' R' U R' F' R U R U' R' F R",
      "y R' U' R U' R' U y' R' U2 R U' R' U' R B",
      "F R U R2 U' R U' R U R2 U R2 U' R' U F'"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL AS - ZBLL AS 23 (AS2)"
  },
  {
    "id": "zbll_as_zbll_as_24",
    "name": "ZBLL AS 24",
    "title": "3x3 - ZBLL AS - ZBLL AS 24",
    "group": "ZBLL - Anti-Sune - AS2",
    "alg": "R' U' R U R' F R U R' U' R' F' R2",
    "algs": [
      "R' U' R U R' F R U R' U' R' F' R2",
      "y L U2 L' U2 R' U L2 U' R U L' U' L'",
      "y R U2 R' U2 R' F R2 U' R' U' R U R' F'",
      "R' U' R U R' F R U R' U' R' F' R2 U'"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL AS - ZBLL AS 24 (AS2)"
  },
  {
    "id": "zbll_as_zbll_as_25",
    "name": "ZBLL AS 25",
    "title": "3x3 - ZBLL AS - ZBLL AS 25",
    "group": "ZBLL - Anti-Sune - AS3",
    "alg": "y' R U2 R' U' R U R D R' U2 R D' R2",
    "algs": [
      "y' R U2 R' U' R U R D R' U2 R D' R2"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL AS - ZBLL AS 25 (AS3)"
  },
  {
    "id": "zbll_as_zbll_as_26",
    "name": "ZBLL AS 26",
    "title": "3x3 - ZBLL AS - ZBLL AS 26",
    "group": "ZBLL - Anti-Sune - AS3",
    "alg": "y2 R' U2 R' F' R U R U' R' F U2 R",
    "algs": [
      "y2 R' U2 R' F' R U R U' R' F U2 R",
      "U2 R' U2 R' F' R U R U' R' F U2 R U2"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL AS - ZBLL AS 26 (AS3)"
  },
  {
    "id": "zbll_as_zbll_as_27",
    "name": "ZBLL AS 27",
    "title": "3x3 - ZBLL AS - ZBLL AS 27",
    "group": "ZBLL - Anti-Sune - AS3",
    "alg": "R2 D' R U2 R' D R U R U' R' U2 R",
    "algs": [
      "R2 D' R U2 R' D R U R U' R' U2 R",
      "R' F' R U R' U' R' F R2 U' R' U R U' R' U2 R",
      "y2 L' U' L U F R U2 R' U' x U2 L U r'",
      "y L' U2 L R U R' F' R U R' U' R' F R2 U' R' U2 L' U2 L"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL AS - ZBLL AS 27 (AS3)"
  },
  {
    "id": "zbll_as_zbll_as_28",
    "name": "ZBLL AS 28",
    "title": "3x3 - ZBLL AS - ZBLL AS 28",
    "group": "ZBLL - Anti-Sune - AS3",
    "alg": "y2 F U R U' R' U R U' R2 F' R U2 R U2 R'",
    "algs": [
      "y2 F U R U' R' U R U' R2 F' R U2 R U2 R'",
      "y2 R U2 R2 D' R U' R' D R2 U R' U' R U' R'",
      "y R U2 R D R2 U' R U' R' U2 R2 D' R2",
      "y' L U2 F L' U' L U L F' L' U2 L'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL AS - ZBLL AS 28 (AS3)"
  },
  {
    "id": "zbll_as_zbll_as_29",
    "name": "ZBLL AS 29",
    "title": "3x3 - ZBLL AS - ZBLL AS 29",
    "group": "ZBLL - Anti-Sune - AS3",
    "alg": "y F U R U' R' U R U' R' U R2 D R' U' R D' R2 F'",
    "algs": [
      "y F U R U' R' U R U' R' U R2 D R' U' R D' R2 F'",
      "y' R' U2 R U R2 D' R U' R' D R2 U R' U' R U R' U R",
      "y2 R U R' U R2 D' R U' R' D R' U' R2 U2 R",
      "R U' R' F D U R U' R' U R U' R' D' R' F' R"
    ],
    "moves": 19,
    "desc": "3x3 - ZBLL AS - ZBLL AS 29 (AS3)"
  },
  {
    "id": "zbll_as_zbll_as_30",
    "name": "ZBLL AS 30",
    "title": "3x3 - ZBLL AS - ZBLL AS 30",
    "group": "ZBLL - Anti-Sune - AS3",
    "alg": "y2 L' U R U' L U R'",
    "algs": [
      "y2 L' U R U' L U R'",
      "R' U L U' R U L'",
      "y2 r' F R F' r U R'",
      "z D' R U R' D R U' z'"
    ],
    "moves": 8,
    "desc": "3x3 - ZBLL AS - ZBLL AS 30 (AS3)"
  },
  {
    "id": "zbll_as_zbll_as_31",
    "name": "ZBLL AS 31",
    "title": "3x3 - ZBLL AS - ZBLL AS 31",
    "group": "ZBLL - Anti-Sune - AS3",
    "alg": "y2 R' U R U R' U' R' D' R U R' D R U R U' R' U2 R",
    "algs": [
      "y2 R' U R U R' U' R' D' R U R' D R U R U' R' U2 R",
      "y' L' U R' U' R L U2 R' U' R2 U2 R' U' R U' R'",
      "y R U2 R' U' R U R D R' U R D' R' U' R' U R U R'",
      "y2 R U R' U R U L' U R' U L U L' U L"
    ],
    "moves": 20,
    "desc": "3x3 - ZBLL AS - ZBLL AS 31 (AS3)"
  },
  {
    "id": "zbll_as_zbll_as_32",
    "name": "ZBLL AS 32",
    "title": "3x3 - ZBLL AS - ZBLL AS 32",
    "group": "ZBLL - Anti-Sune - AS3",
    "alg": "y R U R2 F' R U R U R' U' R U' R' F R U' R'",
    "algs": [
      "y R U R2 F' R U R U R' U' R U' R' F R U' R'",
      "y2 D R' U' R D' R U' R' U R2 U R' U' R2",
      "y R2 U' R' U R2 U R' U' R D' R U' R' D",
      "R' U' R U' R' U' R U R' U' R' D' R U R' D R U2 R"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL AS - ZBLL AS 32 (AS3)"
  },
  {
    "id": "zbll_as_zbll_as_33",
    "name": "ZBLL AS 33",
    "title": "3x3 - ZBLL AS - ZBLL AS 33",
    "group": "ZBLL - Anti-Sune - AS3",
    "alg": "y' R U2 R' U' R U R D r' U2 r D' R2",
    "algs": [
      "y' R U2 R' U' R U R D r' U2 r D' R2",
      "y2 R' U2 R' D' R U R' D R U' R U R' U' R U R' U R",
      "y2 L' U R U' L R U R U R U' R' U' R2"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL AS - ZBLL AS 33 (AS3)"
  },
  {
    "id": "zbll_as_zbll_as_34",
    "name": "ZBLL AS 34",
    "title": "3x3 - ZBLL AS - ZBLL AS 34",
    "group": "ZBLL - Anti-Sune - AS3",
    "alg": "y' R U R U' R2 D U2 R' U' R U D' R",
    "algs": [
      "y' R U R U' R2 D U2 R' U' R U D' R",
      "y R U2 R' U' R U2 R F2 R' U R' U' R2 F2 R2",
      "S U' R U R U' R2 U R F R' f'",
      "y R U R' U R U' R' U R U2 R D' R U' R' D R U R"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL AS - ZBLL AS 34 (AS3)"
  },
  {
    "id": "zbll_as_zbll_as_35",
    "name": "ZBLL AS 35",
    "title": "3x3 - ZBLL AS - ZBLL AS 35",
    "group": "ZBLL - Anti-Sune - AS3",
    "alg": "y R D' U R U' R' U2 D R2 U' R U R",
    "algs": [
      "y R D' U R U' R' U2 D R2 U' R U R",
      "y' L U D' L U' L' U2 D L2 U' L U L",
      "y' F' U' f R U R2 U' R U R U' S'"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL AS - ZBLL AS 35 (AS3)"
  },
  {
    "id": "zbll_as_zbll_as_36",
    "name": "ZBLL AS 36",
    "title": "3x3 - ZBLL AS - ZBLL AS 36",
    "group": "ZBLL - Anti-Sune - AS3",
    "alg": "R2 D' r U2 r' D R U R U' R' U2 R",
    "algs": [
      "R2 D' r U2 r' D R U R U' R' U2 R",
      "y2 F R U' R' U R U R2 F' R U R U R' U' R U' R'",
      "y2 R' U' R F2 R' U R2 U2 R' U R U R' F2"
    ],
    "moves": 13,
    "desc": "3x3 - ZBLL AS - ZBLL AS 36 (AS3)"
  },
  {
    "id": "zbll_as_zbll_as_37",
    "name": "ZBLL AS 37",
    "title": "3x3 - ZBLL AS - ZBLL AS 37",
    "group": "ZBLL - Anti-Sune - AS4",
    "alg": "R U R' F' R U R' U' R' F R2 U R' U' R U' R'",
    "algs": [
      "R U R' F' R U R' U' R' F R2 U R' U' R U' R'",
      "y' R U2 R' U' R2 D R' U R D' R' U2 R'",
      "L R U2 R' U' R U2 L' U' R' U' R U' R'",
      "R' U' R U' R' U2 R' F2 R U2 R U2 R' F R U R' U' R' F R2 U2"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL AS - ZBLL AS 37 (AS4)"
  },
  {
    "id": "zbll_as_zbll_as_38",
    "name": "ZBLL AS 38",
    "title": "3x3 - ZBLL AS - ZBLL AS 38",
    "group": "ZBLL - Anti-Sune - AS4",
    "alg": "y2 f' L F L' U2 L' U2 L U2 S",
    "algs": [
      "y2 f' L F L' U2 L' U2 L U2 S",
      "y L' R' U R U' L R' U' R U2 R' U2 R",
      "y2 R2 U' R U' R2 D' R U R' D R U R U' R",
      "y' R U2 R2 D' R U2 R' D R2 U' R' U R U' R'"
    ],
    "moves": 11,
    "desc": "3x3 - ZBLL AS - ZBLL AS 38 (AS4)"
  },
  {
    "id": "zbll_as_zbll_as_39",
    "name": "ZBLL AS 39",
    "title": "3x3 - ZBLL AS - ZBLL AS 39",
    "group": "ZBLL - Anti-Sune - AS4",
    "alg": "y' F U R' U' R F' U' R' U2 R",
    "algs": [
      "y' F U R' U' R F' U' R' U2 R",
      "y2 L' R U' L U R' U2 L' U2 L",
      "x' M' U' R U L' U2 R' U2 R",
      "y2 x M U' L U R' U2 L' U2 L"
    ],
    "moves": 11,
    "desc": "3x3 - ZBLL AS - ZBLL AS 39 (AS4)"
  },
  {
    "id": "zbll_as_zbll_as_40",
    "name": "ZBLL AS 40",
    "title": "3x3 - ZBLL AS - ZBLL AS 40",
    "group": "ZBLL - Anti-Sune - AS4",
    "alg": "R' U' F' R U R' U' R' F R2 U' R' U R",
    "algs": [
      "R' U' F' R U R' U' R' F R2 U' R' U R",
      "y R U R D R' U R D' R2 U' R U' R'",
      "y R U2 R2 D' R U R' D R U2 R U' R'",
      "y' R U' R' U2 L' U R U' L2 U' R' U L'"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL AS - ZBLL AS 40 (AS4)"
  },
  {
    "id": "zbll_as_zbll_as_41",
    "name": "ZBLL AS 41",
    "title": "3x3 - ZBLL AS - ZBLL AS 41",
    "group": "ZBLL - Anti-Sune - AS4",
    "alg": "y R U R' U2 R U R' U' F' R U2 R' U' R U' R' F",
    "algs": [
      "y R U R' U2 R U R' U' F' R U2 R' U' R U' R' F",
      "y2 R2 D R' U2 R D' R U' R2 U' R' U R' U R",
      "y' L' U R U' L U' R D R' U2 R D' R2",
      "y R U R' U R' U' R' D R' U' R D' R U2 R"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL AS - ZBLL AS 41 (AS4)"
  },
  {
    "id": "zbll_as_zbll_as_42",
    "name": "ZBLL AS 42",
    "title": "3x3 - ZBLL AS - ZBLL AS 42",
    "group": "ZBLL - Anti-Sune - AS4",
    "alg": "R2 D' R U' R' D F R U R U' R' F' R",
    "algs": [
      "R2 D' R U' R' D F R U R U' R' F' R",
      "F U R' U' R F' R2 D' R U R' D R2",
      "y L' U R U' L U2 R' U' L' U R U' L R'",
      "R U2 R' U' R U' R D r' U2 r D' R' U2 R'"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL AS - ZBLL AS 42 (AS4)"
  },
  {
    "id": "zbll_as_zbll_as_43",
    "name": "ZBLL AS 43",
    "title": "3x3 - ZBLL AS - ZBLL AS 43",
    "group": "ZBLL - Anti-Sune - AS4",
    "alg": "y2 R2 D r' U2 r D' R2 U' R U' R'",
    "algs": [
      "y2 R2 D r' U2 r D' R2 U' R U' R'"
    ],
    "moves": 12,
    "desc": "3x3 - ZBLL AS - ZBLL AS 43 (AS4)"
  },
  {
    "id": "zbll_as_zbll_as_44",
    "name": "ZBLL AS 44",
    "title": "3x3 - ZBLL AS - ZBLL AS 44",
    "group": "ZBLL - Anti-Sune - AS4",
    "alg": "y R U R' U R U' R2 F R F' r U' r' U r U r'",
    "algs": [
      "y R U R' U R U' R2 F R F' r U' r' U r U r'",
      "R U R' U' R' U2 R U R' U R2 U r' F R' F' r",
      "R D' R U' R' D U' R' U R U R2 U' R' U R",
      "R' U' R U' R' U2 L' U2 L U L' U2 R U' L"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL AS - ZBLL AS 44 (AS4)"
  },
  {
    "id": "zbll_as_zbll_as_45",
    "name": "ZBLL AS 45",
    "title": "3x3 - ZBLL AS - ZBLL AS 45",
    "group": "ZBLL - Anti-Sune - AS4",
    "alg": "R U2 R' U' R U' R D R' U2 R D' R' U2 R'",
    "algs": [
      "R U2 R' U' R U' R D R' U2 R D' R' U2 R'",
      "R U2 R' U R U L U' R' U L' U R U' R'"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL AS - ZBLL AS 45 (AS4)"
  },
  {
    "id": "zbll_as_zbll_as_46",
    "name": "ZBLL AS 46",
    "title": "3x3 - ZBLL AS - ZBLL AS 46",
    "group": "ZBLL - Anti-Sune - AS4",
    "alg": "R U2 R' U' R' D' R U' R' D R2 U' R' U R U' R'",
    "algs": [
      "R U2 R' U' R' D' R U' R' D R2 U' R' U R U' R'",
      "y' R' U' R U' R' F' R U R' U' R' F R U R U' R' U2 R",
      "y' R' U' R U' R U R D R' U' R D' R U2 R",
      "y' R' U' R U R U' R' U2 R L U' R2 U L' U2 R"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL AS - ZBLL AS 46 (AS4)"
  },
  {
    "id": "zbll_as_zbll_as_47",
    "name": "ZBLL AS 47",
    "title": "3x3 - ZBLL AS - ZBLL AS 47",
    "group": "ZBLL - Anti-Sune - AS4",
    "alg": "y2 R2 D R' U2 R D' R2 U' R U' R'",
    "algs": [
      "y2 R2 D R' U2 R D' R2 U' R U' R'"
    ],
    "moves": 12,
    "desc": "3x3 - ZBLL AS - ZBLL AS 47 (AS4)"
  },
  {
    "id": "zbll_as_zbll_as_48",
    "name": "ZBLL AS 48",
    "title": "3x3 - ZBLL AS - ZBLL AS 48",
    "group": "ZBLL - Anti-Sune - AS4",
    "alg": "R U' R' U2 R U' R' U R' D' R U2 R' D R",
    "algs": [
      "R U' R' U2 R U' R' U R' D' R U2 R' D R",
      "R U R' F' R U2 R' U2 R' F R2 U' R'",
      "R U R' F' R U2 R' U2 R' F R2 U' R' U'",
      "y F R U R2 U2 R2 U R2 U R F'"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL AS - ZBLL AS 48 (AS4)"
  },
  {
    "id": "zbll_as_zbll_as_49",
    "name": "ZBLL AS 49",
    "title": "3x3 - ZBLL AS - ZBLL AS 49",
    "group": "ZBLL - Anti-Sune - AS5",
    "alg": "y R U' R' F' R U R' U' R' F R2 U' R' U2 R U' R'",
    "algs": [
      "y R U' R' F' R U R' U' R' F R2 U' R' U2 R U' R'",
      "R U2 L' U R' U' L U' R U' R'",
      "R U' R' U2 R U' R' U2 R' D' R U R' D R"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL AS - ZBLL AS 49 (AS5)"
  },
  {
    "id": "zbll_as_zbll_as_50",
    "name": "ZBLL AS 50",
    "title": "3x3 - ZBLL AS - ZBLL AS 50",
    "group": "ZBLL - Anti-Sune - AS5",
    "alg": "y' R U2 R2 U' R2 U' R' F U' R' U' R U F'",
    "algs": [
      "y' R U2 R2 U' R2 U' R' F U' R' U' R U F'",
      "y' R U2 R2 U' R2 F' R U R' U' R' F U' R'",
      "y' R U2 R2 U' R2 U' R' U2 R' F' R U R' U' R' F R2",
      "y' R U2 R' D R' U' R D' R2 U R' U' R' U' R'"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL AS - ZBLL AS 50 (AS5)"
  },
  {
    "id": "zbll_as_zbll_as_51",
    "name": "ZBLL AS 51",
    "title": "3x3 - ZBLL AS - ZBLL AS 51",
    "group": "ZBLL - Anti-Sune - AS5",
    "alg": "R U R' F' R U2 R' U' R U' R' F R U' R'",
    "algs": [
      "R U R' F' R U2 R' U' R U' R' F R U' R'",
      "y2 R' F R F' U2 R U' R' U' F R' F' R",
      "y2 F R U' R2 U' R U' R' U2 R2 U R' F'"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL AS - ZBLL AS 51 (AS5)"
  },
  {
    "id": "zbll_as_zbll_as_52",
    "name": "ZBLL AS 52",
    "title": "3x3 - ZBLL AS - ZBLL AS 52",
    "group": "ZBLL - Anti-Sune - AS5",
    "alg": "y2 R' U' R U' L U' R' U L' U2 R",
    "algs": [
      "y2 R' U' R U' L U' R' U L' U2 R",
      "L' U' L U' R U' L' U R' U2 L",
      "y' R D R' U R D' R' U2 R' U' R U2 R' U' R",
      "y2 R' F R f' U2 R U' R' U' f R' F' R"
    ],
    "moves": 12,
    "desc": "3x3 - ZBLL AS - ZBLL AS 52 (AS5)"
  },
  {
    "id": "zbll_as_zbll_as_53",
    "name": "ZBLL AS 53",
    "title": "3x3 - ZBLL AS - ZBLL AS 53",
    "group": "ZBLL - Anti-Sune - AS5",
    "alg": "y2 F R' F' R U R U' R2 F R U R' U' F' U R",
    "algs": [
      "y2 F R' F' R U R U' R2 F R U R' U' F' U R",
      "y' L' U R U' L U L' U R' U' L U R U' R'",
      "y' r R D R' U R U' D' L' U R' U' x'",
      "R' U2 R' D' R U R' D F R U R U' R' F' R"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL AS - ZBLL AS 53 (AS5)"
  },
  {
    "id": "zbll_as_zbll_as_54",
    "name": "ZBLL AS 54",
    "title": "3x3 - ZBLL AS - ZBLL AS 54",
    "group": "ZBLL - Anti-Sune - AS5",
    "alg": "y2 F R2 U R2 U R2 U2 R' U2 R' U' R U' R' F'",
    "algs": [
      "y2 F R2 U R2 U R2 U2 R' U2 R' U' R U' R' F'",
      "F' U2 R' D R U' R' D' R f R' F R f'",
      "R U2 R' U' F2 R U2 R' U2 R' F2 R2 U' R'",
      "R U2 R' U' R U L' U L U2 R' U' L' U2 L"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL AS - ZBLL AS 54 (AS5)"
  },
  {
    "id": "zbll_as_zbll_as_55",
    "name": "ZBLL AS 55",
    "title": "3x3 - ZBLL AS - ZBLL AS 55",
    "group": "ZBLL - Anti-Sune - AS5",
    "alg": "y' F U' R' U R U F' R' U R U' R' U2 R",
    "algs": [
      "y' F U' R' U R U F' R' U R U' R' U2 R",
      "y R' U2 L U' R U L' R' U R U' R' U2 R",
      "y' R U R' U R U' R' U r' F R F' r U2 R'"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL AS - ZBLL AS 55 (AS5)"
  },
  {
    "id": "zbll_as_zbll_as_56",
    "name": "ZBLL AS 56",
    "title": "3x3 - ZBLL AS - ZBLL AS 56",
    "group": "ZBLL - Anti-Sune - AS5",
    "alg": "y' F R U' R' U R U2 R' U' F' R U R' U' R' F R F'",
    "algs": [
      "y' F R U' R' U R U2 R' U' F' R U R' U' R' F R F'",
      "y' R U2 R' U' R U R' r' F R F' r U2 R'",
      "y' R U2 R' U' R U R' L' U R U' L U2 R'",
      "y R' F' U' F U R F R U R' U' R U R' U' F'"
    ],
    "moves": 19,
    "desc": "3x3 - ZBLL AS - ZBLL AS 56 (AS5)"
  },
  {
    "id": "zbll_as_zbll_as_57",
    "name": "ZBLL AS 57",
    "title": "3x3 - ZBLL AS - ZBLL AS 57",
    "group": "ZBLL - Anti-Sune - AS5",
    "alg": "y' R2 U R2 F' R U R' U R U2 R' F R2 U' R2",
    "algs": [
      "y' R2 U R2 F' R U R' U R U2 R' F R2 U' R2",
      "y R U R' U L' U2 R U2 L U2 L' R' U2 L",
      "y' R U2 R' F' R U R' U F U F' U R' F R2 U' R'",
      "R U' R D R2 U2 R U R' U R2 D' R' U R'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL AS - ZBLL AS 57 (AS5)"
  },
  {
    "id": "zbll_as_zbll_as_58",
    "name": "ZBLL AS 58",
    "title": "3x3 - ZBLL AS - ZBLL AS 58",
    "group": "ZBLL - Anti-Sune - AS5",
    "alg": "y' F R U R' U' R U R' F R' F' R U' F'",
    "algs": [
      "y' F R U R' U' R U R' F R' F' R U' F'",
      "y L' U2 R U' R' U2 L R U R' U' R U R' U' R U' R'"
    ],
    "moves": 15,
    "desc": "3x3 - ZBLL AS - ZBLL AS 58 (AS5)"
  },
  {
    "id": "zbll_as_zbll_as_59",
    "name": "ZBLL AS 59",
    "title": "3x3 - ZBLL AS - ZBLL AS 59",
    "group": "ZBLL - Anti-Sune - AS5",
    "alg": "y2 R' U F' R U R' U' R' F R U2 R U2 R' U' R",
    "algs": [
      "y2 R' U F' R U R' U' R' F R U2 R U2 R' U' R",
      "y' R2 U' R2 B R' U2 R U R' U R B' R2 U R2",
      "y2 R' U R' D' R2 U R' U R U2 R2 D R U' R",
      "y2 R U L' U R U' L U' R U' R U R' U2 R2"
    ],
    "moves": 17,
    "desc": "3x3 - ZBLL AS - ZBLL AS 59 (AS5)"
  },
  {
    "id": "zbll_as_zbll_as_60",
    "name": "ZBLL AS 60",
    "title": "3x3 - ZBLL AS - ZBLL AS 60",
    "group": "ZBLL - Anti-Sune - AS5",
    "alg": "y' R U' R2 D' U' R U' R' U2 D R2 U R'",
    "algs": [
      "y' R U' R2 D' U' R U' R' U2 D R2 U R'",
      "y R' U R2 U2 D R' U' R D' U' R2 U' R",
      "y L R U2 R' U' L' U2 R' U L U' R2 U R' U L'"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL AS - ZBLL AS 60 (AS5)"
  },
  {
    "id": "zbll_as_zbll_as_61",
    "name": "ZBLL AS 61",
    "title": "3x3 - ZBLL AS - ZBLL AS 61",
    "group": "ZBLL - Anti-Sune - AS6",
    "alg": "y R2 U R2 U R' U2 R' U R U R' U' R2",
    "algs": [
      "y R2 U R2 U R' U2 R' U R U R' U' R2",
      "R' U' R U' R' U R U' R U R2 U R U' R U' R'",
      "y' F R U R' U F' U' F U' R U R' U' F'",
      "R' U' R U' R2 U' R' U' R' U R U R U' R"
    ],
    "moves": 14,
    "desc": "3x3 - ZBLL AS - ZBLL AS 61 (AS6)"
  },
  {
    "id": "zbll_as_zbll_as_62",
    "name": "ZBLL AS 62",
    "title": "3x3 - ZBLL AS - ZBLL AS 62",
    "group": "ZBLL - Anti-Sune - AS6",
    "alg": "y R' U' R U R U2 R' U' R U' R' U R' U R",
    "algs": [
      "y R' U' R U R U2 R' U' R U' R' U R' U R",
      "y R2 U R2 U R U2 R' U R U R U' R2",
      "y R U2 R' U' R U' R' U' R U' R U R U R U' R' U' R2",
      "y2 S' l' U' L U' L' U2 l U2 S"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL AS - ZBLL AS 62 (AS6)"
  },
  {
    "id": "zbll_as_zbll_as_63",
    "name": "ZBLL AS 63",
    "title": "3x3 - ZBLL AS - ZBLL AS 63",
    "group": "ZBLL - Anti-Sune - AS6",
    "alg": "y2 R U R' U R' U' R U' R' U2 R U R U' R'",
    "algs": [
      "y2 R U R' U R' U' R U' R' U2 R U R U' R'",
      "R' U' R U' R' U' R' U' R' U' R' U R U R2",
      "y R2 U' R U R U R' U2 R U R2 U R2",
      "y' R2 F2 R' U2 R' U' R U' R F2 R2"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL AS - ZBLL AS 63 (AS6)"
  },
  {
    "id": "zbll_as_zbll_as_64",
    "name": "ZBLL AS 64",
    "title": "3x3 - ZBLL AS - ZBLL AS 64",
    "group": "ZBLL - Anti-Sune - AS6",
    "alg": "y' R' U' R U' R U R2 U R U' R U R' U' R U' R'",
    "algs": [
      "y' R' U' R U' R U R2 U R U' R U R' U' R U' R'",
      "y R U R' U' R U R2 U' R2 U' R' U R U' R' U R' U R",
      "y R U2 R' U' R U' R2 U R' U' R3 U' R' U R U R2",
      "y R2 U' R' U R U R' U2 R' U R2 U R2"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL AS - ZBLL AS 64 (AS6)"
  },
  {
    "id": "zbll_as_zbll_as_65",
    "name": "ZBLL AS 65",
    "title": "3x3 - ZBLL AS - ZBLL AS 65",
    "group": "ZBLL - Anti-Sune - AS6",
    "alg": "R' U' R2 U R2 U R2 U2 R2 U2 R",
    "algs": [
      "R' U' R2 U R2 U R2 U2 R2 U2 R",
      "y R U2 R' U' R U' R' U R U' R U R U R U' R' U' R2",
      "y2 R U R2 U' R' U' R U R' U' R2 U2 R",
      "y' R' U2 R U2 R U2 R' U' R U' R2 U2 R"
    ],
    "moves": 11,
    "desc": "3x3 - ZBLL AS - ZBLL AS 65 (AS6)"
  },
  {
    "id": "zbll_as_zbll_as_66",
    "name": "ZBLL AS 66",
    "title": "3x3 - ZBLL AS - ZBLL AS 66",
    "group": "ZBLL - Anti-Sune - AS6",
    "alg": "y R U2 R' U' R U' R'",
    "algs": [
      "y R U2 R' U' R U' R'",
      "y' L U2 L' U' L U' L'",
      "y' M' U2 R U2 M R' U' R U' R' U2",
      "y R U2 R' U' R U' R' U2"
    ],
    "moves": 8,
    "desc": "3x3 - ZBLL AS - ZBLL AS 66 (AS6)"
  },
  {
    "id": "zbll_as_zbll_as_67",
    "name": "ZBLL AS 67",
    "title": "3x3 - ZBLL AS - ZBLL AS 67",
    "group": "ZBLL - Anti-Sune - AS6",
    "alg": "R U2 R2 U2 R2 U R2 U R2 U' R'",
    "algs": [
      "R U2 R2 U2 R2 U R2 U R2 U' R'",
      "R U2 R2 U' R U' R' U2 R U2 R U2 R'",
      "R' U' R U' R' U2 R U' R U' R U R U R U' R' U' R2",
      "y R U2 R2 U' R' U R U' R' U' R2 U R"
    ],
    "moves": 11,
    "desc": "3x3 - ZBLL AS - ZBLL AS 67 (AS6)"
  },
  {
    "id": "zbll_as_zbll_as_68",
    "name": "ZBLL AS 68",
    "title": "3x3 - ZBLL AS - ZBLL AS 68",
    "group": "ZBLL - Anti-Sune - AS6",
    "alg": "R' U' R U' R' U2 R",
    "algs": [
      "R' U' R U' R' U2 R",
      "y2 r' F' r U' r' F2 r",
      "y R U' R' U' R U R' U R U' R' U R U2 R' U2 R U' R'",
      "R' U' R U' R' U2 R U2"
    ],
    "moves": 7,
    "desc": "3x3 - ZBLL AS - ZBLL AS 68 (AS6)"
  },
  {
    "id": "zbll_as_zbll_as_69",
    "name": "ZBLL AS 69",
    "title": "3x3 - ZBLL AS - ZBLL AS 69",
    "group": "ZBLL - Anti-Sune - AS6",
    "alg": "y R U R' U' R' U' R U R U' R' U' R' U R",
    "algs": [
      "y R U R' U' R' U' R U R U' R' U' R' U R",
      "y R U2 R2 U' R' U' R' U R U R2 U' R'"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL AS - ZBLL AS 69 (AS6)"
  },
  {
    "id": "zbll_as_zbll_as_70",
    "name": "ZBLL AS 70",
    "title": "3x3 - ZBLL AS - ZBLL AS 70",
    "group": "ZBLL - Anti-Sune - AS6",
    "alg": "y R' U' R U R U2 R' U' R' U R U' R U' R'",
    "algs": [
      "y R' U' R U R U2 R' U' R' U R U' R U' R'",
      "R' U' R U' R U R' U' R' U2 R U R U' R'",
      "y R2 U R U R2 U' R' U' R2 U' R U' R'",
      "R' U' R U' R2 U' R' U' R2 U R U R2"
    ],
    "moves": 16,
    "desc": "3x3 - ZBLL AS - ZBLL AS 70 (AS6)"
  },
  {
    "id": "zbll_as_zbll_as_71",
    "name": "ZBLL AS 71",
    "title": "3x3 - ZBLL AS - ZBLL AS 71",
    "group": "ZBLL - Anti-Sune - AS6",
    "alg": "y2 R U R' U R' U' R2 U' R2 U2 R",
    "algs": [
      "y2 R U R' U R' U' R2 U' R2 U2 R",
      "y R U2 R2 U' R2 U' R' U R' U R",
      "y2 r U R' U R' U' R2 U' r' R' U2 R",
      "y' R U' R' U' R U' R' U R U' R' U R U R' U' R U2 R'"
    ],
    "moves": 12,
    "desc": "3x3 - ZBLL AS - ZBLL AS 71 (AS6)"
  },
  {
    "id": "zbll_as_zbll_as_72",
    "name": "ZBLL AS 72",
    "title": "3x3 - ZBLL AS - ZBLL AS 72",
    "group": "ZBLL - Anti-Sune - AS6",
    "alg": "y' R2 D' R U2 R' D R U R' F R U R U' R' F' R",
    "algs": [
      "y' R2 D' R U2 R' D R U R' F R U R U' R' F' R",
      "R' F2 R D R' D' F2 U' R2 U R' U' R2",
      "R2 U' S R2 S' R2 U R U' R U' R' U2 R",
      "y R U' R U R' U R U2 R' U' R' U' R U' R' U R U' R'"
    ],
    "moves": 18,
    "desc": "3x3 - ZBLL AS - ZBLL AS 72 (AS6)"
  },
  {
    "id": "cmll_sune",
    "name": "CMLL Sune",
    "group": "Roux CMLL",
    "alg": "R U R' U R U2 R'",
    "algs": [
      "R U R' U R U2 R'",
      "L' U' L U' L' U2 L"
    ],
    "moves": 7,
    "desc": "Standard Sune with preserved blocks"
  },
  {
    "id": "cmll_antisune",
    "name": "CMLL Anti-Sune",
    "group": "Roux CMLL",
    "alg": "R' U' R U' R' U2 R",
    "algs": [
      "R' U' R U' R' U2 R",
      "L U L' U L U2 L'"
    ],
    "moves": 7,
    "desc": "Anti-Sune with preserved blocks"
  },
  {
    "id": "cmll_u_forward",
    "name": "CMLL U Forward",
    "group": "Roux CMLL",
    "alg": "R2 D R' U2 R D' R' U2 R'",
    "algs": [
      "R2 D R' U2 R D' R' U2 R'",
      "y' R' U' R U' R' U2 R"
    ],
    "moves": 9,
    "desc": "Headlights case"
  },
  {
    "id": "cmll_pi_diag",
    "name": "CMLL Pi Diagonal",
    "group": "Roux CMLL",
    "alg": "r U' r2 U r2 U r2 U' r",
    "algs": [
      "r U' r2 U r2 U r2 U' r",
      "F R U R' U' R U R' U' F'"
    ],
    "moves": 9,
    "desc": "Diagonal corners swap Pi"
  },
  {
    "id": "cmll_t_headlights",
    "name": "CMLL T Headlights",
    "group": "Roux CMLL",
    "alg": "r' U r U2 R2 F R F' R",
    "algs": [
      "r' U r U2 R2 F R F' R",
      "L' U' L U L F' L' F"
    ],
    "moves": 9,
    "desc": "T shape with headlights"
  },
  {
    "id": "cmll_l_mirror",
    "name": "CMLL L Mirror",
    "group": "Roux CMLL",
    "alg": "F R' F' R U R U' R'",
    "algs": [
      "F R' F' R U R U' R'",
      "R' U2 R U2 R' F R U R' U' F'"
    ],
    "moves": 8,
    "desc": "L shape CMLL case"
  },
  {
    "id": "cmll_h_column",
    "name": "CMLL H Column",
    "group": "Roux CMLL",
    "alg": "R U R' U R U' R' U R U2 R'",
    "algs": [
      "R U R' U R U' R' U R U2 R'",
      "F R U R' U' R U R' U' R U R' U' F'"
    ],
    "moves": 11,
    "desc": "H shape CMLL case"
  },
  {
    "id": "chichu_e_ae",
    "code": "AE",
    "name": "彳亍棱块 [AE] (UF -> UB -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [AE]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L2 U' S U2 S' U' L2",
    "algs": [
      "L2 U' S U2 S' U' L2",
      "U' L' U' L S L' U L S' U",
      "R U' L' U' L S L' U L S' U R'",
      "R' U' L' U' L S L' U L S' U R"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [AE] (缓冲 UF, UB(U) -> UL(U))"
  },
  {
    "id": "chichu_e_af",
    "code": "AF",
    "name": "彳亍棱块 [AF] (UF -> UB -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [AF]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "M2 D2 M' U' M D2 M' U M'",
    "algs": [
      "M2 D2 M' U' M D2 M' U M'",
      "M' U M' D2 M U' M' D2 M2"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [AF] (缓冲 UF, UB(U) -> UL(L))"
  },
  {
    "id": "chichu_e_ag",
    "code": "AG",
    "name": "彳亍棱块 [AG] (UF -> UB -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [AG]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R2 U S' U2 S U R2",
    "algs": [
      "R2 U S' U2 S U R2",
      "R2 U S' M' U2 M S M' U2 M U' R2",
      "R2 U' M' U2 M S' M' U2 M S U R2",
      "R2 U S' M U2 M' S M U2 M' U' R2"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [AG] (缓冲 UF, UB(U) -> UR(U))"
  },
  {
    "id": "chichu_e_ah",
    "code": "AH",
    "name": "彳亍棱块 [AH] (UF -> UB -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [AH]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "M2 D2 M' U M D2 M' U' M'",
    "algs": [
      "M2 D2 M' U M D2 M' U' M'",
      "M' U' M' D2 M U M' D2 M2"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [AH] (缓冲 UF, UB(U) -> UR(R))"
  },
  {
    "id": "chichu_e_ai",
    "code": "AI",
    "name": "彳亍棱块 [AI] (UF -> UB -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [AI]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L U' S U2 S' U' L'",
    "algs": [
      "L U' S U2 S' U' L'",
      "L' U' L' U' L S L' U L S' U L",
      "L' U' L U' L' S L U L' S' U L",
      "U' L' U2 L S L' U2 L S' U"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [AI] (缓冲 UF, UB(U) -> FL(F))"
  },
  {
    "id": "chichu_e_aj",
    "code": "AJ",
    "name": "彳亍棱块 [AJ] (UF -> UB -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [AJ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' L' S L U2 L' S' L U'",
    "algs": [
      "U' L' S L U2 L' S' L U'",
      "U' R' E R U2 R' E' R U'",
      "B' E2 R' F' R E2 R' F R B",
      "B' E2 F' L F L' E2 L F' L' F B"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [AJ] (缓冲 UF, UB(U) -> FL(L))"
  },
  {
    "id": "chichu_e_ak",
    "code": "AK",
    "name": "彳亍棱块 [AK] (UF -> UB -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [AK]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R' U S' U2 S U R",
    "algs": [
      "R' U S' U2 S U R",
      "R' U S' M' U2 M S M' U2 M U' R",
      "R' U' M' U2 M S' M' U2 M S U R",
      "R' U S' M U2 M' S M U2 M' U' R"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [AK] (缓冲 UF, UB(U) -> FR(F))"
  },
  {
    "id": "chichu_e_al",
    "code": "AL",
    "name": "彳亍棱块 [AL] (UF -> UB -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [AL]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U R S' R' U2 R S R' U",
    "algs": [
      "U R S' R' U2 R S R' U",
      "U L E' L' U2 L E L' U",
      "B E2 F R' F' R E2 R' F R F' B'",
      "Rw' D' M' U2 M D M' U2 M Rw"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [AL] (缓冲 UF, UB(U) -> FR(R))"
  },
  {
    "id": "chichu_e_am",
    "code": "AM",
    "name": "彳亍棱块 [AM] (UF -> UB -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [AM]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L' U' S U2 S' U' L",
    "algs": [
      "L' U' S U2 S' U' L",
      "F' L R U' R' S R U R' S' L' F",
      "F' L R' U' R S R' U R S' L' F",
      "L U' L' U' L S L' U L S' U L'"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [AM] (缓冲 UF, UB(U) -> BL(B))"
  },
  {
    "id": "chichu_e_an",
    "code": "AN",
    "name": "彳亍棱块 [AN] (UF -> UB -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [AN]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' L S L' U2 L S' L' U'",
    "algs": [
      "U' L S L' U2 L S' L' U'",
      "U' R E' R' U2 R E R' U'",
      "Lw' M U2 M' D' M U2 M' D Lw",
      "x M U2 M' D' M U2 M' D x'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [AN] (缓冲 UF, UB(U) -> BL(L))"
  },
  {
    "id": "chichu_e_ao",
    "code": "AO",
    "name": "彳亍棱块 [AO] (UF -> UB -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [AO]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R U S' U2 S U R'",
    "algs": [
      "R U S' U2 S U R'",
      "F R S' L' U L S L' U' L R' F'",
      "F R S' L U L' S L U' L' R' F'",
      "R U S' M' U2 M S M' U2 M U' R'"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [AO] (缓冲 UF, UB(U) -> BR(B))"
  },
  {
    "id": "chichu_e_ap",
    "code": "AP",
    "name": "彳亍棱块 [AP] (UF -> UB -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [AP]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U R' S' R U2 R' S R U",
    "algs": [
      "U R' S' R U2 R' S R U",
      "U L' E L U2 L' E' L U",
      "Rw M U2 M' D M U2 M' D' Rw'",
      "x M U2 M' D M U2 M' D' x'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [AP] (缓冲 UF, UB(U) -> BR(R))"
  },
  {
    "id": "chichu_e_aq",
    "code": "AQ",
    "name": "彳亍棱块 [AQ] (UF -> UB -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [AQ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U2 M' U2 M",
    "algs": [
      "U2 M' U2 M",
      "R U2 M' U2 M R'",
      "R' U2 M' U2 M R",
      "R2 U2 M' U2 M R2"
    ],
    "moves": 4,
    "desc": "三阶彳亍棱块三循环 [AQ] (缓冲 UF, UB(U) -> DF(D))"
  },
  {
    "id": "chichu_e_ar",
    "code": "AR",
    "name": "彳亍棱块 [AR] (UF -> UB -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [AR]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "B' D R D' M D R' D' M' B",
    "algs": [
      "B' D R D' M D R' D' M' B",
      "B' L D R D' M D R' D' M' L' B",
      "B D' L' D M D' L D M' B'",
      "B R D' L' D M D' L D M' R' B'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [AR] (缓冲 UF, UB(U) -> DF(F))"
  },
  {
    "id": "chichu_e_as",
    "code": "AS",
    "name": "彳亍棱块 [AS] (UF -> UB -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [AS]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' S U2 S' U'",
    "algs": [
      "U' S U2 S' U'",
      "R U' S U2 S' U' R'",
      "R' U' S U2 S' U' R",
      "R2 U' S U2 S' U' R2"
    ],
    "moves": 5,
    "desc": "三阶彳亍棱块三循环 [AS] (缓冲 UF, UB(U) -> DL(D))"
  },
  {
    "id": "chichu_e_at",
    "code": "AT",
    "name": "彳亍棱块 [AT] (UF -> UB -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [AT]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "M D M' U2 M D' M' U2",
    "algs": [
      "M D M' U2 M D' M' U2",
      "Rw' D M' U2 M D' M' U2 M Rw",
      "U2 M' D' M U2 M' D M",
      "Rw M U2 M' D' M U2 M' D Rw'"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [AT] (缓冲 UF, UB(U) -> DL(L))"
  },
  {
    "id": "chichu_e_au",
    "code": "AU",
    "name": "彳亍棱块 [AU] (UF -> UB -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [AU]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "M U2 M' U2",
    "algs": [
      "M U2 M' U2",
      "Rw' U2 M' U2 M Rw",
      "Lw U2 M' U2 M Lw'",
      "x' U2 M' U2 M x"
    ],
    "moves": 4,
    "desc": "三阶彳亍棱块三循环 [AU] (缓冲 UF, UB(U) -> DB(D))"
  },
  {
    "id": "chichu_e_av",
    "code": "AV",
    "name": "彳亍棱块 [AV] (UF -> UB -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [AV]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "B' E L U L' E' L U' L' B",
    "algs": [
      "B' E L U L' E' L U' L' B",
      "B E' R' U' R E R' U R B'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [AV] (缓冲 UF, UB(U) -> DB(B))"
  },
  {
    "id": "chichu_e_aw",
    "code": "AW",
    "name": "彳亍棱块 [AW] (UF -> UB -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [AW]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U S' U2 S U",
    "algs": [
      "U S' U2 S U",
      "L U S' U2 S U L'",
      "L' U S' U2 S U L",
      "L2 U S' U2 S U L2"
    ],
    "moves": 5,
    "desc": "三阶彳亍棱块三循环 [AW] (缓冲 UF, UB(U) -> DR(D))"
  },
  {
    "id": "chichu_e_ax",
    "code": "AX",
    "name": "彳亍棱块 [AX] (UF -> UB -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [AX]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U2 M' D M U2 M' D' M",
    "algs": [
      "U2 M' D M U2 M' D' M",
      "Lw' M U2 M' D M U2 M' D' Lw",
      "M D' M' U2 M D M' U2",
      "Lw D' M' U2 M D M' U2 M Lw'"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [AX] (缓冲 UF, UB(U) -> DR(R))"
  },
  {
    "id": "chichu_e_be",
    "code": "BE",
    "name": "彳亍棱块 [BE] (UF -> UB -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [BE]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U S L' U L S' L' U' L U'",
    "algs": [
      "U S L' U L S' L' U' L U'",
      "R U S L' U L S' L' U' L U' R'",
      "R' U S L' U L S' L' U' L U' R",
      "R2 U S L' U L S' L' U' L U' R2"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [BE] (缓冲 UF, UB(B) -> UL(U))"
  },
  {
    "id": "chichu_e_bf",
    "code": "BF",
    "name": "彳亍棱块 [BF] (UF -> UB -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [BF]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L M' U' L' U M U' L U L'",
    "algs": [
      "L M' U' L' U M U' L U L'",
      "L D M' U' L' U M U' L U D' L'",
      "L D' M' U' L' U M U' L U D L'",
      "D L M' U' L' U M U' L U L' D'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [BF] (缓冲 UF, UB(B) -> UL(L))"
  },
  {
    "id": "chichu_e_bg",
    "code": "BG",
    "name": "彳亍棱块 [BG] (UF -> UB -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [BG]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U S L' U' L S' L' U L U'",
    "algs": [
      "U S L' U' L S' L' U L U'",
      "L U S L' U' L S' L' U L U' L'",
      "L' U S L' U' L S' L' U L U' L",
      "B L S L' U' L S' L' U B'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [BG] (缓冲 UF, UB(B) -> UR(U))"
  },
  {
    "id": "chichu_e_bh",
    "code": "BH",
    "name": "彳亍棱块 [BH] (UF -> UB -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [BH]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R' M' U R U' M U R' U' R",
    "algs": [
      "R' M' U R U' M U R' U' R",
      "R' D M' U R U' M U R' U' D' R",
      "R' D' M' U R U' M U R' U' D R",
      "D R' M' U R U' M U R' U' R D'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [BH] (缓冲 UF, UB(B) -> UR(R))"
  },
  {
    "id": "chichu_e_bi",
    "code": "BI",
    "name": "彳亍棱块 [BI] (UF -> UB -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [BI]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U L' U M' U' L U M U2",
    "algs": [
      "U L' U M' U' L U M U2",
      "y2 U R' U' M' U R U' M y2",
      "E' M' U' L U M U' L' U E",
      "d' M' U' L U M U' L' U d"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [BI] (缓冲 UF, UB(B) -> FL(F))"
  },
  {
    "id": "chichu_e_bj",
    "code": "BJ",
    "name": "彳亍棱块 [BJ] (UF -> UB -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [BJ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "M' U' L' U M U' L U",
    "algs": [
      "M' U' L' U M U' L U",
      "D M' U' L' U M U' L U D'",
      "D' M' U' L' U M U' L U D",
      "D2 M' U' L' U M U' L U D2"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [BJ] (缓冲 UF, UB(B) -> FL(L))"
  },
  {
    "id": "chichu_e_bk",
    "code": "BK",
    "name": "彳亍棱块 [BK] (UF -> UB -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [BK]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' R U' M' U R' U' M U2",
    "algs": [
      "U' R U' M' U R' U' M U2",
      "E' M' U' L' U M U' L U E",
      "d' M' U' L' U M U' L U d",
      "Dw' M' U' L' U M U' L U Dw"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [BK] (缓冲 UF, UB(B) -> FR(F))"
  },
  {
    "id": "chichu_e_bl",
    "code": "BL",
    "name": "彳亍棱块 [BL] (UF -> UB -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [BL]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "M' U R U' M U R' U'",
    "algs": [
      "M' U R U' M U R' U'",
      "D M' U R U' M U R' U' D'",
      "D' M' U R U' M U R' U' D",
      "D2 M' U R U' M U R' U' D2"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [BL] (缓冲 UF, UB(B) -> FR(R))"
  },
  {
    "id": "chichu_e_bm",
    "code": "BM",
    "name": "彳亍棱块 [BM] (UF -> UB -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [BM]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U L U M' U' L' U M U2",
    "algs": [
      "U L U M' U' L' U M U2",
      "y2 M R' F R F' M' F R' F' R y2",
      "E L F' L' F M F' L F L' M' E'",
      "d L F' L' F M F' L F L' M' d'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [BM] (缓冲 UF, UB(B) -> BL(B))"
  },
  {
    "id": "chichu_e_bn",
    "code": "BN",
    "name": "彳亍棱块 [BN] (UF -> UB -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [BN]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "M' U' L U M U' L' U",
    "algs": [
      "M' U' L U M U' L' U",
      "D M' U' L U M U' L' U D'",
      "D' M' U' L U M U' L' U D",
      "D2 M' U' L U M U' L' U D2"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [BN] (缓冲 UF, UB(B) -> BL(L))"
  },
  {
    "id": "chichu_e_bo",
    "code": "BO",
    "name": "彳亍棱块 [BO] (UF -> UB -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [BO]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' R' U' M' U R U' M U2",
    "algs": [
      "U' R' U' M' U R U' M U2",
      "E M' U' L U M U' L' U E'",
      "d M' U' L U M U' L' U d'",
      "Dw M' U' L U M U' L' U Dw'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [BO] (缓冲 UF, UB(B) -> BR(B))"
  },
  {
    "id": "chichu_e_bp",
    "code": "BP",
    "name": "彳亍棱块 [BP] (UF -> UB -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [BP]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "M' U R' U' M U R U'",
    "algs": [
      "M' U R' U' M U R U'",
      "D M' U R' U' M U R U' D'",
      "D' M' U R' U' M U R U' D",
      "D2 M' U R' U' M U R U' D2"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [BP] (缓冲 UF, UB(B) -> BR(R))"
  },
  {
    "id": "chichu_e_bq",
    "code": "BQ",
    "name": "彳亍棱块 [BQ] (UF -> UB -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [BQ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U S R' F' R S' R' F R U'",
    "algs": [
      "U S R' F' R S' R' F R U'",
      "R U S R' F' R S' R' F R U' R'",
      "R' U S R' F' R S' R' F R U' R",
      "L U S R' F' R S' R' F R U' L'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [BQ] (缓冲 UF, UB(B) -> DF(D))"
  },
  {
    "id": "chichu_e_br",
    "code": "BR",
    "name": "彳亍棱块 [BR] (UF -> UB -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [BR]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F E R U R' E' R U' R' F'",
    "algs": [
      "F E R U R' E' R U' R' F'",
      "F' E' L' U' L E L' U L F"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [BR] (缓冲 UF, UB(B) -> DF(F))"
  },
  {
    "id": "chichu_e_bs",
    "code": "BS",
    "name": "彳亍棱块 [BS] (UF -> UB -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [BS]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' L' E L' U2 L E' L' U2 L2 U",
    "algs": [
      "U' L' E L' U2 L E' L' U2 L2 U",
      "U' L E' L U2 L' E L U2 L2 U",
      "U R' L2 S R S' L2 S R' S' R U'",
      "U R L2 S R' S' L2 S R S' R' U'"
    ],
    "moves": 11,
    "desc": "三阶彳亍棱块三循环 [BS] (缓冲 UF, UB(B) -> DL(D))"
  },
  {
    "id": "chichu_e_bt",
    "code": "BT",
    "name": "彳亍棱块 [BT] (UF -> UB -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [BT]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U R' S R U2 R' S' R U",
    "algs": [
      "U R' S R U2 R' S' R U",
      "U R S R' U2 R S' R' U",
      "L2 U' S' R U R' S R U' R' U L2",
      "L2 U' S' R' U R S R' U' R U L2"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [BT] (缓冲 UF, UB(B) -> DL(L))"
  },
  {
    "id": "chichu_e_bu",
    "code": "BU",
    "name": "彳亍棱块 [BU] (UF -> UB -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [BU]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F U R U' M U R' U' M' F'",
    "algs": [
      "F U R U' M U R' U' M' F'",
      "F L' U R U' M U R' U' M' L F'",
      "F' U' L' U M U' L U M' F",
      "F' R U' L' U M U' L U M' R' F"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [BU] (缓冲 UF, UB(B) -> DB(D))"
  },
  {
    "id": "chichu_e_bv",
    "code": "BV",
    "name": "彳亍棱块 [BV] (UF -> UB -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [BV]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D' R M' U R U' M U R' U' R' D",
    "algs": [
      "D' R M' U R U' M U R' U' R' D",
      "D L' M' U' L' U M U' L U L D'",
      "D' R' M' U R' U' M U R U' R D",
      "D L M' U' L U M U' L' U L' D'"
    ],
    "moves": 12,
    "desc": "三阶彳亍棱块三循环 [BV] (缓冲 UF, UB(B) -> DB(B))"
  },
  {
    "id": "chichu_e_bw",
    "code": "BW",
    "name": "彳亍棱块 [BW] (UF -> UB -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [BW]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "y S R' F' R S' R' F R y'",
    "algs": [
      "y S R' F' R S' R' F R y'",
      "R U S D R D' S' D R' D' U' R'",
      "R U S F R' F' R S' R' F R F' U' R'",
      "R2 U R U R' S' R U' R' S U' R2"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [BW] (缓冲 UF, UB(B) -> DR(D))"
  },
  {
    "id": "chichu_e_bx",
    "code": "BX",
    "name": "彳亍棱块 [BX] (UF -> UB -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [BX]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R M' U R U' M U R' U' R'",
    "algs": [
      "R M' U R U' M U R' U' R'",
      "R D M' U R U' M U R' U' D' R'",
      "R D' M' U R U' M U R' U' D R'",
      "R' M' U R' U' M U R U' R"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [BX] (缓冲 UF, UB(B) -> DR(R))"
  },
  {
    "id": "chichu_e_ea",
    "code": "EA",
    "name": "彳亍棱块 [EA] (UF -> UL -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [EA]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L2 U S U2 S' U L2",
    "algs": [
      "L2 U S U2 S' U L2",
      "L2 U S M' U2 M S' M' U2 M U' L2",
      "L2 U' M' U2 M S M' U2 M S' U L2",
      "L2 U S M U2 M' S' M U2 M' U' L2"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [EA] (缓冲 UF, UL(U) -> UB(U))"
  },
  {
    "id": "chichu_e_eb",
    "code": "EB",
    "name": "彳亍棱块 [EB] (UF -> UL -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [EB]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' S L' U' L S' L' U L U",
    "algs": [
      "U' S L' U' L S' L' U L U",
      "R U' S L' U' L S' L' U L U R'",
      "R' U' S L' U' L S' L' U L U R",
      "R2 U' S L' U' L S' L' U L U R2"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [EB] (缓冲 UF, UL(U) -> UB(B))"
  },
  {
    "id": "chichu_e_eg",
    "code": "EG",
    "name": "彳亍棱块 [EG] (UF -> UL -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [EG]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "S L' U' L S' L' U L",
    "algs": [
      "S L' U' L S' L' U L",
      "D S L' U' L S' L' U L D'",
      "D' S L' U' L S' L' U L D",
      "D2 S L' U' L S' L' U L D2"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [EG] (缓冲 UF, UL(U) -> UR(U))"
  },
  {
    "id": "chichu_e_eh",
    "code": "EH",
    "name": "彳亍棱块 [EH] (UF -> UL -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [EH]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R U R' S' R U' R' S",
    "algs": [
      "R U R' S' R U' R' S",
      "R' U R S' R' U' R S",
      "U2 L' U L S L' U' L S' U2",
      "M' S L' U L S' L' U' L M"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [EH] (缓冲 UF, UL(U) -> UR(R))"
  },
  {
    "id": "chichu_e_ei",
    "code": "EI",
    "name": "彳亍棱块 [EI] (UF -> UL -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [EI]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' L S2 L' U' L S2 L' U2",
    "algs": [
      "U' L S2 L' U' L S2 L' U2",
      "U' L S2 L U' L' S2 L U L2 U",
      "L U' S2 L' U2 L S2 L' U2 L U L'",
      "L2 U' L U2 L' S2 L U2 L' S2 U L2"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [EI] (缓冲 UF, UL(U) -> FL(F))"
  },
  {
    "id": "chichu_e_ej",
    "code": "EJ",
    "name": "彳亍棱块 [EJ] (UF -> UL -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [EJ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' L' S L U' L' S' L U2",
    "algs": [
      "U' L' S L U' L' S' L U2",
      "F2 R F' S F R' F' R S' R' F'",
      "U' R' E R U' R' E' R U2",
      "U' R2 F' R E' R' F R E R U"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [EJ] (缓冲 UF, UL(U) -> FL(L))"
  },
  {
    "id": "chichu_e_ek",
    "code": "EK",
    "name": "彳亍棱块 [EK] (UF -> UL -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [EK]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U R' S2 R U' R' S2 R",
    "algs": [
      "U R' S2 R U' R' S2 R",
      "D U R' S2 R U' R' S2 R D'",
      "D' U R' S2 R U' R' S2 R D",
      "R' U S2 R U' R' S2 R U R' U' R"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [EK] (缓冲 UF, UL(U) -> FR(F))"
  },
  {
    "id": "chichu_e_el",
    "code": "EL",
    "name": "彳亍棱块 [EL] (UF -> UL -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [EL]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R S R' F R S' R' F'",
    "algs": [
      "R S R' F R S' R' F'",
      "R2 U R' S' R U' R' S R'",
      "R D R U R' S' R U' R' S D' R'",
      "R D' R U R' S' R U' R' S D R'"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [EL] (缓冲 UF, UL(U) -> FR(R))"
  },
  {
    "id": "chichu_e_em",
    "code": "EM",
    "name": "彳亍棱块 [EM] (UF -> UL -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [EM]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' L' S2 L U' L' S2 L U2",
    "algs": [
      "U' L' S2 L U' L' S2 L U2",
      "L2 U' L' U2 L S2 L' U2 L S2 U L2",
      "L' U' S2 L U2 L' S2 L U2 L' U L",
      "L' U2 L' U S2 U' L U S2 U L"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [EM] (缓冲 UF, UL(U) -> BL(B))"
  },
  {
    "id": "chichu_e_en",
    "code": "EN",
    "name": "彳亍棱块 [EN] (UF -> UL -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [EN]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' L S L' U' L S' L' U2",
    "algs": [
      "U' L S L' U' L S' L' U2",
      "U' L S L U' L' S' L U L2 U",
      "F R L U2 L' S L U2 L' S' R' F'",
      "U' R E' R' U' R E R' U2"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [EN] (缓冲 UF, UL(U) -> BL(L))"
  },
  {
    "id": "chichu_e_eo",
    "code": "EO",
    "name": "彳亍棱块 [EO] (UF -> UL -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [EO]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U R S2 R' U' R S2 R'",
    "algs": [
      "U R S2 R' U' R S2 R'",
      "D U R S2 R' U' R S2 R' D'",
      "D' U R S2 R' U' R S2 R' D",
      "R U S2 R' U' R S2 R' U R U' R'"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [EO] (缓冲 UF, UL(U) -> BR(B))"
  },
  {
    "id": "chichu_e_ep",
    "code": "EP",
    "name": "彳亍棱块 [EP] (UF -> UL -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [EP]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F R S R2 S' R F'",
    "algs": [
      "F R S R2 S' R F'",
      "R' S R' F R F' S' F R' F' R2",
      "R' D S R' F R F' S' F R' F' R D' R",
      "R' D' S R' F R F' S' F R' F' R D R"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [EP] (缓冲 UF, UL(U) -> BR(R))"
  },
  {
    "id": "chichu_e_eq",
    "code": "EQ",
    "name": "彳亍棱块 [EQ] (UF -> UL -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [EQ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "M D2 M' U' M D2 M' U",
    "algs": [
      "M D2 M' U' M D2 M' U",
      "Rw' D2 M' U' M D2 M' U M Rw",
      "M2 U M' D2 M U' M' D2 M'",
      "Rw' M U M' D2 M U' M' D2 Rw"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [EQ] (缓冲 UF, UL(U) -> DF(D))"
  },
  {
    "id": "chichu_e_er",
    "code": "ER",
    "name": "彳亍棱块 [ER] (UF -> UL -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [ER]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "y' S' L' U' L S L' U L y",
    "algs": [
      "y' S' L' U' L S L' U L y",
      "y' S' L U' L' S L U L' y",
      "D' U L E L' U' L E' L' D",
      "z E R' F R F' E' F R' F' R z'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [ER] (缓冲 UF, UL(U) -> DF(F))"
  },
  {
    "id": "chichu_e_es",
    "code": "ES",
    "name": "彳亍棱块 [ES] (UF -> UL -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [ES]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D2 R U R' S2 R U' R' S2 D2",
    "algs": [
      "D2 R U R' S2 R U' R' S2 D2",
      "D2 R' U R S2 R' U' R S2 D2",
      "U' S2 L' U' L S2 L' U L U",
      "R U' S2 L' U' L S2 L' U L U R'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [ES] (缓冲 UF, UL(U) -> DL(D))"
  },
  {
    "id": "chichu_e_et",
    "code": "ET",
    "name": "彳亍棱块 [ET] (UF -> UL -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [ET]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F R' D2 S' D2 S R F'",
    "algs": [
      "F R' D2 S' D2 S R F'",
      "F R L2 S' L2 S R' F'",
      "y2 L' U L S' L' U' L S y2",
      "y2 L U L' S' L U' L' S y2"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [ET] (缓冲 UF, UL(U) -> DL(L))"
  },
  {
    "id": "chichu_e_eu",
    "code": "EU",
    "name": "彳亍棱块 [EU] (UF -> UL -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [EU]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D' R U R' S2 R U' R' S2 D",
    "algs": [
      "D' R U R' S2 R U' R' S2 D",
      "R D' R U R' S2 R U' R' S2 D R'",
      "R' D' R U R' S2 R U' R' S2 D R",
      "R2 D' R U R' S2 R U' R' S2 D R2"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [EU] (缓冲 UF, UL(U) -> DB(D))"
  },
  {
    "id": "chichu_e_ev",
    "code": "EV",
    "name": "彳亍棱块 [EV] (UF -> UL -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [EV]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "B U R S2 R' U' R S2 R' B'",
    "algs": [
      "B U R S2 R' U' R S2 R' B'",
      "D U L E L' U' L E' L' D'",
      "D L' E R' F' R E' R' F R L D'",
      "D L' E F' L F L' E' L F' L' F L D'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [EV] (缓冲 UF, UL(U) -> DB(B))"
  },
  {
    "id": "chichu_e_ew",
    "code": "EW",
    "name": "彳亍棱块 [EW] (UF -> UL -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [EW]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L2 D' M D2 M' D' L2",
    "algs": [
      "L2 D' M D2 M' D' L2",
      "L2 U' S D2 S' D2 U L2",
      "L2 U S L2 S' L2 U' L2",
      "R2 S L' U' L S' L' U L R2"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [EW] (缓冲 UF, UL(U) -> DR(D))"
  },
  {
    "id": "chichu_e_ex",
    "code": "EX",
    "name": "彳亍棱块 [EX] (UF -> UL -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [EX]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "M D' M' U' M D M' U",
    "algs": [
      "M D' M' U' M D M' U",
      "x2 M U' M' D' M U M' D x2"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [EX] (缓冲 UF, UL(U) -> DR(R))"
  },
  {
    "id": "chichu_e_fa",
    "code": "FA",
    "name": "彳亍棱块 [FA] (UF -> UL -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [FA]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "M U' M D2 M' U M D2 M2",
    "algs": [
      "M U' M D2 M' U M D2 M2",
      "M2 D2 M U M' D2 M U' M"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [FA] (缓冲 UF, UL(L) -> UB(U))"
  },
  {
    "id": "chichu_e_fb",
    "code": "FB",
    "name": "彳亍棱块 [FB] (UF -> UL -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [FB]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L U' L' U M' U' L U M L'",
    "algs": [
      "L U' L' U M' U' L U M L'",
      "L D U' L' U M' U' L U M D' L'",
      "L D' U' L' U M' U' L U M D L'",
      "D L U' L' U M' U' L U M L' D'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [FB] (缓冲 UF, UL(L) -> UB(B))"
  },
  {
    "id": "chichu_e_fg",
    "code": "FG",
    "name": "彳亍棱块 [FG] (UF -> UL -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [FG]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U2 S' R U' R' S R U R' U2",
    "algs": [
      "U2 S' R U' R' S R U R' U2",
      "y2 S' R U' R' S R U R' y2",
      "U2 S' R' U' R S R' U R U2",
      "y2 S' R' U' R S R' U R y2"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [FG] (缓冲 UF, UL(L) -> UR(U))"
  },
  {
    "id": "chichu_e_fh",
    "code": "FH",
    "name": "彳亍棱块 [FH] (UF -> UL -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [FH]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L F' L' F S' F' L F L' S",
    "algs": [
      "L F' L' F S' F' L F L' S",
      "L2 U L F' L' F S F' L F L' S' U' L2",
      "z' S D' L' D S' D' L D z",
      "z' S F' L F L' S' L F' L' F z"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [FH] (缓冲 UF, UL(L) -> UR(R))"
  },
  {
    "id": "chichu_e_fi",
    "code": "FI",
    "name": "彳亍棱块 [FI] (UF -> UL -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [FI]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F R' S2 R U R' S2 R U' F'",
    "algs": [
      "F R' S2 R U R' S2 R U' F'",
      "F R' S2 R' U R S2 R' U' R2 F'",
      "U' L S2 R' F R F' S2 F R' F' R L' U",
      "F L' R U' R' E2 R U R' E2 L F'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [FI] (缓冲 UF, UL(L) -> FL(F))"
  },
  {
    "id": "chichu_e_fj",
    "code": "FJ",
    "name": "彳亍棱块 [FJ] (UF -> UL -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [FJ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L2 D M D' L' D M' D' L'",
    "algs": [
      "L2 D M D' L' D M' D' L'",
      "U' L' S R' F R F' S' F R' F' R L U",
      "L U S D' L' D S' D' L D U' L'",
      "L U S F' L F L' S' L F' L' F U' L'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [FJ] (缓冲 UF, UL(L) -> FL(L))"
  },
  {
    "id": "chichu_e_fk",
    "code": "FK",
    "name": "彳亍棱块 [FK] (UF -> UL -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [FK]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L E R U' R' E' R U R' L'",
    "algs": [
      "L E R U' R' E' R U R' L'",
      "L D E R U' R' E' R U R' D' L'",
      "L D' E R U' R' E' R U R' D L'",
      "D L E R U' R' E' R U R' L' D'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [FK] (缓冲 UF, UL(L) -> FR(F))"
  },
  {
    "id": "chichu_e_fl",
    "code": "FL",
    "name": "彳亍棱块 [FL] (UF -> UL -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [FL]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "Rw R U' R' S' R U R' S Rw'",
    "algs": [
      "Rw R U' R' S' R U R' S Rw'",
      "Rw R' U' R S' R' U R S Rw'",
      "R' U' S' R' F R F' S F R' F' R U R",
      "R L F' L' F S' F' L F L' S R'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [FL] (缓冲 UF, UL(L) -> FR(R))"
  },
  {
    "id": "chichu_e_fm",
    "code": "FM",
    "name": "彳亍棱块 [FM] (UF -> UL -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [FM]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "B' L U' L' U M' U' L U M L' B",
    "algs": [
      "B' L U' L' U M' U' L U M L' B",
      "B' L M L F' L' F M' F' L F L2 B",
      "B' M F' L F L' M' L F' L' F B",
      "B' R M F' L F L' M' L F' L' F R' B"
    ],
    "moves": 12,
    "desc": "三阶彳亍棱块三循环 [FM] (缓冲 UF, UL(L) -> BL(B))"
  },
  {
    "id": "chichu_e_fn",
    "code": "FN",
    "name": "彳亍棱块 [FN] (UF -> UL -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [FN]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L2 D M D' L D M' D' L",
    "algs": [
      "L2 D M D' L D M' D' L",
      "B L M2 L F' L' F M2 F' L F L2 B'",
      "B M2 F' L F L' M2 L F' L' F B'",
      "B R M2 F' L F L' M2 L F' L' F R' B'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [FN] (缓冲 UF, UL(L) -> BL(L))"
  },
  {
    "id": "chichu_e_fo",
    "code": "FO",
    "name": "彳亍棱块 [FO] (UF -> UL -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [FO]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "Lw' L U' L' E L U L' E' Lw",
    "algs": [
      "Lw' L U' L' E L U L' E' Lw",
      "L' E' R' U' R E R' U R L",
      "L' D E' R' U' R E R' U R D' L",
      "L' D' E' R' U' R E R' U R D L"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [FO] (缓冲 UF, UL(L) -> BR(B))"
  },
  {
    "id": "chichu_e_fp",
    "code": "FP",
    "name": "彳亍棱块 [FP] (UF -> UL -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [FP]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F R U2 S' U2 S R' F'",
    "algs": [
      "F R U2 S' U2 S R' F'",
      "R U' S' R' F R F' S F R' F' R U R'",
      "R' L F' L' F S' F' L F L' S R",
      "R' D L F' L' F S' F' L F L' S D' R"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [FP] (缓冲 UF, UL(L) -> BR(R))"
  },
  {
    "id": "chichu_e_fq",
    "code": "FQ",
    "name": "彳亍棱块 [FQ] (UF -> UL -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [FQ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "S' D M' U2 M D' M' U2 M S",
    "algs": [
      "S' D M' U2 M D' M' U2 M S"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [FQ] (缓冲 UF, UL(L) -> DF(D))"
  },
  {
    "id": "chichu_e_fr",
    "code": "FR",
    "name": "彳亍棱块 [FR] (UF -> UL -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [FR]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "Lw' M' U' L U M U' L' U Lw",
    "algs": [
      "Lw' M' U' L U M U' L' U Lw",
      "x M' U' L U M U' L' U x'",
      "M' F' L F L' M L F' L' F",
      "R M' F' L F L' M L F' L' F R'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [FR] (缓冲 UF, UL(L) -> DF(F))"
  },
  {
    "id": "chichu_e_fs",
    "code": "FS",
    "name": "彳亍棱块 [FS] (UF -> UL -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [FS]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "S L' U' L S L' U L S2",
    "algs": [
      "S L' U' L S L' U L S2",
      "S L U' L' S L U L' S2",
      "L F' L' F S F' L F L' S'",
      "R L F' L' F S F' L F L' S' R'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [FS] (缓冲 UF, UL(L) -> DL(D))"
  },
  {
    "id": "chichu_e_ft",
    "code": "FT",
    "name": "彳亍棱块 [FT] (UF -> UL -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [FT]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F L' E' L2 E L' F'",
    "algs": [
      "F L' E' L2 E L' F'",
      "U L2 U' L' E' L U L' E L' U'"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [FT] (缓冲 UF, UL(L) -> DL(L))"
  },
  {
    "id": "chichu_e_fu",
    "code": "FU",
    "name": "彳亍棱块 [FU] (UF -> UL -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [FU]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "Lw U' L' U M2 U' L U M2 Lw'",
    "algs": [
      "Lw U' L' U M2 U' L U M2 Lw'",
      "x' U' L' U M2 U' L U M2 x",
      "Lw' M2 U' L U M2 U' L' U Lw",
      "x M2 U' L U M2 U' L' U x'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [FU] (缓冲 UF, UL(L) -> DB(D))"
  },
  {
    "id": "chichu_e_fv",
    "code": "FV",
    "name": "彳亍棱块 [FV] (UF -> UL -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [FV]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D R U R' S R U' R' S' D'",
    "algs": [
      "D R U R' S R U' R' S' D'",
      "R D R U R' S R U' R' S' D' R'",
      "R' D R U R' S R U' R' S' D' R",
      "D R2 U R' S R U' R' S' R' D'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [FV] (缓冲 UF, UL(L) -> DB(B))"
  },
  {
    "id": "chichu_e_fw",
    "code": "FW",
    "name": "彳亍棱块 [FW] (UF -> UL -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [FW]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "M2 D M U M' D' M U' M",
    "algs": [
      "M2 D M U M' D' M U' M",
      "F2 D' M' U' M D M' U M F2"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [FW] (缓冲 UF, UL(L) -> DR(D))"
  },
  {
    "id": "chichu_e_fx",
    "code": "FX",
    "name": "彳亍棱块 [FX] (UF -> UL -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [FX]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D2 R U R' S R U' R' S' D2",
    "algs": [
      "D2 R U R' S R U' R' S' D2",
      "D2 R' U R S R' U' R S' D2",
      "U' S' R' F R F' S F R' F' R U",
      "U' L S' R' F R F' S F R' F' R L' U"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [FX] (缓冲 UF, UL(L) -> DR(R))"
  },
  {
    "id": "chichu_e_ga",
    "code": "GA",
    "name": "彳亍棱块 [GA] (UF -> UR -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [GA]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R2 U' S' U2 S U' R2",
    "algs": [
      "R2 U' S' U2 S U' R2",
      "B L S' L F' L' F S F' L F L2 B'",
      "R2 U M' U2 M S' M' U2 M S U' R2",
      "R2 U' S' M' U2 M S M' U2 M U R2"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [GA] (缓冲 UF, UR(U) -> UB(U))"
  },
  {
    "id": "chichu_e_gb",
    "code": "GB",
    "name": "彳亍棱块 [GB] (UF -> UR -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [GB]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' S L' U L S' L' U' L U",
    "algs": [
      "U' S L' U L S' L' U' L U",
      "L U' S L' U L S' L' U' L U L'",
      "L' U' S L' U L S' L' U' L U L",
      "L2 U' S L' U L S' L' U' L U L2"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [GB] (缓冲 UF, UR(U) -> UB(B))"
  },
  {
    "id": "chichu_e_ge",
    "code": "GE",
    "name": "彳亍棱块 [GE] (UF -> UR -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [GE]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R2 S2 R U R' S2 R U' R",
    "algs": [
      "R2 S2 R U R' S2 R U' R",
      "R2 U R U' R' S2 R U R' S2 U' R2",
      "R2 S2 R' U R S2 R' U' R'",
      "R2 U R' U' R S2 R' U R S2 U' R2"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [GE] (缓冲 UF, UR(U) -> UL(U))"
  },
  {
    "id": "chichu_e_gf",
    "code": "GF",
    "name": "彳亍棱块 [GF] (UF -> UR -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [GF]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L' U' L S L' U L S'",
    "algs": [
      "L' U' L S L' U L S'",
      "D L' U' L S L' U L S' D'",
      "D' L' U' L S L' U L S' D",
      "D2 L' U' L S L' U L S' D2"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [GF] (缓冲 UF, UR(U) -> UL(L))"
  },
  {
    "id": "chichu_e_gi",
    "code": "GI",
    "name": "彳亍棱块 [GI] (UF -> UR -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [GI]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' L S2 L' U L S2 L'",
    "algs": [
      "U' L S2 L' U L S2 L'",
      "D U' L S2 L' U L S2 L' D'",
      "D' U' L S2 L' U L S2 L' D",
      "B U' L S2 L' U L S2 L' B'"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [GI] (缓冲 UF, UR(U) -> FL(F))"
  },
  {
    "id": "chichu_e_gj",
    "code": "GJ",
    "name": "彳亍棱块 [GJ] (UF -> UR -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [GJ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' L' S L U L' S' L",
    "algs": [
      "U' L' S L U L' S' L",
      "L' D L U' L' S L U L' S' D' L",
      "L' D' L U' L' S L U L' S' D L",
      "D U' L' S L U L' S' L D'"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [GJ] (缓冲 UF, UR(U) -> FL(L))"
  },
  {
    "id": "chichu_e_gk",
    "code": "GK",
    "name": "彳亍棱块 [GK] (UF -> UR -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [GK]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U R' S2 R U R' S2 R U2",
    "algs": [
      "U R' S2 R U R' S2 R U2",
      "U R' S2 R' U R S2 R' U' R2 U'",
      "R' U S2 R U2 R' S2 R U2 R' U' R",
      "R2 U R' U2 R S2 R' U2 R S2 U' R2"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [GK] (缓冲 UF, UR(U) -> FR(F))"
  },
  {
    "id": "chichu_e_gl",
    "code": "GL",
    "name": "彳亍棱块 [GL] (UF -> UR -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [GL]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U R S' R' U R S R' U2",
    "algs": [
      "U R S' R' U R S R' U2",
      "R' U' S' D R D' S D R' D' U R",
      "R' U' S' F R' F' R S R' F R F' U R",
      "F' R' E R U' R' E' R U F"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [GL] (缓冲 UF, UR(U) -> FR(R))"
  },
  {
    "id": "chichu_e_gm",
    "code": "GM",
    "name": "彳亍棱块 [GM] (UF -> UR -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [GM]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' L' S2 L U L' S2 L",
    "algs": [
      "U' L' S2 L U L' S2 L",
      "D U' L' S2 L U L' S2 L D'",
      "D' U' L' S2 L U L' S2 L D",
      "F' L U2 L' E' L U2 L' E F"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [GM] (缓冲 UF, UR(U) -> BL(B))"
  },
  {
    "id": "chichu_e_gn",
    "code": "GN",
    "name": "彳亍棱块 [GN] (UF -> UR -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [GN]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F' L S U2 S' U2 L' F",
    "algs": [
      "F' L S U2 S' U2 L' F",
      "U' L S L' U L S' L'",
      "L D L' U' L S L' U L S' D' L'",
      "L D' L' U' L S L' U L S' D L'"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [GN] (缓冲 UF, UR(U) -> BL(L))"
  },
  {
    "id": "chichu_e_go",
    "code": "GO",
    "name": "彳亍棱块 [GO] (UF -> UR -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [GO]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U R S2 R' U R S2 R' U2",
    "algs": [
      "U R S2 R' U R S2 R' U2",
      "R2 U R U2 R' S2 R U2 R' S2 U' R2",
      "R U S2 R' U2 R S2 R' U2 R U' R'",
      "R U2 R U' S2 U R' U' S2 U' R'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [GO] (缓冲 UF, UR(U) -> BR(B))"
  },
  {
    "id": "chichu_e_gp",
    "code": "GP",
    "name": "彳亍棱块 [GP] (UF -> UR -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [GP]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U R' S' R U R' S R U2",
    "algs": [
      "U R' S' R U R' S R U2",
      "U R' S' R' U R S R' U' R2 U'",
      "U L' E L U L' E' L U2",
      "F' R' L' U2 L E' L' U2 L E R F"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [GP] (缓冲 UF, UR(U) -> BR(R))"
  },
  {
    "id": "chichu_e_gq",
    "code": "GQ",
    "name": "彳亍棱块 [GQ] (UF -> UR -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [GQ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "M D2 M' U M D2 M' U'",
    "algs": [
      "M D2 M' U M D2 M' U'",
      "Lw D2 M' U M D2 M' U' M Lw'",
      "M2 U' M' D2 M U M' D2 M'",
      "Lw M U' M' D2 M U M' D2 Lw'"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [GQ] (缓冲 UF, UR(U) -> DF(D))"
  },
  {
    "id": "chichu_e_gr",
    "code": "GR",
    "name": "彳亍棱块 [GR] (UF -> UR -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [GR]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D L' U' L S' L' U L S D'",
    "algs": [
      "D L' U' L S' L' U L S D'",
      "L D L' U' L S' L' U L S D' L'",
      "L' D L' U' L S' L' U L S D' L",
      "D U' L S' L' U L S L' D'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [GR] (缓冲 UF, UR(U) -> DF(F))"
  },
  {
    "id": "chichu_e_gs",
    "code": "GS",
    "name": "彳亍棱块 [GS] (UF -> UR -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [GS]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R2 D M D2 M' D R2",
    "algs": [
      "R2 D M D2 M' D R2",
      "R2 U' D2 S D2 S' U R2",
      "R2 U L2 S L2 S' U' R2",
      "R2 U S' D2 S D2 U' R2"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [GS] (缓冲 UF, UR(U) -> DL(D))"
  },
  {
    "id": "chichu_e_gt",
    "code": "GT",
    "name": "彳亍棱块 [GT] (UF -> UR -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [GT]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "M D M' U M D' M' U'",
    "algs": [
      "M D M' U M D' M' U'",
      "x2 M U M' D M U' M' D' x2"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [GT] (缓冲 UF, UR(U) -> DL(L))"
  },
  {
    "id": "chichu_e_gu",
    "code": "GU",
    "name": "彳亍棱块 [GU] (UF -> UR -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [GU]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "B' U' L S L' U L S' L' B",
    "algs": [
      "B' U' L S L' U L S' L' B",
      "B' L2 U' L' S L U L' S' L' B",
      "D' R' F R F' S' F R' F' R S D",
      "L D' R' F R F' S' F R' F' R S D L'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [GU] (缓冲 UF, UR(U) -> DB(D))"
  },
  {
    "id": "chichu_e_gv",
    "code": "GV",
    "name": "彳亍棱块 [GV] (UF -> UR -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [GV]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D' L' U' L S' L' U L S D",
    "algs": [
      "D' L' U' L S' L' U L S D",
      "L D' L' U' L S' L' U L S D L'",
      "L' D' L' U' L S' L' U L S D L",
      "D' U' L S' L' U L S L' D"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [GV] (缓冲 UF, UR(U) -> DB(B))"
  },
  {
    "id": "chichu_e_gw",
    "code": "GW",
    "name": "彳亍棱块 [GW] (UF -> UR -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [GW]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R' F R F' S' F R' F' R S",
    "algs": [
      "R' F R F' S' F R' F' R S",
      "z' S L' U2 L S' L' U2 L z",
      "M' L' U L S' L' U' L S M",
      "Lw' L' U L S' L' U' L S Lw"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [GW] (缓冲 UF, UR(U) -> DR(D))"
  },
  {
    "id": "chichu_e_gx",
    "code": "GX",
    "name": "彳亍棱块 [GX] (UF -> UR -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [GX]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L' U' L S' L' U L S",
    "algs": [
      "L' U' L S' L' U L S",
      "L U' L' S' L U L' S",
      "F S U R' U' S' U R U' F'",
      "F' L S' R2 S R2 L' F"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [GX] (缓冲 UF, UR(U) -> DR(R))"
  },
  {
    "id": "chichu_e_ha",
    "code": "HA",
    "name": "彳亍棱块 [HA] (UF -> UR -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [HA]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "M U M D2 M' U' M D2 M2",
    "algs": [
      "M U M D2 M' U' M D2 M2",
      "M2 D2 M U' M' D2 M U M"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [HA] (缓冲 UF, UR(R) -> UB(U))"
  },
  {
    "id": "chichu_e_hb",
    "code": "HB",
    "name": "彳亍棱块 [HB] (UF -> UR -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [HB]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R' U R U' M' U R' U' M R",
    "algs": [
      "R' U R U' M' U R' U' M R",
      "R' D U R U' M' U R' U' M D' R",
      "R' D' U R U' M' U R' U' M D R",
      "D R' U R U' M' U R' U' M R D'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [HB] (缓冲 UF, UR(R) -> UB(B))"
  },
  {
    "id": "chichu_e_he",
    "code": "HE",
    "name": "彳亍棱块 [HE] (UF -> UR -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [HE]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "S' R U R' S R U' R'",
    "algs": [
      "S' R U R' S R U' R'",
      "S' R' U R S R' U' R",
      "D S' R U R' S R U' R' D'",
      "D' S' R U R' S R U' R' D"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [HE] (缓冲 UF, UR(R) -> UL(U))"
  },
  {
    "id": "chichu_e_hf",
    "code": "HF",
    "name": "彳亍棱块 [HF] (UF -> UR -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [HF]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "z' D' L' D S D' L D S' z",
    "algs": [
      "z' D' L' D S D' L D S' z",
      "z' F' L F L' S L F' L' F S' z",
      "R2 S2 L F' L' F S2 F' L F L' R2",
      "F U2 R' S2 R U2 R' S2 R F'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [HF] (缓冲 UF, UR(R) -> UL(L))"
  },
  {
    "id": "chichu_e_hi",
    "code": "HI",
    "name": "彳亍棱块 [HI] (UF -> UR -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [HI]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L' S' R U R' S R U' R' L",
    "algs": [
      "L' S' R U R' S R U' R' L",
      "L' D S' R U R' S R U' R' D' L",
      "L' D' S' R U R' S R U' R' D L",
      "D L' S' R U R' S R U' R' L D'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [HI] (缓冲 UF, UR(R) -> FL(F))"
  },
  {
    "id": "chichu_e_hj",
    "code": "HJ",
    "name": "彳亍棱块 [HJ] (UF -> UR -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [HJ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R E2 R' F' R E2 R' F",
    "algs": [
      "R E2 R' F' R E2 R' F",
      "R D E2 R' F' R E2 R' F R D' R'",
      "R D' E2 R' F' R E2 R' F R D R'",
      "D R E2 R' F' R E2 R' F D'"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [HJ] (缓冲 UF, UR(R) -> FL(L))"
  },
  {
    "id": "chichu_e_hk",
    "code": "HK",
    "name": "彳亍棱块 [HK] (UF -> UR -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [HK]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F' L S2 L' U' L S2 L' U F",
    "algs": [
      "F' L S2 L' U' L S2 L' U F",
      "F' L S2 L U' L' S2 L U L2 F",
      "F' L S2 R' F R F' S2 F R' F' R L' F",
      "U R' S2 L F' L' F S2 F' L F L' R U'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [HK] (缓冲 UF, UR(R) -> FR(F))"
  },
  {
    "id": "chichu_e_hl",
    "code": "HL",
    "name": "彳亍棱块 [HL] (UF -> UR -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [HL]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R2 D' M D R D' M' D R",
    "algs": [
      "R2 D' M D R D' M' D R",
      "R2 U' S U R U' S' U R",
      "R2 U' S B R' B' R S' R' B R B' U R2",
      "U R S' L F' L' F S F' L F L' R' U'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [HL] (缓冲 UF, UR(R) -> FR(R))"
  },
  {
    "id": "chichu_e_hm",
    "code": "HM",
    "name": "彳亍棱块 [HM] (UF -> UR -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [HM]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L S' R U R' S R U' R' L'",
    "algs": [
      "L S' R U R' S R U' R' L'",
      "L D S' R U R' S R U' R' D' L'",
      "L D' S' R U R' S R U' R' D L'",
      "D L S' R U R' S R U' R' L' D'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [HM] (缓冲 UF, UR(R) -> BL(B))"
  },
  {
    "id": "chichu_e_hn",
    "code": "HN",
    "name": "彳亍棱块 [HN] (UF -> UR -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [HN]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F' L' S' L2 S L' F",
    "algs": [
      "F' L' S' L2 S L' F",
      "U' L R U' R' S' R U R' S L' U",
      "U' L R' U' R S' R' U R S L' U",
      "F' R L2 E L2 E' R' F"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [HN] (缓冲 UF, UR(R) -> BL(L))"
  },
  {
    "id": "chichu_e_ho",
    "code": "HO",
    "name": "彳亍棱块 [HO] (UF -> UR -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [HO]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "B R U R' U' M' U R U' M R' B'",
    "algs": [
      "B R U R' U' M' U R U' M R' B'",
      "B M F R' F' R M' R' F R F' B'",
      "B L M F R' F' R M' R' F R F' L' B'",
      "U R' L' U' L S L' U L S' R U'"
    ],
    "moves": 12,
    "desc": "三阶彳亍棱块三循环 [HO] (缓冲 UF, UR(R) -> BR(B))"
  },
  {
    "id": "chichu_e_hp",
    "code": "HP",
    "name": "彳亍棱块 [HP] (UF -> UR -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [HP]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R2 D' M D R' D' M' D R'",
    "algs": [
      "R2 D' M D R' D' M' D R'",
      "B' M2 F R' F' R M2 R' F R F' B",
      "B' L M2 F R' F' R M2 R' F R F' L' B",
      "R2 U' S U R' U' S' U R'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [HP] (缓冲 UF, UR(R) -> BR(R))"
  },
  {
    "id": "chichu_e_hq",
    "code": "HQ",
    "name": "彳亍棱块 [HQ] (UF -> UR -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [HQ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D R' E R' U' R E' R' U R2 D'",
    "algs": [
      "D R' E R' U' R E' R' U R2 D'",
      "D R E' R U' R' E R U R2 D'",
      "D R' F R' F' R E' R' F R F' E R D'",
      "F R E2 L' U2 L E2 L' U2 L R' F'"
    ],
    "moves": 11,
    "desc": "三阶彳亍棱块三循环 [HQ] (缓冲 UF, UR(R) -> DF(D))"
  },
  {
    "id": "chichu_e_hr",
    "code": "HR",
    "name": "彳亍棱块 [HR] (UF -> UR -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [HR]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "Rw M' U R' U' M U R U' Rw'",
    "algs": [
      "Rw M' U R' U' M U R U' Rw'",
      "x M' U R' U' M U R U' x'",
      "M' F R' F' R M R' F R F'",
      "L M' F R' F' R M R' F R F' L'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [HR] (缓冲 UF, UR(R) -> DF(F))"
  },
  {
    "id": "chichu_e_hs",
    "code": "HS",
    "name": "彳亍棱块 [HS] (UF -> UR -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [HS]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "M2 D' M U' M' D M U M",
    "algs": [
      "M2 D' M U' M' D M U M",
      "F L' R S' L' S R' S' L S L F'",
      "R' U L2 S R S' L2 S R' S' U' R",
      "R U L2 S R' S' L2 S R S' U' R'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [HS] (缓冲 UF, UR(R) -> DL(D))"
  },
  {
    "id": "chichu_e_ht",
    "code": "HT",
    "name": "彳亍棱块 [HT] (UF -> UR -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [HT]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U R' S R U R' S' R U2",
    "algs": [
      "U R' S R U R' S' R U2",
      "u S R U R' S' R U' R' u'",
      "Uw S R U R' S' R U' R' Uw'",
      "U2 R U' R' S R U R' S' U2"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [HT] (缓冲 UF, UR(R) -> DL(L))"
  },
  {
    "id": "chichu_e_hu",
    "code": "HU",
    "name": "彳亍棱块 [HU] (UF -> UR -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [HU]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "Rw' U R U' M2 U R' U' M2 Rw",
    "algs": [
      "Rw' U R U' M2 U R' U' M2 Rw",
      "x' U R U' M2 U R' U' M2 x",
      "Rw M2 U R' U' M2 U R U' Rw'",
      "x M2 U R' U' M2 U R U' x'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [HU] (缓冲 UF, UR(R) -> DB(D))"
  },
  {
    "id": "chichu_e_hv",
    "code": "HV",
    "name": "彳亍棱块 [HV] (UF -> UR -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [HV]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D2 M' F R' F' R M R' F R F' D2",
    "algs": [
      "D2 M' F R' F' R M R' F R F' D2",
      "B2 M F R' F' R M' R' F R F' B2",
      "U L2 F' L' F M2 F' L F L' M2 L' U'",
      "U F' L F L' M2 L F' L' F M2 U'"
    ],
    "moves": 12,
    "desc": "三阶彳亍棱块三循环 [HV] (缓冲 UF, UR(R) -> DB(B))"
  },
  {
    "id": "chichu_e_hw",
    "code": "HW",
    "name": "彳亍棱块 [HW] (UF -> UR -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [HW]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R' E R' U' R E' R' U R2",
    "algs": [
      "R' E R' U' R E' R' U R2",
      "R' D E R' U' R E' R' U R D' R",
      "R' D' E R' U' R E' R' U R D R",
      "R' U E R' U2 R E' R' U2 R U' R"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [HW] (缓冲 UF, UR(R) -> DR(D))"
  },
  {
    "id": "chichu_e_hx",
    "code": "HX",
    "name": "彳亍棱块 [HX] (UF -> UR -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [HX]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F' R E R2 E' R F",
    "algs": [
      "F' R E R2 E' R F",
      "U' R2 U R E R' U' R E' R U",
      "F' R F2 E' F2 E R' F",
      "F' R' E' F2 E F2 R F"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [HX] (缓冲 UF, UR(R) -> DR(R))"
  },
  {
    "id": "chichu_e_ia",
    "code": "IA",
    "name": "彳亍棱块 [IA] (UF -> FL -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [IA]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L U S U2 S' U L'",
    "algs": [
      "L U S U2 S' U L'",
      "U L' S L U2 L' S' L U",
      "L U S M' U2 M S' M' U2 M U' L'",
      "L U' M' U2 M S M' U2 M S' U L'"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [IA] (缓冲 UF, FL(F) -> UB(U))"
  },
  {
    "id": "chichu_e_ib",
    "code": "IB",
    "name": "彳亍棱块 [IB] (UF -> FL -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [IB]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U2 M' U' L' U M U' L U'",
    "algs": [
      "U2 M' U' L' U M U' L U'",
      "y2 M' U R' U' M U R U' y2",
      "E' U' L U M' U' L' U M E",
      "d' U' L U M' U' L' U M d"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [IB] (缓冲 UF, FL(F) -> UB(B))"
  },
  {
    "id": "chichu_e_ie",
    "code": "IE",
    "name": "彳亍棱块 [IE] (UF -> FL -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [IE]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U2 L' S L U L' S' L U",
    "algs": [
      "U2 L' S L U L' S' L U",
      "U2 L S2 L' U L S2 L' U",
      "U' L2 U' L' S2 L U L' S2 L' U",
      "U' L R' F R F' S2 F R' F' R S2 L' U"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [IE] (缓冲 UF, FL(F) -> UL(U))"
  },
  {
    "id": "chichu_e_if",
    "code": "IF",
    "name": "彳亍棱块 [IF] (UF -> FL -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [IF]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F U R' S2 R U' R' S2 R F'",
    "algs": [
      "F U R' S2 R U' R' S2 R F'",
      "F R2 U R S2 R' U' R S2 R F'",
      "F L' E2 R U' R' E2 R U R' L F'",
      "F U L' E2 L U' L' E2 L F'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [IF] (缓冲 UF, FL(F) -> UL(L))"
  },
  {
    "id": "chichu_e_ig",
    "code": "IG",
    "name": "彳亍棱块 [IG] (UF -> FL -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [IG]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L' S L U' L' S' L U",
    "algs": [
      "L' S L U' L' S' L U",
      "L' D S L U' L' S' L U L' D' L",
      "L' D' S L U' L' S' L U L' D L",
      "D L' S L U' L' S' L U D'"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [IG] (缓冲 UF, FL(F) -> UR(U))"
  },
  {
    "id": "chichu_e_ih",
    "code": "IH",
    "name": "彳亍棱块 [IH] (UF -> FL -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [IH]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "Lw' S L' U L S' L' U' L Lw",
    "algs": [
      "Lw' S L' U L S' L' U' L Lw",
      "Lw' S L U L' S' L U' L' Lw",
      "L' S R' F R F' S' F R' F' R L",
      "L' D S R' F R F' S' F R' F' R D' L"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [IH] (缓冲 UF, FL(F) -> UR(R))"
  },
  {
    "id": "chichu_e_ik",
    "code": "IK",
    "name": "彳亍棱块 [IK] (UF -> FL -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [IK]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R2 E2 R' U' R E2 R' U R'",
    "algs": [
      "R2 E2 R' U' R E2 R' U R'",
      "R2 D E2 R' U' R E2 R' U R D' R2",
      "R2 D' E2 R' U' R E2 R' U R D R2",
      "R2 L' U L E2 L' U' L E2 R2"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [IK] (缓冲 UF, FL(F) -> FR(F))"
  },
  {
    "id": "chichu_e_il",
    "code": "IL",
    "name": "彳亍棱块 [IL] (UF -> FL -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [IL]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L' U L E' L' U' L E",
    "algs": [
      "L' U L E' L' U' L E",
      "d' E L' U L E' L' U' L d",
      "Dw' E L' U L E' L' U' L Dw",
      "u E L F' L' F E' F' L F L' u'"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [IL] (缓冲 UF, FL(F) -> FR(R))"
  },
  {
    "id": "chichu_e_im",
    "code": "IM",
    "name": "彳亍棱块 [IM] (UF -> FL -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [IM]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' L S' L2 S L U",
    "algs": [
      "U' L S' L2 S L U",
      "L U' L' U' L S2 L' U L S2 U L'",
      "L' U' S2 L' U' L S2 L' U L U L",
      "L U' L U' L' S2 L U L' S2 U L'"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [IM] (缓冲 UF, FL(F) -> BL(B))"
  },
  {
    "id": "chichu_e_in",
    "code": "IN",
    "name": "彳亍棱块 [IN] (UF -> FL -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [IN]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L' U L E L' U' L E'",
    "algs": [
      "L' U L E L' U' L E'",
      "D L' U L E L' U' L E' D'",
      "D' L' U L E L' U' L E' D",
      "D2 L' U L E L' U' L E' D2"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [IN] (缓冲 UF, FL(F) -> BL(L))"
  },
  {
    "id": "chichu_e_io",
    "code": "IO",
    "name": "彳亍棱块 [IO] (UF -> FL -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [IO]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "E2 R' U' R E2 R' U R",
    "algs": [
      "E2 R' U' R E2 R' U R",
      "D E2 R' U' R E2 R' U R D'",
      "D' E2 R' U' R E2 R' U R D",
      "D2 E2 R' U' R E2 R' U R D2"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [IO] (缓冲 UF, FL(F) -> BR(B))"
  },
  {
    "id": "chichu_e_ip",
    "code": "IP",
    "name": "彳亍棱块 [IP] (UF -> FL -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [IP]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L' U L' E L U' L' E' L2",
    "algs": [
      "L' U L' E L U' L' E' L2",
      "L2 D L U L' E L U' L' E' D' L2",
      "L2 D' L U L' E L U' L' E' D L2",
      "L2 U' L U2 L' E L U2 L' E' U L2"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [IP] (缓冲 UF, FL(F) -> BR(R))"
  },
  {
    "id": "chichu_e_iq",
    "code": "IQ",
    "name": "彳亍棱块 [IQ] (UF -> FL -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [IQ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U2 M2 U' L' U M2 U' L U'",
    "algs": [
      "U2 M2 U' L' U M2 U' L U'",
      "L' D R U R' S2 R U' R' S2 D' L",
      "D L' R U R' S2 R U' R' S2 L D'",
      "L' D R' U R S2 R' U' R S2 D' L"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [IQ] (缓冲 UF, FL(F) -> DF(D))"
  },
  {
    "id": "chichu_e_ir",
    "code": "IR",
    "name": "彳亍棱块 [IR] (UF -> FL -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [IR]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "y2 M U R' U' M' U R U' y2",
    "algs": [
      "y2 M U R' U' M' U R U' y2",
      "E' D' L' D M D' L D M' E",
      "L D' M2 B' L B L' M2 L B' L' B D L'",
      "y' U R' U' S U R U' S' y"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [IR] (缓冲 UF, FL(F) -> DF(F))"
  },
  {
    "id": "chichu_e_is",
    "code": "IS",
    "name": "彳亍棱块 [IS] (UF -> FL -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [IS]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U2 L U S2 U' L' U S2 U",
    "algs": [
      "U2 L U S2 U' L' U S2 U",
      "R U2 L U S2 U' L' U S2 U R'",
      "R' U2 L U S2 U' L' U S2 U R",
      "R2 U2 L U S2 U' L' U S2 U R2"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [IS] (缓冲 UF, FL(F) -> DL(D))"
  },
  {
    "id": "chichu_e_it",
    "code": "IT",
    "name": "彳亍棱块 [IT] (UF -> FL -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [IT]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "u U' L' U S' U' L U S u'",
    "algs": [
      "u U' L' U S' U' L U S u'",
      "Uw U' L' U S' U' L U S Uw'",
      "u B' L B L' S' L B' L' B S u'",
      "Uw B' L B L' S' L B' L' B S Uw'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [IT] (缓冲 UF, FL(F) -> DL(L))"
  },
  {
    "id": "chichu_e_iu",
    "code": "IU",
    "name": "彳亍棱块 [IU] (UF -> FL -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [IU]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "y2 M2 U R' U' M2 U R U' y2",
    "algs": [
      "y2 M2 U R' U' M2 U R U' y2",
      "y2 D R D' M2 D R' D' M2 y2",
      "L' D' R U R' S2 R U' R' S2 D L",
      "D' L' R U R' S2 R U' R' S2 L D"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [IU] (缓冲 UF, FL(F) -> DB(D))"
  },
  {
    "id": "chichu_e_iv",
    "code": "IV",
    "name": "彳亍棱块 [IV] (UF -> FL -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [IV]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U2 M U' L' U M' U' L U'",
    "algs": [
      "U2 M U' L' U M' U' L U'",
      "L D' M2 B R' B' R M2 R' B R B' D L'",
      "B' L S L F' L' F S' F' L F L2 B",
      "D' R E F R' F' R E' R' F R F' R' D"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [IV] (缓冲 UF, FL(F) -> DB(B))"
  },
  {
    "id": "chichu_e_iw",
    "code": "IW",
    "name": "彳亍棱块 [IW] (UF -> FL -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [IW]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L D' M D2 M' D' L'",
    "algs": [
      "L D' M D2 M' D' L'",
      "d M2 R' F R F' M2 F R' F' R d'",
      "Dw M2 R' F R F' M2 F R' F' R Dw'",
      "L U' S D2 S' D2 U L'"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [IW] (缓冲 UF, FL(F) -> DR(D))"
  },
  {
    "id": "chichu_e_ix",
    "code": "IX",
    "name": "彳亍棱块 [IX] (UF -> FL -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [IX]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "d' D' L' D M D' L D M' d",
    "algs": [
      "d' D' L' D M D' L D M' d",
      "Dw' D' L' D M D' L D M' Dw",
      "u' U R' U' S U R U' S' u",
      "Uw' U R' U' S U R U' S' Uw"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [IX] (缓冲 UF, FL(F) -> DR(R))"
  },
  {
    "id": "chichu_e_ja",
    "code": "JA",
    "name": "彳亍棱块 [JA] (UF -> FL -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [JA]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U R' E R U2 R' E' R U",
    "algs": [
      "U R' E R U2 R' E' R U",
      "B' R' F' R E2 R' F R E2 B",
      "B' F' L F L' E2 L F' L' F E2 B",
      "Lw M' U2 M D M' U2 M D' Lw'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [JA] (缓冲 UF, FL(L) -> UB(U))"
  },
  {
    "id": "chichu_e_jb",
    "code": "JB",
    "name": "彳亍棱块 [JB] (UF -> FL -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [JB]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' L' U M' U' L U M",
    "algs": [
      "U' L' U M' U' L U M",
      "D U' L' U M' U' L U M D'",
      "D' U' L' U M' U' L U M D",
      "D2 U' L' U M' U' L U M D2"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [JB] (缓冲 UF, FL(L) -> UB(B))"
  },
  {
    "id": "chichu_e_je",
    "code": "JE",
    "name": "彳亍棱块 [JE] (UF -> FL -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [JE]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U2 R' E R U R' E' R U",
    "algs": [
      "U2 R' E R U R' E' R U",
      "U' R' E' R' F' R E R' F R2 U",
      "U' R' E' F' L F L' E L F' L' F R U"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [JE] (缓冲 UF, FL(L) -> UL(U))"
  },
  {
    "id": "chichu_e_jf",
    "code": "JF",
    "name": "彳亍棱块 [JF] (UF -> FL -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [JF]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L D M D' L D M' D' L2",
    "algs": [
      "L D M D' L D M' D' L2",
      "L U D' L' D S D' L D S' U' L'",
      "L U F' L F L' S L F' L' F S' U' L'",
      "U' L' S' R U R' S R U' R' L U"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [JF] (缓冲 UF, FL(L) -> UL(L))"
  },
  {
    "id": "chichu_e_jg",
    "code": "JG",
    "name": "彳亍棱块 [JG] (UF -> FL -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [JG]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R' E R U' R' E' R U",
    "algs": [
      "R' E R U' R' E' R U",
      "R' D E R U' R' E' R U R' D' R",
      "R' D' E R U' R' E' R U R' D R",
      "D R' E R U' R' E' R U D'"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [JG] (缓冲 UF, FL(L) -> UR(U))"
  },
  {
    "id": "chichu_e_jh",
    "code": "JH",
    "name": "彳亍棱块 [JH] (UF -> FL -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [JH]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F' R E2 R' F R E2 R'",
    "algs": [
      "F' R E2 R' F R E2 R'",
      "R D R' F' R E2 R' F R E2 D' R'",
      "R D' R' F' R E2 R' F R E2 D R'",
      "D F' R E2 R' F R E2 R' D'"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [JH] (缓冲 UF, FL(L) -> UR(R))"
  },
  {
    "id": "chichu_e_jk",
    "code": "JK",
    "name": "彳亍棱块 [JK] (UF -> FL -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [JK]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "E R U' R' E' R U R'",
    "algs": [
      "E R U' R' E' R U R'",
      "D E R U' R' E' R U R' D'",
      "D' E R U' R' E' R U R' D",
      "D2 E R U' R' E' R U R' D2"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [JK] (缓冲 UF, FL(L) -> FR(F))"
  },
  {
    "id": "chichu_e_jl",
    "code": "JL",
    "name": "彳亍棱块 [JL] (UF -> FL -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [JL]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R F' R E2 R' F R E2 R2",
    "algs": [
      "R F' R E2 R' F R E2 R2",
      "R2 D R' F' R E2 R' F R E2 D' R2",
      "R2 D' R' F' R E2 R' F R E2 D R2",
      "L2 E2 F R' F' R E2 R' F R F' L2"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [JL] (缓冲 UF, FL(L) -> FR(R))"
  },
  {
    "id": "chichu_e_jm",
    "code": "JM",
    "name": "彳亍棱块 [JM] (UF -> FL -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [JM]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "E' L U L' E L U' L'",
    "algs": [
      "E' L U L' E L U' L'",
      "d' L U L' E L U' L' E' d",
      "Dw' L U L' E L U' L' E' Dw",
      "u' R' F R F' E F R' F' R E' u"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [JM] (缓冲 UF, FL(L) -> BL(B))"
  },
  {
    "id": "chichu_e_jn",
    "code": "JN",
    "name": "彳亍棱块 [JN] (UF -> FL -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [JN]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L S R U R' S' R U' R' L'",
    "algs": [
      "L S R U R' S' R U' R' L'",
      "L' R U R' S R U' R' S' L",
      "D L S R U R' S' R U' R' L' D'",
      "D L' R U R' S R U' R' S' L D'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [JN] (缓冲 UF, FL(L) -> BL(L))"
  },
  {
    "id": "chichu_e_jo",
    "code": "JO",
    "name": "彳亍棱块 [JO] (UF -> FL -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [JO]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R2 E R U' R' E' R U R",
    "algs": [
      "R2 E R U' R' E' R U R",
      "R2 D E R U' R' E' R U R' D' R2",
      "R2 D' E R U' R' E' R U R' D R2",
      "F R' U' R E R' U R E' F'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [JO] (缓冲 UF, FL(L) -> BR(B))"
  },
  {
    "id": "chichu_e_jp",
    "code": "JP",
    "name": "彳亍棱块 [JP] (UF -> FL -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [JP]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R' F' R E2 R' F R E2",
    "algs": [
      "R' F' R E2 R' F R E2",
      "D R' F' R E2 R' F R E2 D'",
      "D' R' F' R E2 R' F R E2 D",
      "D2 R' F' R E2 R' F R E2 D2"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [JP] (缓冲 UF, FL(L) -> BR(R))"
  },
  {
    "id": "chichu_e_jq",
    "code": "JQ",
    "name": "彳亍棱块 [JQ] (UF -> FL -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [JQ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D F' R E' R' F R E R' D'",
    "algs": [
      "D F' R E' R' F R E R' D'",
      "D R F' L F L' E' L F' L' F E R' D'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [JQ] (缓冲 UF, FL(L) -> DF(D))"
  },
  {
    "id": "chichu_e_jr",
    "code": "JR",
    "name": "彳亍棱块 [JR] (UF -> FL -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [JR]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "M2 U' L' U M U' L U M",
    "algs": [
      "M2 U' L' U M U' L U M",
      "Rw M' U' L' U M U' L U Rw'",
      "L' M' F' L F L' M L F' L' F L",
      "M' L F' L' F M F' L F L'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [JR] (缓冲 UF, FL(L) -> DF(F))"
  },
  {
    "id": "chichu_e_js",
    "code": "JS",
    "name": "彳亍棱块 [JS] (UF -> FL -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [JS]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "u' S2 D R D' S2 D R' D' u",
    "algs": [
      "u' S2 D R D' S2 D R' D' u",
      "Uw' S2 D R D' S2 D R' D' Uw",
      "u' S2 F R' F' R S2 R' F R F' u",
      "Uw' S2 F R' F' R S2 R' F R F' Uw"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [JS] (缓冲 UF, FL(L) -> DL(D))"
  },
  {
    "id": "chichu_e_jt",
    "code": "JT",
    "name": "彳亍棱块 [JT] (UF -> FL -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [JT]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L D M D' L' D M' D'",
    "algs": [
      "L D M D' L' D M' D'",
      "U S D' L' D S' D' L D U'",
      "R U S D' L' D S' D' L D U' R'",
      "R' U S D' L' D S' D' L D U' R"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [JT] (缓冲 UF, FL(L) -> DL(L))"
  },
  {
    "id": "chichu_e_ju",
    "code": "JU",
    "name": "彳亍棱块 [JU] (UF -> FL -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [JU]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "M U' L' U M2 U' L U M",
    "algs": [
      "M U' L' U M2 U' L U M",
      "Rw M2 U' L' U M2 U' L U Rw'",
      "Rw' U' L' U M2 U' L U M2 Rw",
      "F R F R' F' R M2 R' F R F' M2 R' F'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [JU] (缓冲 UF, FL(L) -> DB(D))"
  },
  {
    "id": "chichu_e_jv",
    "code": "JV",
    "name": "彳亍棱块 [JV] (UF -> FL -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [JV]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "B2 U' L' U M' U' L U M B2",
    "algs": [
      "B2 U' L' U M' U' L U M B2",
      "B2 M L F' L' F M' F' L F L' B2",
      "L' U' F R' F' R M2 R' F R F' M2 U L",
      "L' D R U R' S R U' R' S' D' L"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [JV] (缓冲 UF, FL(L) -> DB(B))"
  },
  {
    "id": "chichu_e_jw",
    "code": "JW",
    "name": "彳亍棱块 [JW] (UF -> FL -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [JW]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F' R E' R' F R E R'",
    "algs": [
      "F' R E' R' F R E R'",
      "R D R' F' R E' R' F R E D' R'",
      "R D' R' F' R E' R' F R E D R'",
      "B F' R E' R' F R E R' B'"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [JW] (缓冲 UF, FL(L) -> DR(D))"
  },
  {
    "id": "chichu_e_jx",
    "code": "JX",
    "name": "彳亍棱块 [JX] (UF -> FL -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [JX]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R2 F' R E2 R' F R E2 R",
    "algs": [
      "R2 F' R E2 R' F R E2 R",
      "R' D R' F' R E2 R' F R E2 D' R",
      "R' D' R' F' R E2 R' F R E2 D R",
      "R' F' L F L' E2 L F' L' F E2 R"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [JX] (缓冲 UF, FL(L) -> DR(R))"
  },
  {
    "id": "chichu_e_ka",
    "code": "KA",
    "name": "彳亍棱块 [KA] (UF -> FR -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [KA]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R' U' S' U2 S U' R",
    "algs": [
      "R' U' S' U2 S U' R",
      "R' U M' U2 M S' M' U2 M S U' R",
      "R' U' S' M' U2 M S M' U2 M U R",
      "R' U M U2 M' S' M U2 M' S U' R"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [KA] (缓冲 UF, FR(F) -> UB(U))"
  },
  {
    "id": "chichu_e_kb",
    "code": "KB",
    "name": "彳亍棱块 [KB] (UF -> FR -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [KB]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U2 M' U R U' M U R' U",
    "algs": [
      "U2 M' U R U' M U R' U",
      "E' U' L' U M' U' L U M E",
      "d' U' L' U M' U' L U M d",
      "Dw' U' L' U M' U' L U M Dw"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [KB] (缓冲 UF, FR(F) -> UB(B))"
  },
  {
    "id": "chichu_e_ke",
    "code": "KE",
    "name": "彳亍棱块 [KE] (UF -> FR -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [KE]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R' S2 R U R' S2 R U'",
    "algs": [
      "R' S2 R U R' S2 R U'",
      "D R' S2 R U R' S2 R U' D'",
      "D' R' S2 R U R' S2 R U' D",
      "R' U R U' R' S2 R U R' S2 U' R"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [KE] (缓冲 UF, FR(F) -> UL(U))"
  },
  {
    "id": "chichu_e_kf",
    "code": "KF",
    "name": "彳亍棱块 [KF] (UF -> FR -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [KF]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R L' U' L S L' U L S' R'",
    "algs": [
      "R L' U' L S L' U L S' R'",
      "R D L' U' L S L' U L S' D' R'",
      "R D' L' U' L S L' U L S' D R'",
      "D R L' U' L S L' U L S' R' D'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [KF] (缓冲 UF, FR(F) -> UL(L))"
  },
  {
    "id": "chichu_e_kg",
    "code": "KG",
    "name": "彳亍棱块 [KG] (UF -> FR -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [KG]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U2 R' S2 R U' R' S2 R U'",
    "algs": [
      "U2 R' S2 R U' R' S2 R U'",
      "U R2 U R S2 R' U' R S2 R U'",
      "F' U' L S2 L' U L S2 L' F",
      "F' L2 U' L' S2 L U L' S2 L' F"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [KG] (缓冲 UF, FR(F) -> UR(U))"
  },
  {
    "id": "chichu_e_kh",
    "code": "KH",
    "name": "彳亍棱块 [KH] (UF -> FR -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [KH]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F' U' R E2 R' U R E2 R' F",
    "algs": [
      "F' U' R E2 R' U R E2 R' F",
      "F' R E2 L' U L E2 L' U' L R' F",
      "U L' E2 F R' F' R E2 R' F R F' L U'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [KH] (缓冲 UF, FR(F) -> UR(R))"
  },
  {
    "id": "chichu_e_ki",
    "code": "KI",
    "name": "彳亍棱块 [KI] (UF -> FR -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [KI]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R U' R E2 R' U R E2 R2",
    "algs": [
      "R U' R E2 R' U R E2 R2",
      "R2 D R' U' R E2 R' U R E2 D' R2",
      "R2 D' R' U' R E2 R' U R E2 D R2",
      "R2 E2 L' U L E2 L' U' L R2"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [KI] (缓冲 UF, FR(F) -> FL(F))"
  },
  {
    "id": "chichu_e_kj",
    "code": "KJ",
    "name": "彳亍棱块 [KJ] (UF -> FR -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [KJ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R U' R' E R U R' E'",
    "algs": [
      "R U' R' E R U R' E'",
      "D R U' R' E R U R' E' D'",
      "D' R U' R' E R U R' E' D",
      "D2 R U' R' E R U R' E' D2"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [KJ] (缓冲 UF, FR(F) -> FL(L))"
  },
  {
    "id": "chichu_e_km",
    "code": "KM",
    "name": "彳亍棱块 [KM] (UF -> FR -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [KM]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R U' R' E2 R U R' E2",
    "algs": [
      "R U' R' E2 R U R' E2",
      "D R U' R' E2 R U R' E2 D'",
      "D' R U' R' E2 R U R' E2 D",
      "D2 R U' R' E2 R U R' E2 D2"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [KM] (缓冲 UF, FR(F) -> BL(B))"
  },
  {
    "id": "chichu_e_kn",
    "code": "KN",
    "name": "彳亍棱块 [KN] (UF -> FR -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [KN]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R U' R E' R' U R E R2",
    "algs": [
      "R U' R E' R' U R E R2",
      "R2 D R' U' R E' R' U R E D' R2",
      "R2 D' R' U' R E' R' U R E D R2",
      "L2 E' R' F' R E R' F R L2"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [KN] (缓冲 UF, FR(F) -> BL(L))"
  },
  {
    "id": "chichu_e_ko",
    "code": "KO",
    "name": "彳亍棱块 [KO] (UF -> FR -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [KO]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U R' S R2 S' R' U'",
    "algs": [
      "U R' S R2 S' R' U'",
      "U R S' U2 S U2 R' U'",
      "U R' U2 S' U2 S R U'",
      "Rw L' U L S' L' U' L S Rw'"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [KO] (缓冲 UF, FR(F) -> BR(B))"
  },
  {
    "id": "chichu_e_kp",
    "code": "KP",
    "name": "彳亍棱块 [KP] (UF -> FR -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [KP]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R U' R' E' R U R' E",
    "algs": [
      "R U' R' E' R U R' E",
      "d' E R U' R' E' R U R' d",
      "Dw' E R U' R' E' R U R' Dw",
      "M' E R' U R E' R' U' R M"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [KP] (缓冲 UF, FR(F) -> BR(R))"
  },
  {
    "id": "chichu_e_kq",
    "code": "KQ",
    "name": "彳亍棱块 [KQ] (UF -> FR -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [KQ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U2 M2 U R U' M2 U R' U",
    "algs": [
      "U2 M2 U R U' M2 U R' U",
      "R D R' F R F' S' F R' F' R S D' R'",
      "R D' L' U' L S2 L' U L S2 D R'",
      "D' R L' U' L S2 L' U L S2 R' D"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [KQ] (缓冲 UF, FR(F) -> DF(D))"
  },
  {
    "id": "chichu_e_kr",
    "code": "KR",
    "name": "彳亍棱块 [KR] (UF -> FR -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [KR]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "y2 M U' L U M' U' L' U y2",
    "algs": [
      "y2 M U' L U M' U' L' U y2",
      "E D R D' M D R' D' M' E'",
      "R' D M2 B R' B' R M2 R' B R B' D' R",
      "y' U R U' S U R' U' S' y"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [KR] (缓冲 UF, FR(F) -> DF(F))"
  },
  {
    "id": "chichu_e_ks",
    "code": "KS",
    "name": "彳亍棱块 [KS] (UF -> FR -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [KS]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R' D M D2 M' D R",
    "algs": [
      "R' D M D2 M' D R",
      "d' M2 L F' L' F M2 F' L F L' d",
      "Dw' M2 L F' L' F M2 F' L F L' Dw",
      "U R U2 S U2 S' R' U'"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [KS] (缓冲 UF, FR(F) -> DL(D))"
  },
  {
    "id": "chichu_e_kt",
    "code": "KT",
    "name": "彳亍棱块 [KT] (UF -> FR -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [KT]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F R S2 R' F' R S2 R'",
    "algs": [
      "F R S2 R' F' R S2 R'",
      "L' R U' R' E R U R' E' L",
      "L' D R U' R' E R U R' E' D' L",
      "L' D' R U' R' E R U R' E' D L"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [KT] (缓冲 UF, FR(F) -> DL(L))"
  },
  {
    "id": "chichu_e_ku",
    "code": "KU",
    "name": "彳亍棱块 [KU] (UF -> FR -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [KU]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "y2 M2 U' L U M2 U' L' U y2",
    "algs": [
      "y2 M2 U' L U M2 U' L' U y2",
      "y2 D' L' D M2 D' L D M2 y2",
      "R D' R' F R F' S' F R' F' R S D R'",
      "R D L' U' L S2 L' U L S2 D' R'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [KU] (缓冲 UF, FR(F) -> DB(D))"
  },
  {
    "id": "chichu_e_kv",
    "code": "KV",
    "name": "彳亍棱块 [KV] (UF -> FR -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [KV]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U2 M U R U' M' U R' U",
    "algs": [
      "U2 M U R U' M' U R' U",
      "R' D M2 B' L B L' M2 L B' L' B D' R",
      "R D' L' U' L S' L' U L S D R'",
      "R D' L U' L' S' L U L' S D R'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [KV] (缓冲 UF, FR(F) -> DB(B))"
  },
  {
    "id": "chichu_e_kw",
    "code": "KW",
    "name": "彳亍棱块 [KW] (UF -> FR -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [KW]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U2 R' U' S2 U R U' S2 U'",
    "algs": [
      "U2 R' U' S2 U R U' S2 U'",
      "L U2 R' U' S2 U R U' S2 U' L'",
      "L' U2 R' U' S2 U R U' S2 U' L",
      "L2 U2 R' U' S2 U R U' S2 U' L2"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [KW] (缓冲 UF, FR(F) -> DR(D))"
  },
  {
    "id": "chichu_e_kx",
    "code": "KX",
    "name": "彳亍棱块 [KX] (UF -> FR -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [KX]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "u' U R U' S U R' U' S' u",
    "algs": [
      "u' U R U' S U R' U' S' u",
      "Uw' U R U' S U R' U' S' Uw",
      "u' B R' B' R S R' B R B' S' u",
      "Uw' B R' B' R S R' B R B' S' Uw"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [KX] (缓冲 UF, FR(F) -> DR(R))"
  },
  {
    "id": "chichu_e_la",
    "code": "LA",
    "name": "彳亍棱块 [LA] (UF -> FR -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [LA]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' R S' R' U2 R S R' U'",
    "algs": [
      "U' R S' R' U2 R S R' U'",
      "U' L E' L' U2 L E L' U'",
      "B F R' F' R E2 R' F R F' E2 B'",
      "Rw' M' U2 M D' M' U2 M D Rw"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [LA] (缓冲 UF, FR(R) -> UB(U))"
  },
  {
    "id": "chichu_e_lb",
    "code": "LB",
    "name": "彳亍棱块 [LB] (UF -> FR -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [LB]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U R U' M' U R' U' M",
    "algs": [
      "U R U' M' U R' U' M",
      "D U R U' M' U R' U' M D'",
      "D' U R U' M' U R' U' M D",
      "D2 U R U' M' U R' U' M D2"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [LB] (缓冲 UF, FR(R) -> UB(B))"
  },
  {
    "id": "chichu_e_le",
    "code": "LE",
    "name": "彳亍棱块 [LE] (UF -> FR -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [LE]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R S' R' U R S R' U'",
    "algs": [
      "R S' R' U R S R' U'",
      "R D S' R' U R S R' U' R D' R'",
      "R D' S' R' U R S R' U' R D R'",
      "D R S' R' U R S R' U' D'"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [LE] (缓冲 UF, FR(R) -> UL(U))"
  },
  {
    "id": "chichu_e_lf",
    "code": "LF",
    "name": "彳亍棱块 [LF] (UF -> FR -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [LF]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "Lw' R U R' E2 R U' R' E2 Lw",
    "algs": [
      "Lw' R U R' E2 R U' R' E2 Lw",
      "Lw' E2 L U' L' E2 L U L' Lw",
      "L' F R' F' R E2 R' F R F' E2 L",
      "L' D F R' F' R E2 R' F R F' E2 D' L"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [LF] (缓冲 UF, FR(R) -> UL(L))"
  },
  {
    "id": "chichu_e_lg",
    "code": "LG",
    "name": "彳亍棱块 [LG] (UF -> FR -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [LG]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U2 R S' R' U' R S R' U'",
    "algs": [
      "U2 R S' R' U' R S R' U'",
      "R' U' D R D' S' D R' D' S U R",
      "R' U' F R' F' R S' R' F R F' S U R",
      "F' L R' F R F' S2 F R' F' R S2 L' F"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [LG] (缓冲 UF, FR(R) -> UR(U))"
  },
  {
    "id": "chichu_e_lh",
    "code": "LH",
    "name": "彳亍棱块 [LH] (UF -> FR -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [LH]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R' D' M D R' D' M' D R2",
    "algs": [
      "R' D' M D R' D' M' D R2",
      "R' U' S U R' U' S' U R2",
      "R2 U' B R' B' R S R' B R B' S' U R2",
      "U R L F' L' F S' F' L F L' S R' U'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [LH] (缓冲 UF, FR(R) -> UR(R))"
  },
  {
    "id": "chichu_e_li",
    "code": "LI",
    "name": "彳亍棱块 [LI] (UF -> FR -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [LI]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "E' L' U L E L' U' L",
    "algs": [
      "E' L' U L E L' U' L",
      "d' L' U L E L' U' L E' d",
      "Dw' L' U L E L' U' L E' Dw",
      "u L F' L' F E F' L F L' E' u'"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [LI] (缓冲 UF, FR(R) -> FL(F))"
  },
  {
    "id": "chichu_e_lj",
    "code": "LJ",
    "name": "彳亍棱块 [LJ] (UF -> FR -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [LJ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R2 E2 R' F' R E2 R' F R'",
    "algs": [
      "R2 E2 R' F' R E2 R' F R'",
      "R2 D E2 R' F' R E2 R' F R D' R2",
      "R2 D' E2 R' F' R E2 R' F R D R2",
      "L2 F R' F' R E2 R' F R F' E2 L2"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [LJ] (缓冲 UF, FR(R) -> FL(L))"
  },
  {
    "id": "chichu_e_lm",
    "code": "LM",
    "name": "彳亍棱块 [LM] (UF -> FR -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [LM]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F' R E R' F' R E' R' F2",
    "algs": [
      "F' R E R' F' R E' R' F2",
      "F' R' E R' F' R E' R' F R2 F",
      "R2 U' E L U2 L' E' L U2 L' U R2",
      "L2 F R' F' R E R' F R F' E' L2"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [LM] (缓冲 UF, FR(R) -> BL(B))"
  },
  {
    "id": "chichu_e_ln",
    "code": "LN",
    "name": "彳亍棱块 [LN] (UF -> FR -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [LN]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "E R' U' R E2 R' U R E",
    "algs": [
      "E R' U' R E2 R' U R E",
      "d R' U' R E2 R' U R E2 d'",
      "d' E2 R' U' R E2 R' U R d",
      "Dw R' U' R E2 R' U R E2 Dw'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [LN] (缓冲 UF, FR(R) -> BL(L))"
  },
  {
    "id": "chichu_e_lo",
    "code": "LO",
    "name": "彳亍棱块 [LO] (UF -> FR -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [LO]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "E R' U' R E' R' U R",
    "algs": [
      "E R' U' R E' R' U R",
      "D E R' U' R E' R' U R D'",
      "D' E R' U' R E' R' U R D",
      "D2 E R' U' R E' R' U R D2"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [LO] (缓冲 UF, FR(R) -> BR(B))"
  },
  {
    "id": "chichu_e_lp",
    "code": "LP",
    "name": "彳亍棱块 [LP] (UF -> FR -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [LP]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F' E2 R' F' R E2 R' F R F",
    "algs": [
      "F' E2 R' F' R E2 R' F R F",
      "B2 F R' F' R E2 R' F R F' E2 B2",
      "F' E2 F' L F L' E2 L F' L' F2"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [LP] (缓冲 UF, FR(R) -> BR(R))"
  },
  {
    "id": "chichu_e_lq",
    "code": "LQ",
    "name": "彳亍棱块 [LQ] (UF -> FR -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [LQ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U R S R' F' R S' R' F U'",
    "algs": [
      "U R S R' F' R S' R' F U'",
      "R' U' R' F' R S' R' F R S U R",
      "D' L' F R' F' R E R' F R F' E' L D",
      "D' L' E' L' U L E L' U' L2 D"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [LQ] (缓冲 UF, FR(R) -> DF(D))"
  },
  {
    "id": "chichu_e_lr",
    "code": "LR",
    "name": "彳亍棱块 [LR] (UF -> FR -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [LR]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "M2 U R U' M U R' U' M",
    "algs": [
      "M2 U R U' M U R' U' M",
      "Lw' M' U R U' M U R' U' Lw",
      "R M' F R' F' R M R' F R F' R'",
      "B R M' F R' F' R M R' F R F' R' B'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [LR] (缓冲 UF, FR(R) -> DF(F))"
  },
  {
    "id": "chichu_e_ls",
    "code": "LS",
    "name": "彳亍棱块 [LS] (UF -> FR -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [LS]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L' E' L' U L E L' U' L2",
    "algs": [
      "L' E' L' U L E L' U' L2",
      "L' D E' L' U L E L' U' L D' L",
      "L' D' E' L' U L E L' U' L D L",
      "L' U E' L F' L' F E F' L F L' U' L"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [LS] (缓冲 UF, FR(R) -> DL(D))"
  },
  {
    "id": "chichu_e_lt",
    "code": "LT",
    "name": "彳亍棱块 [LT] (UF -> FR -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [LT]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U S R U2 R' S' R U2 R' U'",
    "algs": [
      "U S R U2 R' S' R U2 R' U'",
      "R2 U S R' U2 R S' R' U2 R U' R2",
      "u S D' L' D S' D' L D u'",
      "Uw S D' L' D S' D' L D Uw'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [LT] (缓冲 UF, FR(R) -> DL(L))"
  },
  {
    "id": "chichu_e_lu",
    "code": "LU",
    "name": "彳亍棱块 [LU] (UF -> FR -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [LU]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "M U R U' M2 U R' U' M",
    "algs": [
      "M U R U' M2 U R' U' M",
      "Lw U R U' M2 U R' U' M2 Lw'",
      "Lw' M2 U R U' M2 U R' U' Lw",
      "R M2 F R' F' R M2 R' F R F' R'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [LU] (缓冲 UF, FR(R) -> DB(D))"
  },
  {
    "id": "chichu_e_lv",
    "code": "LV",
    "name": "彳亍棱块 [LV] (UF -> FR -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [LV]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "B2 U R U' M' U R' U' M B2",
    "algs": [
      "B2 U R U' M' U R' U' M B2",
      "B2 M R' F R F' M' F R' F' R B2",
      "R U F' L F L' M2 L F' L' F M2 U' R'",
      "B E R' U' R E' R' U R B'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [LV] (缓冲 UF, FR(R) -> DB(B))"
  },
  {
    "id": "chichu_e_lw",
    "code": "LW",
    "name": "彳亍棱块 [LW] (UF -> FR -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [LW]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F' R E' R' F' R E R' F2",
    "algs": [
      "F' R E' R' F' R E R' F2",
      "F' R E' F' L F L' E L F' L' F R' F"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [LW] (缓冲 UF, FR(R) -> DR(D))"
  },
  {
    "id": "chichu_e_lx",
    "code": "LX",
    "name": "彳亍棱块 [LX] (UF -> FR -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [LX]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R' D' M D R D' M' D",
    "algs": [
      "R' D' M D R D' M' D",
      "R' U' S U R U' S' U",
      "L R' U' S U R U' S' U L'",
      "L' R' U' S U R U' S' U L"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [LX] (缓冲 UF, FR(R) -> DR(R))"
  },
  {
    "id": "chichu_e_ma",
    "code": "MA",
    "name": "彳亍棱块 [MA] (UF -> BL -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [MA]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L' U S U2 S' U L",
    "algs": [
      "L' U S U2 S' U L",
      "F' L S R U' R' S' R U R' L' F",
      "F' L S R' U' R S' R' U R L' F",
      "U L S L' U2 L S' L' U"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [MA] (缓冲 UF, BL(B) -> UB(U))"
  },
  {
    "id": "chichu_e_mb",
    "code": "MB",
    "name": "彳亍棱块 [MB] (UF -> BL -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [MB]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U2 M' U' L U M U' L' U'",
    "algs": [
      "U2 M' U' L U M U' L' U'",
      "y2 R' F R F' M F R' F' R M' y2",
      "E M L F' L' F M' F' L F L' E'",
      "d M L F' L' F M' F' L F L' d'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [MB] (缓冲 UF, BL(B) -> UB(B))"
  },
  {
    "id": "chichu_e_me",
    "code": "ME",
    "name": "彳亍棱块 [ME] (UF -> BL -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [ME]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U2 L S L' U L S' L' U",
    "algs": [
      "U2 L S L' U L S' L' U",
      "U' L2 U' L' S L U L' S' L' U",
      "F' L S D' L' D S' D' L D L' F",
      "F' L S F' L F L' S' L F' L' F L' F"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [ME] (缓冲 UF, BL(B) -> UL(U))"
  },
  {
    "id": "chichu_e_mf",
    "code": "MF",
    "name": "彳亍棱块 [MF] (UF -> BL -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [MF]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "B' L M' U' L' U M U' L U L' B",
    "algs": [
      "B' L M' U' L' U M U' L U L' B",
      "B' L2 F' L' F M F' L F L' M' L' B",
      "B' F' L F L' M L F' L' F M' B",
      "B' R F' L F L' M L F' L' F M' R' B"
    ],
    "moves": 12,
    "desc": "三阶彳亍棱块三循环 [MF] (缓冲 UF, BL(B) -> UL(L))"
  },
  {
    "id": "chichu_e_mg",
    "code": "MG",
    "name": "彳亍棱块 [MG] (UF -> BL -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [MG]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L S L' U' L S' L' U",
    "algs": [
      "L S L' U' L S' L' U",
      "L D S L' U' L S' L' U L D' L'",
      "L D' S L' U' L S' L' U L D L'",
      "D L S L' U' L S' L' U D'"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [MG] (缓冲 UF, BL(B) -> UR(U))"
  },
  {
    "id": "chichu_e_mh",
    "code": "MH",
    "name": "彳亍棱块 [MH] (UF -> BL -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [MH]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F' L S' L2 S L F",
    "algs": [
      "F' L S' L2 S L F",
      "L R U R' S' R U' R' S L'",
      "L D R U R' S' R U' R' S D' L'",
      "L D' R U R' S' R U' R' S D L'"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [MH] (缓冲 UF, BL(B) -> UR(R))"
  },
  {
    "id": "chichu_e_mi",
    "code": "MI",
    "name": "彳亍棱块 [MI] (UF -> BL -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [MI]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' L' S' L2 S L' U",
    "algs": [
      "U' L' S' L2 S L' U",
      "L U' S2 L' U' L S2 L' U L U L'",
      "L' U' L' U' L S2 L' U L S2 U L",
      "L U' S2 L U' L' S2 L U L' U L'"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [MI] (缓冲 UF, BL(B) -> FL(F))"
  },
  {
    "id": "chichu_e_mj",
    "code": "MJ",
    "name": "彳亍棱块 [MJ] (UF -> BL -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [MJ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L U L' E' L U' L' E",
    "algs": [
      "L U L' E' L U' L' E",
      "d' E L U L' E' L U' L' d",
      "Dw' E L U L' E' L U' L' Dw",
      "u' E R' F R F' E' F R' F' R u"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [MJ] (缓冲 UF, BL(B) -> FL(L))"
  },
  {
    "id": "chichu_e_mk",
    "code": "MK",
    "name": "彳亍棱块 [MK] (UF -> BL -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [MK]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "E2 R U' R' E2 R U R'",
    "algs": [
      "E2 R U' R' E2 R U R'",
      "D E2 R U' R' E2 R U R' D'",
      "D' E2 R U' R' E2 R U R' D",
      "D2 E2 R U' R' E2 R U R' D2"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [MK] (缓冲 UF, BL(B) -> FR(F))"
  },
  {
    "id": "chichu_e_ml",
    "code": "ML",
    "name": "彳亍棱块 [ML] (UF -> BL -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [ML]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F2 R E R' F R E' R' F",
    "algs": [
      "F2 R E R' F R E' R' F",
      "F' R2 F' R E R' F R E' R F",
      "R2 U' L U2 L' E L U2 L' E' U R2",
      "L2 E F R' F' R E' R' F R F' L2"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [ML] (缓冲 UF, BL(B) -> FR(R))"
  },
  {
    "id": "chichu_e_mo",
    "code": "MO",
    "name": "彳亍棱块 [MO] (UF -> BL -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [MO]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R2 E2 R U' R' E2 R U R",
    "algs": [
      "R2 E2 R U' R' E2 R U R",
      "R2 D E2 R U' R' E2 R U R' D' R2",
      "R2 D' E2 R U' R' E2 R U R' D R2",
      "L2 E2 R' U' R E2 R' U R L2"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [MO] (缓冲 UF, BL(B) -> BR(B))"
  },
  {
    "id": "chichu_e_mp",
    "code": "MP",
    "name": "彳亍棱块 [MP] (UF -> BL -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [MP]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L U L' E L U' L' E'",
    "algs": [
      "L U L' E L U' L' E'",
      "D L U L' E L U' L' E' D'",
      "D' L U L' E L U' L' E' D",
      "D2 L U L' E L U' L' E' D2"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [MP] (缓冲 UF, BL(B) -> BR(R))"
  },
  {
    "id": "chichu_e_mq",
    "code": "MQ",
    "name": "彳亍棱块 [MQ] (UF -> BL -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [MQ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U2 M2 U' L U M2 U' L' U'",
    "algs": [
      "U2 M2 U' L U M2 U' L' U'",
      "U2 D' L' D M2 D' L D M2 U2",
      "L D R U R' S2 R U' R' S2 D' L'",
      "D L R U R' S2 R U' R' S2 L' D'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [MQ] (缓冲 UF, BL(B) -> DF(D))"
  },
  {
    "id": "chichu_e_mr",
    "code": "MR",
    "name": "彳亍棱块 [MR] (UF -> BL -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [MR]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "y2 M U R U' M' U R' U' y2",
    "algs": [
      "y2 M U R U' M' U R' U' y2",
      "E' D R D' M D R' D' M' E",
      "F2 M D' L' D M' D' L D F2",
      "L' D' M2 B' L B L' M2 L B' L' B D L"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [MR] (缓冲 UF, BL(B) -> DF(F))"
  },
  {
    "id": "chichu_e_ms",
    "code": "MS",
    "name": "彳亍棱块 [MS] (UF -> BL -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [MS]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U2 L' U S2 U' L U S2 U",
    "algs": [
      "U2 L' U S2 U' L U S2 U",
      "R U2 L' U S2 U' L U S2 U R'",
      "R' U2 L' U S2 U' L U S2 U R",
      "R2 U2 L' U S2 U' L U S2 U R2"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [MS] (缓冲 UF, BL(B) -> DL(D))"
  },
  {
    "id": "chichu_e_mt",
    "code": "MT",
    "name": "彳亍棱块 [MT] (UF -> BL -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [MT]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "d M' L F' L' F M F' L F L' d'",
    "algs": [
      "d M' L F' L' F M F' L F L' d'",
      "Dw M' L F' L' F M F' L F L' Dw'",
      "B' L M' U' L U M U' L' U L' B",
      "L' D' L F' L' F M2 F' L F L' M2 D L"
    ],
    "moves": 12,
    "desc": "三阶彳亍棱块三循环 [MT] (缓冲 UF, BL(B) -> DL(L))"
  },
  {
    "id": "chichu_e_mu",
    "code": "MU",
    "name": "彳亍棱块 [MU] (UF -> BL -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [MU]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "B' M' U' L U M U' L' U B",
    "algs": [
      "B' M' U' L U M U' L' U B",
      "B' R M' U' L U M U' L' U R' B",
      "B' L F' L F L' M L F' L' F M' L' B",
      "E M2 L F' L' F M2 F' L F L' E'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [MU] (缓冲 UF, BL(B) -> DB(D))"
  },
  {
    "id": "chichu_e_mv",
    "code": "MV",
    "name": "彳亍棱块 [MV] (UF -> BL -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [MV]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U2 M U' L U M' U' L' U'",
    "algs": [
      "U2 M U' L U M' U' L' U'",
      "L' D' M2 B R' B' R M2 R' B R B' D L",
      "D' R' L U L' E L U' L' E' R D",
      "F' E' B' L B L' E L B' L' B F"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [MV] (缓冲 UF, BL(B) -> DB(B))"
  },
  {
    "id": "chichu_e_mw",
    "code": "MW",
    "name": "彳亍棱块 [MW] (UF -> BL -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [MW]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L' D' M D2 M' D' L",
    "algs": [
      "L' D' M D2 M' D' L",
      "d M2 L F' L' F M2 F' L F L' d'",
      "Dw M2 L F' L' F M2 F' L F L' Dw'",
      "L' U' S D2 S' D2 U L"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [MW] (缓冲 UF, BL(B) -> DR(D))"
  },
  {
    "id": "chichu_e_mx",
    "code": "MX",
    "name": "彳亍棱块 [MX] (UF -> BL -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [MX]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F' L' S L2 S' L' F",
    "algs": [
      "F' L' S L2 S' L' F",
      "U L' U' L' U S U' L U S' L U'",
      "U L' B' L B L' S L B' L' B S' L U'",
      "F' L S' D2 S D2 L' F"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [MX] (缓冲 UF, BL(B) -> DR(R))"
  },
  {
    "id": "chichu_e_na",
    "code": "NA",
    "name": "彳亍棱块 [NA] (UF -> BL -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [NA]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U R E' R' U2 R E R' U",
    "algs": [
      "U R E' R' U2 R E R' U",
      "Lw' D' M U2 M' D M U2 M' Lw",
      "x D' M U2 M' D M U2 M' x'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [NA] (缓冲 UF, BL(L) -> UB(U))"
  },
  {
    "id": "chichu_e_nb",
    "code": "NB",
    "name": "彳亍棱块 [NB] (UF -> BL -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [NB]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' L U M' U' L' U M",
    "algs": [
      "U' L U M' U' L' U M",
      "D U' L U M' U' L' U M D'",
      "D' U' L U M' U' L' U M D",
      "D2 U' L U M' U' L' U M D2"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [NB] (缓冲 UF, BL(L) -> UB(B))"
  },
  {
    "id": "chichu_e_ne",
    "code": "NE",
    "name": "彳亍棱块 [NE] (UF -> BL -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [NE]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U2 R E' R' U R E R' U",
    "algs": [
      "U2 R E' R' U R E R' U",
      "F L S R S' L' S R' S' F'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [NE] (缓冲 UF, BL(L) -> UL(U))"
  },
  {
    "id": "chichu_e_nf",
    "code": "NF",
    "name": "彳亍棱块 [NF] (UF -> BL -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [NF]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L' D M D' L' D M' D' L2",
    "algs": [
      "L' D M D' L' D M' D' L2",
      "B L2 F' L' F M2 F' L F L' M2 L' B'",
      "B F' L F L' M2 L F' L' F M2 B'",
      "B R F' L F L' M2 L F' L' F M2 R' B'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [NF] (缓冲 UF, BL(L) -> UL(L))"
  },
  {
    "id": "chichu_e_ng",
    "code": "NG",
    "name": "彳亍棱块 [NG] (UF -> BL -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [NG]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R E' R' U' R E R' U",
    "algs": [
      "R E' R' U' R E R' U",
      "R D E' R' U' R E R' U R D' R'",
      "R D' E' R' U' R E R' U R D R'",
      "D R E' R' U' R E R' U D'"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [NG] (缓冲 UF, BL(L) -> UR(U))"
  },
  {
    "id": "chichu_e_nh",
    "code": "NH",
    "name": "彳亍棱块 [NH] (UF -> BL -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [NH]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F' R E L2 E' L2 R' F",
    "algs": [
      "F' R E L2 E' L2 R' F",
      "F' R' E F2 E' F2 R F",
      "U' R E L U' L' E' L U L' R' U",
      "F' R' L2 E' L2 E R F"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [NH] (缓冲 UF, BL(L) -> UR(R))"
  },
  {
    "id": "chichu_e_ni",
    "code": "NI",
    "name": "彳亍棱块 [NI] (UF -> BL -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [NI]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "E L' U L E' L' U' L",
    "algs": [
      "E L' U L E' L' U' L",
      "D E L' U L E' L' U' L D'",
      "D' E L' U L E' L' U' L D",
      "D2 E L' U L E' L' U' L D2"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [NI] (缓冲 UF, BL(L) -> FL(F))"
  },
  {
    "id": "chichu_e_nj",
    "code": "NJ",
    "name": "彳亍棱块 [NJ] (UF -> BL -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [NJ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L R U R' S R U' R' S' L'",
    "algs": [
      "L R U R' S R U' R' S' L'",
      "L' S R U R' S' R U' R' L",
      "D L R U R' S R U' R' S' L' D'",
      "D L' S R U R' S' R U' R' L D'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [NJ] (缓冲 UF, BL(L) -> FL(L))"
  },
  {
    "id": "chichu_e_nk",
    "code": "NK",
    "name": "彳亍棱块 [NK] (UF -> BL -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [NK]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R2 E' R' U' R E R' U R'",
    "algs": [
      "R2 E' R' U' R E R' U R'",
      "R2 D E' R' U' R E R' U R D' R2",
      "R2 D' E' R' U' R E R' U R D R2",
      "L2 R' F' R E' R' F R E L2"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [NK] (缓冲 UF, BL(L) -> FR(F))"
  },
  {
    "id": "chichu_e_nl",
    "code": "NL",
    "name": "彳亍棱块 [NL] (UF -> BL -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [NL]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "E' R' U' R E2 R' U R E'",
    "algs": [
      "E' R' U' R E2 R' U R E'",
      "d E2 R' U' R E2 R' U R d'",
      "d' R' U' R E2 R' U R E2 d",
      "Dw E2 R' U' R E2 R' U R Dw'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [NL] (缓冲 UF, BL(L) -> FR(R))"
  },
  {
    "id": "chichu_e_no",
    "code": "NO",
    "name": "彳亍棱块 [NO] (UF -> BL -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [NO]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "E' R' U' R E R' U R",
    "algs": [
      "E' R' U' R E R' U R",
      "d' R' U' R E R' U R E' d",
      "Dw' R' U' R E R' U R E' Dw",
      "E L' U L E L' U' L E2"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [NO] (缓冲 UF, BL(L) -> BR(B))"
  },
  {
    "id": "chichu_e_np",
    "code": "NP",
    "name": "彳亍棱块 [NP] (UF -> BL -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [NP]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "B M' B2 M B",
    "algs": [
      "B M' B2 M B",
      "B R M' B2 M B2 R' B'",
      "B' R B2 M' B2 M R' B",
      "B L M' B2 M B2 L' B'"
    ],
    "moves": 5,
    "desc": "三阶彳亍棱块三循环 [NP] (缓冲 UF, BL(L) -> BR(R))"
  },
  {
    "id": "chichu_e_nq",
    "code": "NQ",
    "name": "彳亍棱块 [NQ] (UF -> BL -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [NQ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F' E F2 E' F'",
    "algs": [
      "F' E F2 E' F'",
      "F E' L2 E L2 F'",
      "F' L2 E' L2 E F",
      "D R' E' R' U' R E R' U R2 D'"
    ],
    "moves": 5,
    "desc": "三阶彳亍棱块三循环 [NQ] (缓冲 UF, BL(L) -> DF(D))"
  },
  {
    "id": "chichu_e_nr",
    "code": "NR",
    "name": "彳亍棱块 [NR] (UF -> BL -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [NR]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D' L' D M D' L D M'",
    "algs": [
      "D' L' D M D' L D M'",
      "Rw' M' D' L' D M D' L D Rw",
      "L M' F' L F L' M L F' L' F L'",
      "x2 U' L' U M U' L U M' x2"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [NR] (缓冲 UF, BL(L) -> DF(F))"
  },
  {
    "id": "chichu_e_ns",
    "code": "NS",
    "name": "彳亍棱块 [NS] (UF -> BL -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [NS]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "u' S2 L' U2 L S2 L' U2 L u",
    "algs": [
      "u' S2 L' U2 L S2 L' U2 L u",
      "Uw' S2 L' U2 L S2 L' U2 L Uw"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [NS] (缓冲 UF, BL(L) -> DL(D))"
  },
  {
    "id": "chichu_e_nt",
    "code": "NT",
    "name": "彳亍棱块 [NT] (UF -> BL -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [NT]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L' D M D' L D M' D'",
    "algs": [
      "L' D M D' L D M' D'",
      "R L' D M D' L D M' D' R'",
      "R' L' D M D' L D M' D' R",
      "D R D' L' D M D' L D M' R' D'"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [NT] (缓冲 UF, BL(L) -> DL(L))"
  },
  {
    "id": "chichu_e_nu",
    "code": "NU",
    "name": "彳亍棱块 [NU] (UF -> BL -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [NU]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "M U' L U M2 U' L' U M",
    "algs": [
      "M U' L U M2 U' L' U M",
      "Rw M2 U' L U M2 U' L' U Rw'",
      "Rw' U' L U M2 U' L' U M2 Rw",
      "M' D' L' D M2 D' L D M'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [NU] (缓冲 UF, BL(L) -> DB(D))"
  },
  {
    "id": "chichu_e_nv",
    "code": "NV",
    "name": "彳亍棱块 [NV] (UF -> BL -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [NV]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D L' D M D' L D M' D2",
    "algs": [
      "D L' D M D' L D M' D2",
      "L U' F R' F' R M2 R' F R F' M2 U L'",
      "L D R U R' S R U' R' S' D' L'",
      "L D R' U R S R' U' R S' D' L'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [NV] (缓冲 UF, BL(L) -> DB(B))"
  },
  {
    "id": "chichu_e_nw",
    "code": "NW",
    "name": "彳亍棱块 [NW] (UF -> BL -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [NW]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R' E' R' U' R E R' U R2",
    "algs": [
      "R' E' R' U' R E R' U R2",
      "R' D E' R' U' R E R' U R D' R",
      "R' D' E' R' U' R E R' U R D R",
      "R' U E' R' U2 R E R' U2 R U' R"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [NW] (缓冲 UF, BL(L) -> DR(D))"
  },
  {
    "id": "chichu_e_nx",
    "code": "NX",
    "name": "彳亍棱块 [NX] (UF -> BL -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [NX]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F' R' E L2 E' L2 R F",
    "algs": [
      "F' R' E L2 E' L2 R F",
      "F' R E F2 E' F2 R' F",
      "F' R L2 E' L2 E R' F",
      "F' R' B2 E' B2 E R F"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [NX] (缓冲 UF, BL(L) -> DR(R))"
  },
  {
    "id": "chichu_e_oa",
    "code": "OA",
    "name": "彳亍棱块 [OA] (UF -> BR -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [OA]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R U' S' U2 S U' R'",
    "algs": [
      "R U' S' U2 S U' R'",
      "R U M' U2 M S' M' U2 M S U' R'",
      "R U' S' M' U2 M S M' U2 M U R'",
      "R U M U2 M' S' M U2 M' S U' R'"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [OA] (缓冲 UF, BR(B) -> UB(U))"
  },
  {
    "id": "chichu_e_ob",
    "code": "OB",
    "name": "彳亍棱块 [OB] (UF -> BR -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [OB]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U2 M' U R' U' M U R U",
    "algs": [
      "U2 M' U R' U' M U R U",
      "E U' L U M' U' L' U M E'",
      "d U' L U M' U' L' U M d'",
      "Dw U' L U M' U' L' U M Dw'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [OB] (缓冲 UF, BR(B) -> UB(B))"
  },
  {
    "id": "chichu_e_oe",
    "code": "OE",
    "name": "彳亍棱块 [OE] (UF -> BR -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [OE]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R S2 R' U R S2 R' U'",
    "algs": [
      "R S2 R' U R S2 R' U'",
      "D R S2 R' U R S2 R' U' D'",
      "D' R S2 R' U R S2 R' U' D",
      "R U R' U' R S2 R' U R S2 U' R'"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [OE] (缓冲 UF, BR(B) -> UL(U))"
  },
  {
    "id": "chichu_e_of",
    "code": "OF",
    "name": "彳亍棱块 [OF] (UF -> BR -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [OF]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F R' S R2 S' R' F'",
    "algs": [
      "F R' S R2 S' R' F'",
      "R' L' U' L S L' U L S' R",
      "R' D L' U' L S L' U L S' D' R",
      "R' D' L' U' L S L' U L S' D R"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [OF] (缓冲 UF, BR(B) -> UL(L))"
  },
  {
    "id": "chichu_e_og",
    "code": "OG",
    "name": "彳亍棱块 [OG] (UF -> BR -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [OG]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U2 R S2 R' U' R S2 R' U'",
    "algs": [
      "U2 R S2 R' U' R S2 R' U'",
      "R2 U S2 R U2 R' S2 R U2 R' U' R2",
      "R U R' U2 R S2 R' U2 R S2 U' R'",
      "R U S2 U R U' S2 U R' U2 R'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [OG] (缓冲 UF, BR(B) -> UR(U))"
  },
  {
    "id": "chichu_e_oh",
    "code": "OH",
    "name": "彳亍棱块 [OH] (UF -> BR -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [OH]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F' R' S' L' S R S' L S F",
    "algs": [
      "F' R' S' L' S R S' L S F"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [OH] (缓冲 UF, BR(B) -> UR(R))"
  },
  {
    "id": "chichu_e_oi",
    "code": "OI",
    "name": "彳亍棱块 [OI] (UF -> BR -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [OI]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R' U' R E2 R' U R E2",
    "algs": [
      "R' U' R E2 R' U R E2",
      "D R' U' R E2 R' U R E2 D'",
      "D' R' U' R E2 R' U R E2 D",
      "D2 R' U' R E2 R' U R E2 D2"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [OI] (缓冲 UF, BR(B) -> FL(F))"
  },
  {
    "id": "chichu_e_oj",
    "code": "OJ",
    "name": "彳亍棱块 [OJ] (UF -> BR -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [OJ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R' U' R' E R U R' E' R2",
    "algs": [
      "R' U' R' E R U R' E' R2",
      "R2 D R U' R' E R U R' E' D' R2",
      "R2 D' R U' R' E R U R' E' D R2",
      "F E R' U' R E' R' U R F'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [OJ] (缓冲 UF, BR(B) -> FL(L))"
  },
  {
    "id": "chichu_e_ok",
    "code": "OK",
    "name": "彳亍棱块 [OK] (UF -> BR -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [OK]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U R S R2 S' R U'",
    "algs": [
      "U R S R2 S' R U'",
      "U R U2 S' U2 S R' U'",
      "U R' S' U2 S U2 R U'",
      "R2 F R F' S' F R' F' R S R"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [OK] (缓冲 UF, BR(B) -> FR(F))"
  },
  {
    "id": "chichu_e_ol",
    "code": "OL",
    "name": "彳亍棱块 [OL] (UF -> BR -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [OL]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R S' R' F R S R' F'",
    "algs": [
      "R S' R' F R S R' F'",
      "Rw' R' F' R S' R' F R S Rw",
      "x' R' F' R S' R' F R S x",
      "U' R' D R D' S' D R' D' S R U"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [OL] (缓冲 UF, BR(B) -> FR(R))"
  },
  {
    "id": "chichu_e_om",
    "code": "OM",
    "name": "彳亍棱块 [OM] (UF -> BR -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [OM]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R' U' R' E2 R U R' E2 R2",
    "algs": [
      "R' U' R' E2 R U R' E2 R2",
      "R2 D R U' R' E2 R U R' E2 D' R2",
      "R2 D' R U' R' E2 R U R' E2 D R2",
      "L2 R' U' R E2 R' U R E2 L2"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [OM] (缓冲 UF, BR(B) -> BL(B))"
  },
  {
    "id": "chichu_e_on",
    "code": "ON",
    "name": "彳亍棱块 [ON] (UF -> BR -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [ON]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R' U' R E' R' U R E",
    "algs": [
      "R' U' R E' R' U R E",
      "d' E R' U' R E' R' U R d",
      "Dw' E R' U' R E' R' U R Dw",
      "E2 L' U L E' L' U' L E'"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [ON] (缓冲 UF, BR(B) -> BL(L))"
  },
  {
    "id": "chichu_e_oq",
    "code": "OQ",
    "name": "彳亍棱块 [OQ] (UF -> BR -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [OQ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U2 M2 U R' U' M2 U R U",
    "algs": [
      "U2 M2 U R' U' M2 U R U",
      "U2 D R D' M2 D R' D' M2 U2",
      "R' D R' F R F' S' F R' F' R S D' R",
      "R' D' L' U' L S2 L' U L S2 D R"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [OQ] (缓冲 UF, BR(B) -> DF(D))"
  },
  {
    "id": "chichu_e_or",
    "code": "OR",
    "name": "彳亍棱块 [OR] (UF -> BR -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [OR]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "y2 M U' L' U M' U' L U y2",
    "algs": [
      "y2 M U' L' U M' U' L U y2",
      "F2 M D R D' M' D R' D' F2",
      "E D' L' D M D' L D M' E'",
      "R D M2 B R' B' R M2 R' B R B' D' R'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [OR] (缓冲 UF, BR(B) -> DF(F))"
  },
  {
    "id": "chichu_e_os",
    "code": "OS",
    "name": "彳亍棱块 [OS] (UF -> BR -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [OS]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R D M D2 M' D R'",
    "algs": [
      "R D M D2 M' D R'",
      "d' M2 R' F R F' M2 F R' F' R d",
      "Dw' M2 R' F R F' M2 F R' F' R Dw",
      "U R' U2 S U2 S' R U'"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [OS] (缓冲 UF, BR(B) -> DL(D))"
  },
  {
    "id": "chichu_e_ot",
    "code": "OT",
    "name": "彳亍棱块 [OT] (UF -> BR -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [OT]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F R S' R2 S R F'",
    "algs": [
      "F R S' R2 S R F'",
      "U' R U R U' S' U R' U' S R' U",
      "U' R B R' B' R S' R' B R B' S R' U",
      "R2 F R F' S2 F R' F' R S2 R"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [OT] (缓冲 UF, BR(B) -> DL(L))"
  },
  {
    "id": "chichu_e_ou",
    "code": "OU",
    "name": "彳亍棱块 [OU] (UF -> BR -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [OU]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "B M' U R' U' M U R U' B'",
    "algs": [
      "B M' U R' U' M U R U' B'",
      "B L M' U R' U' M U R U' L' B'",
      "E' M2 R' F R F' M2 F R' F' R E",
      "y2 M2 U' L' U M2 U' L U y2"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [OU] (缓冲 UF, BR(B) -> DB(D))"
  },
  {
    "id": "chichu_e_ov",
    "code": "OV",
    "name": "彳亍棱块 [OV] (UF -> BR -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [OV]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U2 M U R' U' M' U R U",
    "algs": [
      "U2 M U R' U' M' U R U",
      "R D M2 B' L B L' M2 L B' L' B D' R'",
      "R' D' L' U' L S' L' U L S D R",
      "R' D' L U' L' S' L U L' S D R"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [OV] (缓冲 UF, BR(B) -> DB(B))"
  },
  {
    "id": "chichu_e_ow",
    "code": "OW",
    "name": "彳亍棱块 [OW] (UF -> BR -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [OW]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U2 R U' S2 U R' U' S2 U'",
    "algs": [
      "U2 R U' S2 U R' U' S2 U'",
      "L U2 R U' S2 U R' U' S2 U' L'",
      "L' U2 R U' S2 U R' U' S2 U' L",
      "L2 U2 R U' S2 U R' U' S2 U' L2"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [OW] (缓冲 UF, BR(B) -> DR(D))"
  },
  {
    "id": "chichu_e_ox",
    "code": "OX",
    "name": "彳亍棱块 [OX] (UF -> BR -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [OX]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F' R' S' L' S R' S' L S R2 F",
    "algs": [
      "F' R' S' L' S R' S' L S R2 F"
    ],
    "moves": 11,
    "desc": "三阶彳亍棱块三循环 [OX] (缓冲 UF, BR(B) -> DR(R))"
  },
  {
    "id": "chichu_e_pa",
    "code": "PA",
    "name": "彳亍棱块 [PA] (UF -> BR -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [PA]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' R' S' R U2 R' S R U'",
    "algs": [
      "U' R' S' R U2 R' S R U'",
      "U' L' E L U2 L' E' L U'",
      "Rw D M U2 M' D' M U2 M' Rw'",
      "x D M U2 M' D' M U2 M' x'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [PA] (缓冲 UF, BR(R) -> UB(U))"
  },
  {
    "id": "chichu_e_pb",
    "code": "PB",
    "name": "彳亍棱块 [PB] (UF -> BR -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [PB]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U R' U' M' U R U' M",
    "algs": [
      "U R' U' M' U R U' M",
      "D U R' U' M' U R U' M D'",
      "D' U R' U' M' U R U' M D",
      "D2 U R' U' M' U R U' M D2"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [PB] (缓冲 UF, BR(R) -> UB(B))"
  },
  {
    "id": "chichu_e_pe",
    "code": "PE",
    "name": "彳亍棱块 [PE] (UF -> BR -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [PE]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R' S' R U R' S R U'",
    "algs": [
      "R' S' R U R' S R U'",
      "R' D S' R U R' S R U' R' D' R",
      "R' D' S' R U R' S R U' R' D R",
      "D R' S' R U R' S R U' D'"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [PE] (缓冲 UF, BR(R) -> UL(U))"
  },
  {
    "id": "chichu_e_pf",
    "code": "PF",
    "name": "彳亍棱块 [PF] (UF -> BR -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [PF]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F L' B2 E B2 E' L F'",
    "algs": [
      "F L' B2 E B2 E' L F'",
      "F L' E' R2 E R2 L F'",
      "U L' E' R' U R E R' U' R L U'",
      "L E2 R' F' R E2 R' F R L'"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [PF] (缓冲 UF, BR(R) -> UL(L))"
  },
  {
    "id": "chichu_e_pg",
    "code": "PG",
    "name": "彳亍棱块 [PG] (UF -> BR -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [PG]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U2 R' S' R U' R' S R U'",
    "algs": [
      "U2 R' S' R U' R' S R U'",
      "U R2 U R S' R' U' R S R U'",
      "U2 L' E L U' L' E' L U'",
      "F' R' E' L' U2 L E L' U2 L R F"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [PG] (缓冲 UF, BR(R) -> UR(U))"
  },
  {
    "id": "chichu_e_ph",
    "code": "PH",
    "name": "彳亍棱块 [PH] (UF -> BR -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [PH]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R D' M D R D' M' D R2",
    "algs": [
      "R D' M D R D' M' D R2",
      "B' F R' F' R M2 R' F R F' M2 B",
      "B' L F R' F' R M2 R' F R F' M2 L' B",
      "R U' S U R U' S' U R2"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [PH] (缓冲 UF, BR(R) -> UR(R))"
  },
  {
    "id": "chichu_e_pi",
    "code": "PI",
    "name": "彳亍棱块 [PI] (UF -> BR -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [PI]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L2 E L U L' E' L U' L",
    "algs": [
      "L2 E L U L' E' L U' L",
      "L2 D E L U L' E' L U' L' D' L2",
      "L2 D' E L U L' E' L U' L' D L2",
      "L2 U' E L U2 L' E' L U2 L' U L2"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [PI] (缓冲 UF, BR(R) -> FL(F))"
  },
  {
    "id": "chichu_e_pj",
    "code": "PJ",
    "name": "彳亍棱块 [PJ] (UF -> BR -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [PJ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "E2 R' F' R E2 R' F R",
    "algs": [
      "E2 R' F' R E2 R' F R",
      "D E2 R' F' R E2 R' F R D'",
      "D' E2 R' F' R E2 R' F R D",
      "D2 E2 R' F' R E2 R' F R D2"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [PJ] (缓冲 UF, BR(R) -> FL(L))"
  },
  {
    "id": "chichu_e_pk",
    "code": "PK",
    "name": "彳亍棱块 [PK] (UF -> BR -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [PK]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "E' R U' R' E R U R'",
    "algs": [
      "E' R U' R' E R U R'",
      "d' R U' R' E R U R' E' d",
      "Dw' R U' R' E R U R' E' Dw",
      "M' R' U R E R' U' R E' M"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [PK] (缓冲 UF, BR(R) -> FR(F))"
  },
  {
    "id": "chichu_e_pl",
    "code": "PL",
    "name": "彳亍棱块 [PL] (UF -> BR -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [PL]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F' R' F' R E2 R' F R E2 F",
    "algs": [
      "F' R' F' R E2 R' F R E2 F",
      "B2 E2 F R' F' R E2 R' F R F' B2",
      "F2 L F L' E2 L F' L' F E2 F"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [PL] (缓冲 UF, BR(R) -> FR(R))"
  },
  {
    "id": "chichu_e_pm",
    "code": "PM",
    "name": "彳亍棱块 [PM] (UF -> BR -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [PM]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "E L U L' E' L U' L'",
    "algs": [
      "E L U L' E' L U' L'",
      "D E L U L' E' L U' L' D'",
      "D' E L U L' E' L U' L' D",
      "D2 E L U L' E' L U' L' D2"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [PM] (缓冲 UF, BR(R) -> BL(B))"
  },
  {
    "id": "chichu_e_pn",
    "code": "PN",
    "name": "彳亍棱块 [PN] (UF -> BR -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [PN]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "B' M' B2 M B'",
    "algs": [
      "B' M' B2 M B'",
      "B R B2 M' B2 M R' B'",
      "B' R M' B2 M B2 R' B",
      "B L B2 M' B2 M L' B'"
    ],
    "moves": 5,
    "desc": "三阶彳亍棱块三循环 [PN] (缓冲 UF, BR(R) -> BL(L))"
  },
  {
    "id": "chichu_e_pq",
    "code": "PQ",
    "name": "彳亍棱块 [PQ] (UF -> BR -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [PQ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F E' F2 E F",
    "algs": [
      "F E' F2 E F",
      "B M' U2 M U2 M' U2 M U2 B'",
      "B R M' U2 M U2 M' U2 M U2 R' B'",
      "B L M' U2 M U2 M' U2 M U2 L' B'"
    ],
    "moves": 5,
    "desc": "三阶彳亍棱块三循环 [PQ] (缓冲 UF, BR(R) -> DF(D))"
  },
  {
    "id": "chichu_e_pr",
    "code": "PR",
    "name": "彳亍棱块 [PR] (UF -> BR -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [PR]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D R D' M D R' D' M'",
    "algs": [
      "D R D' M D R' D' M'",
      "Lw M' D R D' M D R' D' Lw'",
      "R' M' F R' F' R M R' F R F' R",
      "x2 U R U' M U R' U' M' x2"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [PR] (缓冲 UF, BR(R) -> DF(F))"
  },
  {
    "id": "chichu_e_ps",
    "code": "PS",
    "name": "彳亍棱块 [PS] (UF -> BR -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [PS]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L E L U L' E' L U' L2",
    "algs": [
      "L E L U L' E' L U' L2",
      "L D E L U L' E' L U' L' D' L'",
      "L D' E L U L' E' L U' L' D L'",
      "L U' E L U2 L' E' L U2 L' U L'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [PS] (缓冲 UF, BR(R) -> DL(D))"
  },
  {
    "id": "chichu_e_pt",
    "code": "PT",
    "name": "彳亍棱块 [PT] (UF -> BR -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [PT]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F R' S D2 S' D2 R F'",
    "algs": [
      "F R' S D2 S' D2 R F'",
      "R' U S R U R' S' R U' R' U' R",
      "R' U S R' U R S' R' U' R U' R",
      "R' U S L F' L' F S' F' L F L' U' R"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [PT] (缓冲 UF, BR(R) -> DL(L))"
  },
  {
    "id": "chichu_e_pu",
    "code": "PU",
    "name": "彳亍棱块 [PU] (UF -> BR -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [PU]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "M U R' U' M2 U R U' M",
    "algs": [
      "M U R' U' M2 U R U' M",
      "Lw U R' U' M2 U R U' M2 Lw'",
      "Lw' M2 U R' U' M2 U R U' Lw",
      "M' D R D' M2 D R' D' M'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [PU] (缓冲 UF, BR(R) -> DB(D))"
  },
  {
    "id": "chichu_e_pv",
    "code": "PV",
    "name": "彳亍棱块 [PV] (UF -> BR -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [PV]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D' R D' M D R' D' M' D2",
    "algs": [
      "D' R D' M D R' D' M' D2",
      "R' U F' L F L' M2 L F' L' F M2 U' R",
      "U L' B' L B L' E L B' L' B E' L U'",
      "D L' E2 R' F' R E2 R' F R L D'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [PV] (缓冲 UF, BR(R) -> DB(B))"
  },
  {
    "id": "chichu_e_pw",
    "code": "PW",
    "name": "彳亍棱块 [PW] (UF -> BR -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [PW]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "u S2 R U2 R' S2 R U2 R' u'",
    "algs": [
      "u S2 R U2 R' S2 R U2 R' u'",
      "Uw S2 R U2 R' S2 R U2 R' Uw'",
      "u U R' U' S2 U R U' S2 u'",
      "Uw U R' U' S2 U R U' S2 Uw'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [PW] (缓冲 UF, BR(R) -> DR(D))"
  },
  {
    "id": "chichu_e_px",
    "code": "PX",
    "name": "彳亍棱块 [PX] (UF -> BR -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [PX]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R D' M D R' D' M' D",
    "algs": [
      "R D' M D R' D' M' D",
      "L R D' M D R' D' M' D L'",
      "L' R D' M D R' D' M' D L",
      "D' L D R D' M D R' D' M' L' D"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [PX] (缓冲 UF, BR(R) -> DR(R))"
  },
  {
    "id": "chichu_e_qa",
    "code": "QA",
    "name": "彳亍棱块 [QA] (UF -> DF -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [QA]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "M' U2 M U2",
    "algs": [
      "M' U2 M U2",
      "R M' U2 M U2 R'",
      "R' M' U2 M U2 R",
      "R2 M' U2 M U2 R2"
    ],
    "moves": 4,
    "desc": "三阶彳亍棱块三循环 [QA] (缓冲 UF, DF(D) -> UB(U))"
  },
  {
    "id": "chichu_e_qb",
    "code": "QB",
    "name": "彳亍棱块 [QB] (UF -> DF -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [QB]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "B' R M' U2 M D' M' U2 M D R' B",
    "algs": [
      "B' R M' U2 M D' M' U2 M D R' B"
    ],
    "moves": 12,
    "desc": "三阶彳亍棱块三循环 [QB] (缓冲 UF, DF(D) -> UB(B))"
  },
  {
    "id": "chichu_e_qe",
    "code": "QE",
    "name": "彳亍棱块 [QE] (UF -> DF -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [QE]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' M D2 M' U M D2 M'",
    "algs": [
      "U' M D2 M' U M D2 M'",
      "Rw' M' U' M D2 M' U M D2 Rw",
      "M D2 M U M' D2 M U' M2",
      "Rw' D2 M U M' D2 M U' M' Rw"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [QE] (缓冲 UF, DF(D) -> UL(U))"
  },
  {
    "id": "chichu_e_qf",
    "code": "QF",
    "name": "彳亍棱块 [QF] (UF -> DF -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [QF]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "S' M' U2 M D M' U2 M D' S",
    "algs": [
      "S' M' U2 M D M' U2 M D' S"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [QF] (缓冲 UF, DF(D) -> UL(L))"
  },
  {
    "id": "chichu_e_qg",
    "code": "QG",
    "name": "彳亍棱块 [QG] (UF -> DF -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [QG]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U M D2 M' U' M D2 M'",
    "algs": [
      "U M D2 M' U' M D2 M'",
      "Lw M' U M D2 M' U' M D2 Lw'",
      "M D2 M U' M' D2 M U M2",
      "Lw D2 M U' M' D2 M U M' Lw'"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [QG] (缓冲 UF, DF(D) -> UR(U))"
  },
  {
    "id": "chichu_e_qh",
    "code": "QH",
    "name": "彳亍棱块 [QH] (UF -> DF -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [QH]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D R2 U' R E R' U R E' R D'",
    "algs": [
      "D R2 U' R E R' U R E' R D'",
      "D R2 U' R' E' R U R' E R' D'",
      "D R' E' F R' F' R E R' F R F' R D'",
      "F R L' U2 L E2 L' U2 L E2 R' F'"
    ],
    "moves": 11,
    "desc": "三阶彳亍棱块三循环 [QH] (缓冲 UF, DF(D) -> UR(R))"
  },
  {
    "id": "chichu_e_qi",
    "code": "QI",
    "name": "彳亍棱块 [QI] (UF -> DF -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [QI]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U L' U M2 U' L U M2 U2",
    "algs": [
      "U L' U M2 U' L U M2 U2",
      "L' D S2 R U R' S2 R U' R' D' L",
      "D L' S2 R U R' S2 R U' R' L D'",
      "L' D S2 R' U R S2 R' U' R D' L"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [QI] (缓冲 UF, DF(D) -> FL(F))"
  },
  {
    "id": "chichu_e_qj",
    "code": "QJ",
    "name": "彳亍棱块 [QJ] (UF -> DF -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [QJ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D R E' R' F' R E R' F D'",
    "algs": [
      "D R E' R' F' R E R' F D'",
      "D R E' F' L F L' E L F' L' F R' D'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [QJ] (缓冲 UF, DF(D) -> FL(L))"
  },
  {
    "id": "chichu_e_qk",
    "code": "QK",
    "name": "彳亍棱块 [QK] (UF -> DF -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [QK]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' R U' M2 U R' U' M2 U2",
    "algs": [
      "U' R U' M2 U R' U' M2 U2",
      "R D' S2 L' U' L S2 L' U L D R'",
      "D' R S2 L' U' L S2 L' U L R' D",
      "R D' S2 L U' L' S2 L U L' D R'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [QK] (缓冲 UF, DF(D) -> FR(F))"
  },
  {
    "id": "chichu_e_ql",
    "code": "QL",
    "name": "彳亍棱块 [QL] (UF -> DF -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [QL]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D' L2 U L E' L' U' L E L D",
    "algs": [
      "D' L2 U L E' L' U' L E L D"
    ],
    "moves": 11,
    "desc": "三阶彳亍棱块三循环 [QL] (缓冲 UF, DF(D) -> FR(R))"
  },
  {
    "id": "chichu_e_qm",
    "code": "QM",
    "name": "彳亍棱块 [QM] (UF -> DF -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [QM]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U L U M2 U' L' U M2 U2",
    "algs": [
      "U L U M2 U' L' U M2 U2",
      "U2 M2 D' L' D M2 D' L D U2",
      "L D S2 R U R' S2 R U' R' D' L'",
      "D L S2 R U R' S2 R U' R' L' D'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [QM] (缓冲 UF, DF(D) -> BL(B))"
  },
  {
    "id": "chichu_e_qn",
    "code": "QN",
    "name": "彳亍棱块 [QN] (UF -> DF -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [QN]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F E F2 E' F",
    "algs": [
      "F E F2 E' F",
      "F L2 E' L2 E F'",
      "F' E' L2 E L2 F",
      "D R2 U' R E' R' U R E R D'"
    ],
    "moves": 5,
    "desc": "三阶彳亍棱块三循环 [QN] (缓冲 UF, DF(D) -> BL(L))"
  },
  {
    "id": "chichu_e_qo",
    "code": "QO",
    "name": "彳亍棱块 [QO] (UF -> DF -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [QO]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' R' U' M2 U R U' M2 U2",
    "algs": [
      "U' R' U' M2 U R U' M2 U2",
      "U2 M2 D R D' M2 D R' D' U2",
      "R' D' S2 L' U' L S2 L' U L D R",
      "D' R' S2 L' U' L S2 L' U L R D"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [QO] (缓冲 UF, DF(D) -> BR(B))"
  },
  {
    "id": "chichu_e_qp",
    "code": "QP",
    "name": "彳亍棱块 [QP] (UF -> DF -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [QP]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F' E' F2 E F'",
    "algs": [
      "F' E' F2 E F'",
      "B U2 M' U2 M U2 M' U2 M B'",
      "B R U2 M' U2 M U2 M' U2 M R' B'",
      "B L U2 M' U2 M U2 M' U2 M L' B'"
    ],
    "moves": 5,
    "desc": "三阶彳亍棱块三循环 [QP] (缓冲 UF, DF(D) -> BR(R))"
  },
  {
    "id": "chichu_e_qs",
    "code": "QS",
    "name": "彳亍棱块 [QS] (UF -> DF -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [QS]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "M' U2 M D M' U2 M D'",
    "algs": [
      "M' U2 M D M' U2 M D'",
      "R M' U2 M D M' U2 M D' R'",
      "R' M' U2 M D M' U2 M D' R",
      "R2 M' U2 M D M' U2 M D' R2"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [QS] (缓冲 UF, DF(D) -> DL(D))"
  },
  {
    "id": "chichu_e_qt",
    "code": "QT",
    "name": "彳亍棱块 [QT] (UF -> DF -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [QT]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "S' M' U2 M D' M' U2 M D S",
    "algs": [
      "S' M' U2 M D' M' U2 M D S",
      "z L' S R S' L S R' S' z'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [QT] (缓冲 UF, DF(D) -> DL(L))"
  },
  {
    "id": "chichu_e_qu",
    "code": "QU",
    "name": "彳亍棱块 [QU] (UF -> DF -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [QU]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D2 M D2 M'",
    "algs": [
      "D2 M D2 M'",
      "Rw' M' D2 M D2 Rw",
      "Lw M' D2 M D2 Lw'",
      "x' M' D2 M D2 x"
    ],
    "moves": 4,
    "desc": "三阶彳亍棱块三循环 [QU] (缓冲 UF, DF(D) -> DB(D))"
  },
  {
    "id": "chichu_e_qv",
    "code": "QV",
    "name": "彳亍棱块 [QV] (UF -> DF -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [QV]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' R D R D' M' D R' D' M R' U",
    "algs": [
      "U' R D R D' M' D R' D' M R' U",
      "U L' D' L' D M' D' L D M L U'",
      "B R M' U2 M D' M' U2 M D R' B'"
    ],
    "moves": 12,
    "desc": "三阶彳亍棱块三循环 [QV] (缓冲 UF, DF(D) -> DB(B))"
  },
  {
    "id": "chichu_e_qw",
    "code": "QW",
    "name": "彳亍棱块 [QW] (UF -> DF -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [QW]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "M' U2 M D' M' U2 M D",
    "algs": [
      "M' U2 M D' M' U2 M D",
      "L M' U2 M D' M' U2 M D L'",
      "L' M' U2 M D' M' U2 M D L",
      "D' R D M' U2 M D' M' U2 M R' D"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [QW] (缓冲 UF, DF(D) -> DR(D))"
  },
  {
    "id": "chichu_e_qx",
    "code": "QX",
    "name": "彳亍棱块 [QX] (UF -> DF -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [QX]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "S M' U2 M D M' U2 M D' S'",
    "algs": [
      "S M' U2 M D M' U2 M D' S'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [QX] (缓冲 UF, DF(D) -> DR(R))"
  },
  {
    "id": "chichu_e_ra",
    "code": "RA",
    "name": "彳亍棱块 [RA] (UF -> DF -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [RA]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "B' M D R D' M' D R' D' B",
    "algs": [
      "B' M D R D' M' D R' D' B",
      "B' L M D R D' M' D R' D' L' B",
      "B M D' L' D M' D' L D B'",
      "B R M D' L' D M' D' L D R' B'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [RA] (缓冲 UF, DF(F) -> UB(U))"
  },
  {
    "id": "chichu_e_rb",
    "code": "RB",
    "name": "彳亍棱块 [RB] (UF -> DF -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [RB]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' S R' F' R S' R' F R U",
    "algs": [
      "U' S R' F' R S' R' F R U",
      "R U' S R' F' R S' R' F R U R'",
      "R' U' S R' F' R S' R' F R U R",
      "L U' S R' F' R S' R' F R U L'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [RB] (缓冲 UF, DF(F) -> UB(B))"
  },
  {
    "id": "chichu_e_re",
    "code": "RE",
    "name": "彳亍棱块 [RE] (UF -> DF -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [RE]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "y' L' U' L S' L' U L S y",
    "algs": [
      "y' L' U' L S' L' U L S y",
      "y' L U' L' S' L U L' S y",
      "y' R' F R F' S' F R' F' R S y",
      "F R D' L' D S' D' L D S R' F'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [RE] (缓冲 UF, DF(F) -> UL(U))"
  },
  {
    "id": "chichu_e_rf",
    "code": "RF",
    "name": "彳亍棱块 [RF] (UF -> DF -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [RF]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "Lw' U' L U M' U' L' U M Lw",
    "algs": [
      "Lw' U' L U M' U' L' U M Lw",
      "x U' L U M' U' L' U M x'",
      "F' L F L' M' L F' L' F M",
      "R F' L F L' M' L F' L' F M R'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [RF] (缓冲 UF, DF(F) -> UL(L))"
  },
  {
    "id": "chichu_e_rg",
    "code": "RG",
    "name": "彳亍棱块 [RG] (UF -> DF -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [RG]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D S' L' U' L S L' U L D'",
    "algs": [
      "D S' L' U' L S L' U L D'",
      "L D S' L' U' L S L' U L D' L'",
      "L' D S' L' U' L S L' U L D' L",
      "D L S' L' U' L S L' U D'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [RG] (缓冲 UF, DF(F) -> UR(U))"
  },
  {
    "id": "chichu_e_rh",
    "code": "RH",
    "name": "彳亍棱块 [RH] (UF -> DF -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [RH]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "Rw U R' U' M' U R U' M Rw'",
    "algs": [
      "Rw U R' U' M' U R U' M Rw'",
      "x U R' U' M' U R U' M x'",
      "F R' F' R M' R' F R F' M",
      "L F R' F' R M' R' F R F' M L'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [RH] (缓冲 UF, DF(F) -> UR(R))"
  },
  {
    "id": "chichu_e_ri",
    "code": "RI",
    "name": "彳亍棱块 [RI] (UF -> DF -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [RI]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "y2 U R' U' M U R U' M' y2",
    "algs": [
      "y2 U R' U' M U R U' M' y2",
      "E' M D' L' D M' D' L D E",
      "L D' B' L B L' M2 L B' L' B M2 D L'",
      "y' S U R' U' S' U R U' y"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [RI] (缓冲 UF, DF(F) -> FL(F))"
  },
  {
    "id": "chichu_e_rj",
    "code": "RJ",
    "name": "彳亍棱块 [RJ] (UF -> DF -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [RJ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "M' U' L' U M' U' L U M2",
    "algs": [
      "M' U' L' U M' U' L U M2",
      "Rw U' L' U M' U' L U M Rw'",
      "L' F' L F L' M' L F' L' F M L",
      "L F' L' F M' F' L F L' M"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [RJ] (缓冲 UF, DF(F) -> FL(L))"
  },
  {
    "id": "chichu_e_rk",
    "code": "RK",
    "name": "彳亍棱块 [RK] (UF -> DF -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [RK]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "y2 U' L U M U' L' U M' y2",
    "algs": [
      "y2 U' L U M U' L' U M' y2",
      "E M D R D' M' D R' D' E'",
      "R' D B R' B' R M2 R' B R B' M2 D' R",
      "y' S U R U' S' U R' U' y"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [RK] (缓冲 UF, DF(F) -> FR(F))"
  },
  {
    "id": "chichu_e_rl",
    "code": "RL",
    "name": "彳亍棱块 [RL] (UF -> DF -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [RL]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "M' U R U' M' U R' U' M2",
    "algs": [
      "M' U R U' M' U R' U' M2",
      "Lw' U R U' M' U R' U' M Lw",
      "R F R' F' R M' R' F R F' M R'",
      "B R F R' F' R M' R' F R F' M R' B'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [RL] (缓冲 UF, DF(F) -> FR(R))"
  },
  {
    "id": "chichu_e_rm",
    "code": "RM",
    "name": "彳亍棱块 [RM] (UF -> DF -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [RM]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "y2 U R U' M U R' U' M' y2",
    "algs": [
      "y2 U R U' M U R' U' M' y2",
      "E' M D R D' M' D R' D' E",
      "F2 D' L' D M D' L D M' F2",
      "L' D' B' L B L' M2 L B' L' B M2 D L"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [RM] (缓冲 UF, DF(F) -> BL(B))"
  },
  {
    "id": "chichu_e_rn",
    "code": "RN",
    "name": "彳亍棱块 [RN] (UF -> DF -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [RN]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "M D' L' D M' D' L D",
    "algs": [
      "M D' L' D M' D' L D",
      "Rw' D' L' D M' D' L D M Rw",
      "L F' L F L' M' L F' L' F M L'",
      "x2 M U' L' U M' U' L U x2"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [RN] (缓冲 UF, DF(F) -> BL(L))"
  },
  {
    "id": "chichu_e_ro",
    "code": "RO",
    "name": "彳亍棱块 [RO] (UF -> DF -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [RO]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "y2 U' L' U M U' L U M' y2",
    "algs": [
      "y2 U' L' U M U' L U M' y2",
      "F2 D R D' M D R' D' M' F2",
      "E M D' L' D M' D' L D E'",
      "R D B R' B' R M2 R' B R B' M2 D' R'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [RO] (缓冲 UF, DF(F) -> BR(B))"
  },
  {
    "id": "chichu_e_rp",
    "code": "RP",
    "name": "彳亍棱块 [RP] (UF -> DF -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [RP]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "M D R D' M' D R' D'",
    "algs": [
      "M D R D' M' D R' D'",
      "Lw D R D' M' D R' D' M Lw'",
      "R' F R' F' R M' R' F R F' M R",
      "x2 M U R U' M' U R' U' x2"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [RP] (缓冲 UF, DF(F) -> BR(R))"
  },
  {
    "id": "chichu_e_rs",
    "code": "RS",
    "name": "彳亍棱块 [RS] (UF -> DF -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [RS]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "y' R' F' R S' R' F R S y",
    "algs": [
      "y' R' F' R S' R' F R S y",
      "U' S2 R' F' R S2 R' F R U",
      "R U' S2 R' F' R S2 R' F R U R'",
      "R' U' S2 R' F' R S2 R' F R U R"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [RS] (缓冲 UF, DF(F) -> DL(D))"
  },
  {
    "id": "chichu_e_rt",
    "code": "RT",
    "name": "彳亍棱块 [RT] (UF -> DF -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [RT]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F' L' F M' F' L F L' M L",
    "algs": [
      "F' L' F M' F' L F L' M L",
      "Lw' U' L' U M' U' L U M Lw",
      "x U' L' U M' U' L U M x'",
      "Lw D' L' D M' D' L D M Lw'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [RT] (缓冲 UF, DF(F) -> DL(L))"
  },
  {
    "id": "chichu_e_ru",
    "code": "RU",
    "name": "彳亍棱块 [RU] (UF -> DF -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [RU]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "B M D R D' M' D R' D' B'",
    "algs": [
      "B M D R D' M' D R' D' B'",
      "B L M D R D' M' D R' D' L' B'",
      "B' M D' L' D M' D' L D B",
      "B' R M D' L' D M' D' L D R' B"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [RU] (缓冲 UF, DF(F) -> DB(D))"
  },
  {
    "id": "chichu_e_rv",
    "code": "RV",
    "name": "彳亍棱块 [RV] (UF -> DF -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [RV]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' M' U M D2 M' U' M D2 U",
    "algs": [
      "U' M' U M D2 M' U' M D2 U",
      "R U' M' U M D2 M' U' M D2 U R'",
      "R' U' M' U M D2 M' U' M D2 U R",
      "L U' M' U M D2 M' U' M D2 U L'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [RV] (缓冲 UF, DF(F) -> DB(B))"
  },
  {
    "id": "chichu_e_rw",
    "code": "RW",
    "name": "彳亍棱块 [RW] (UF -> DF -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [RW]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R F' E F R' F' R E' R' F",
    "algs": [
      "R F' E F R' F' R E' R' F",
      "z' L' U2 L E' L' U2 L E z",
      "z' R S' L' S R' S' L S z"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [RW] (缓冲 UF, DF(F) -> DR(D))"
  },
  {
    "id": "chichu_e_rx",
    "code": "RX",
    "name": "彳亍棱块 [RX] (UF -> DF -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [RX]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F R F' M' F R' F' R M R'",
    "algs": [
      "F R F' M' F R' F' R M R'",
      "B F R F' M' F R' F' R M R' B'",
      "B' F R F' M' F R' F' R M R' B",
      "D' L' M' L F' L' F M F' L F D"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [RX] (缓冲 UF, DF(F) -> DR(R))"
  },
  {
    "id": "chichu_e_sa",
    "code": "SA",
    "name": "彳亍棱块 [SA] (UF -> DL -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [SA]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U S U2 S' U",
    "algs": [
      "U S U2 S' U",
      "R U S U2 S' U R'",
      "R' U S U2 S' U R",
      "R2 U S U2 S' U R2"
    ],
    "moves": 5,
    "desc": "三阶彳亍棱块三循环 [SA] (缓冲 UF, DL(D) -> UB(U))"
  },
  {
    "id": "chichu_e_sb",
    "code": "SB",
    "name": "彳亍棱块 [SB] (UF -> DL -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [SB]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "z E' R U2 R' E R U2 R' z'",
    "algs": [
      "z E' R U2 R' E R U2 R' z'",
      "U' L2 U2 L' E' L U2 L' E L' U",
      "U' R' L2 S R S' L2 S R' S' R U",
      "U' R L2 S R' S' L2 S R S' R' U"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [SB] (缓冲 UF, DL(D) -> UB(B))"
  },
  {
    "id": "chichu_e_se",
    "code": "SE",
    "name": "彳亍棱块 [SE] (UF -> DL -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [SE]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "z' S U' L U S' U' L' U z",
    "algs": [
      "z' S U' L U S' U' L' U z",
      "z S D R D' S' D R' D' z'",
      "z S F R' F' R S' R' F R F' z'",
      "F' U' L U S' U' L' U S F"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [SE] (缓冲 UF, DL(D) -> UL(U))"
  },
  {
    "id": "chichu_e_sf",
    "code": "SF",
    "name": "彳亍棱块 [SF] (UF -> DL -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [SF]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F R S' L2 S L2 R' F'",
    "algs": [
      "F R S' L2 S L2 R' F'",
      "S L F' L' F S' F' L F L'",
      "z R U2 R' S' R U2 R' S z'",
      "L2 U L E L' U' L E' L"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [SF] (缓冲 UF, DL(D) -> UL(L))"
  },
  {
    "id": "chichu_e_sg",
    "code": "SG",
    "name": "彳亍棱块 [SG] (UF -> DL -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [SG]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R2 D' M D2 M' D' R2",
    "algs": [
      "R2 D' M D2 M' D' R2",
      "R2 U' S D2 S' D2 U R2",
      "R2 U S L2 S' L2 U' R2",
      "L2 S L' U' L S' L' U L'"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [SG] (缓冲 UF, DL(D) -> UR(U))"
  },
  {
    "id": "chichu_e_sh",
    "code": "SH",
    "name": "彳亍棱块 [SH] (UF -> DL -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [SH]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "M' U' M' D' M U M' D M2",
    "algs": [
      "M' U' M' D' M U M' D M2"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [SH] (缓冲 UF, DL(D) -> UR(R))"
  },
  {
    "id": "chichu_e_si",
    "code": "SI",
    "name": "彳亍棱块 [SI] (UF -> DL -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [SI]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' S2 U' L U S2 U' L' U2",
    "algs": [
      "U' S2 U' L U S2 U' L' U2",
      "R U' S2 U' L U S2 U' L' U2 R'",
      "R' U' S2 U' L U S2 U' L' U2 R",
      "R2 U' S2 U' L U S2 U' L' U2 R2"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [SI] (缓冲 UF, DL(D) -> FL(F))"
  },
  {
    "id": "chichu_e_sj",
    "code": "SJ",
    "name": "彳亍棱块 [SJ] (UF -> DL -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [SJ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' L' S L' U2 L S' L' U2 L2 U",
    "algs": [
      "U' L' S L' U2 L S' L' U2 L2 U",
      "F R L' U' L S2 L' U L S2 R' F'",
      "F R L U' L' S2 L U L' S2 R' F'",
      "F2 R F' S2 F R' F' R S2 R' F'"
    ],
    "moves": 11,
    "desc": "三阶彳亍棱块三循环 [SJ] (缓冲 UF, DL(D) -> FL(L))"
  },
  {
    "id": "chichu_e_sk",
    "code": "SK",
    "name": "彳亍棱块 [SK] (UF -> DL -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [SK]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R' D' M D2 M' D' R",
    "algs": [
      "R' D' M D2 M' D' R",
      "d' L F' L' F M2 F' L F L' M2 d",
      "Dw' L F' L' F M2 F' L F L' M2 Dw",
      "U R S U2 S' U2 R' U'"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [SK] (缓冲 UF, DL(D) -> FR(F))"
  },
  {
    "id": "chichu_e_sl",
    "code": "SL",
    "name": "彳亍棱块 [SL] (UF -> DL -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [SL]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R S2 R' F R S2 R' F'",
    "algs": [
      "R S2 R' F R S2 R' F'",
      "Lw' E R U R' E' R U' R' Lw",
      "L' E F R' F' R E' R' F R F' L",
      "L' D E F R' F' R E' R' F R F' D' L"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [SL] (缓冲 UF, DL(D) -> FR(R))"
  },
  {
    "id": "chichu_e_sm",
    "code": "SM",
    "name": "彳亍棱块 [SM] (UF -> DL -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [SM]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' S2 U' L' U S2 U' L U2",
    "algs": [
      "U' S2 U' L' U S2 U' L U2",
      "R U' S2 U' L' U S2 U' L U2 R'",
      "R' U' S2 U' L' U S2 U' L U2 R",
      "R2 U' S2 U' L' U S2 U' L U2 R2"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [SM] (缓冲 UF, DL(D) -> BL(B))"
  },
  {
    "id": "chichu_e_sn",
    "code": "SN",
    "name": "彳亍棱块 [SN] (UF -> DL -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [SN]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "u' S2 U' L U S2 U' L' U u",
    "algs": [
      "u' S2 U' L U S2 U' L' U u",
      "Uw' S2 U' L U S2 U' L' U Uw",
      "F R S2 B' L B L' S2 L B' L' B R' F'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [SN] (缓冲 UF, DL(D) -> BL(L))"
  },
  {
    "id": "chichu_e_so",
    "code": "SO",
    "name": "彳亍棱块 [SO] (UF -> DL -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [SO]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R D' M D2 M' D' R'",
    "algs": [
      "R D' M D2 M' D' R'",
      "d' R' F R F' M2 F R' F' R M2 d",
      "Dw' R' F R F' M2 F R' F' R M2 Dw",
      "U R' S U2 S' U2 R U'"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [SO] (缓冲 UF, DL(D) -> BR(B))"
  },
  {
    "id": "chichu_e_sp",
    "code": "SP",
    "name": "彳亍棱块 [SP] (UF -> DL -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [SP]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F R S D2 S' D2 R' F'",
    "algs": [
      "F R S D2 S' D2 R' F'",
      "R' S2 R' F R F' S2 F R' F' R2",
      "F' R' S2 L' U2 L S2 L' U2 L R F",
      "u' S2 U' L' U S2 U' L U u"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [SP] (缓冲 UF, DL(D) -> BR(R))"
  },
  {
    "id": "chichu_e_sq",
    "code": "SQ",
    "name": "彳亍棱块 [SQ] (UF -> DL -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [SQ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D M' U2 M D' M' U2 M",
    "algs": [
      "D M' U2 M D' M' U2 M",
      "R D M' U2 M D' M' U2 M R'",
      "R' D M' U2 M D' M' U2 M R",
      "R2 D M' U2 M D' M' U2 M R2"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [SQ] (缓冲 UF, DL(D) -> DF(D))"
  },
  {
    "id": "chichu_e_sr",
    "code": "SR",
    "name": "彳亍棱块 [SR] (UF -> DL -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [SR]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "z E R U2 R' E' R U2 R' z'",
    "algs": [
      "z E R U2 R' E' R U2 R' z'",
      "F L' E' L F' L' F E F' L",
      "F L2 S R S' L S R' S' L F'",
      "z S R S' L' S R' S' L z'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [SR] (缓冲 UF, DL(D) -> DF(F))"
  },
  {
    "id": "chichu_e_su",
    "code": "SU",
    "name": "彳亍棱块 [SU] (UF -> DL -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [SU]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D M' U2 M D M' U2 M D2",
    "algs": [
      "D M' U2 M D M' U2 M D2",
      "R D M' U2 M D M' U2 M D2 R'",
      "R' D M' U2 M D M' U2 M D2 R",
      "D R M' U2 M D M' U2 M D' R' D'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [SU] (缓冲 UF, DL(D) -> DB(D))"
  },
  {
    "id": "chichu_e_sv",
    "code": "SV",
    "name": "彳亍棱块 [SV] (UF -> DL -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [SV]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "z S R S' L S R' S' L' z'",
    "algs": [
      "z S R S' L S R' S' L' z'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [SV] (缓冲 UF, DL(D) -> DB(B))"
  },
  {
    "id": "chichu_e_sw",
    "code": "SW",
    "name": "彳亍棱块 [SW] (UF -> DL -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [SW]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D' M D2 M' D'",
    "algs": [
      "D' M D2 M' D'",
      "D R D2 M D2 M' R' D'",
      "D R' D2 M D2 M' R D'",
      "D L D2 M D2 M' L' D'"
    ],
    "moves": 5,
    "desc": "三阶彳亍棱块三循环 [SW] (缓冲 UF, DL(D) -> DR(D))"
  },
  {
    "id": "chichu_e_sx",
    "code": "SX",
    "name": "彳亍棱块 [SX] (UF -> DL -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [SX]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "S2 L' U' L S L' U L S",
    "algs": [
      "S2 L' U' L S L' U L S",
      "L2 U' S' L' U' L S L' U L U L2",
      "S2 L U' L' S L U L' S",
      "L2 U' S' L U' L' S L U L' U L2"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [SX] (缓冲 UF, DL(D) -> DR(R))"
  },
  {
    "id": "chichu_e_ta",
    "code": "TA",
    "name": "彳亍棱块 [TA] (UF -> DL -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [TA]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U2 M D M' U2 M D' M'",
    "algs": [
      "U2 M D M' U2 M D' M'",
      "Rw' M' U2 M D M' U2 M D' Rw",
      "M' D' M U2 M' D M U2",
      "Rw D' M U2 M' D M U2 M' Rw'"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [TA] (缓冲 UF, DL(L) -> UB(U))"
  },
  {
    "id": "chichu_e_tb",
    "code": "TB",
    "name": "彳亍棱块 [TB] (UF -> DL -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [TB]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' R' S R U2 R' S' R U'",
    "algs": [
      "U' R' S R U2 R' S' R U'",
      "U' R S R' U2 R S' R' U'",
      "L2 U' R U R' S' R U' R' S U L2",
      "L2 U' R' U R S' R' U' R S U L2"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [TB] (缓冲 UF, DL(L) -> UB(B))"
  },
  {
    "id": "chichu_e_te",
    "code": "TE",
    "name": "彳亍棱块 [TE] (UF -> DL -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [TE]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L E L' U L E' L' U'",
    "algs": [
      "L E L' U L E' L' U'",
      "Lw' L' U' L E L' U L E' Lw",
      "x L' U' L E L' U L E' x'",
      "L D E L' U L E' L' U' L D' L'"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [TE] (缓冲 UF, DL(L) -> UL(U))"
  },
  {
    "id": "chichu_e_tf",
    "code": "TF",
    "name": "彳亍棱块 [TF] (UF -> DL -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [TF]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F L E' L2 E L F'",
    "algs": [
      "F L E' L2 E L F'",
      "U L E' L U' L' E L U L2 U'"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [TF] (缓冲 UF, DL(L) -> UL(L))"
  },
  {
    "id": "chichu_e_tg",
    "code": "TG",
    "name": "彳亍棱块 [TG] (UF -> DL -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [TG]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U M D M' U' M D' M'",
    "algs": [
      "U M D M' U' M D' M'",
      "x2 D M U M' D' M U' M' x2"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [TG] (缓冲 UF, DL(L) -> UR(U))"
  },
  {
    "id": "chichu_e_th",
    "code": "TH",
    "name": "彳亍棱块 [TH] (UF -> DL -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [TH]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U2 R' S R U' R' S' R U'",
    "algs": [
      "U2 R' S R U' R' S' R U'",
      "u R U R' S R U' R' S' u'",
      "Uw R U R' S R U' R' S' Uw'",
      "U2 S R U' R' S' R U R' U2"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [TH] (缓冲 UF, DL(L) -> UR(R))"
  },
  {
    "id": "chichu_e_ti",
    "code": "TI",
    "name": "彳亍棱块 [TI] (UF -> DL -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [TI]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "u S' U' L' U S U' L U u'",
    "algs": [
      "u S' U' L' U S U' L U u'",
      "Uw S' U' L' U S U' L U Uw'",
      "u S' B' L B L' S L B' L' B u'",
      "Uw S' B' L B L' S L B' L' B Uw'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [TI] (缓冲 UF, DL(L) -> FL(F))"
  },
  {
    "id": "chichu_e_tj",
    "code": "TJ",
    "name": "彳亍棱块 [TJ] (UF -> DL -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [TJ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D M D' L D M' D' L'",
    "algs": [
      "D M D' L D M' D' L'",
      "U D' L' D S D' L D S' U'",
      "R U D' L' D S D' L D S' U' R'",
      "R' U D' L' D S D' L D S' U' R"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [TJ] (缓冲 UF, DL(L) -> FL(L))"
  },
  {
    "id": "chichu_e_tk",
    "code": "TK",
    "name": "彳亍棱块 [TK] (UF -> DL -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [TK]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "d M D R D' M' D R' D' d'",
    "algs": [
      "d M D R D' M' D R' D' d'",
      "Dw M D R D' M' D R' D' Dw'",
      "U' R' S' U R' U' S U R U' R U",
      "u S' U' L U S U' L' U u'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [TK] (缓冲 UF, DL(L) -> FR(F))"
  },
  {
    "id": "chichu_e_tl",
    "code": "TL",
    "name": "彳亍棱块 [TL] (UF -> DL -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [TL]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U R U2 R' S R U2 R' S' U'",
    "algs": [
      "U R U2 R' S R U2 R' S' U'",
      "R2 U R' U2 R S R' U2 R S' U' R2",
      "u D' L' D S D' L D S' u'",
      "Uw D' L' D S D' L D S' Uw'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [TL] (缓冲 UF, DL(L) -> FR(R))"
  },
  {
    "id": "chichu_e_tm",
    "code": "TM",
    "name": "彳亍棱块 [TM] (UF -> DL -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [TM]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "d L F' L' F M' F' L F L' M d'",
    "algs": [
      "d L F' L' F M' F' L F L' M d'",
      "Dw L F' L' F M' F' L F L' M Dw'",
      "B' L U' L U M' U' L' U M L' B",
      "L' D' M2 L F' L' F M2 F' L F L' D L"
    ],
    "moves": 12,
    "desc": "三阶彳亍棱块三循环 [TM] (缓冲 UF, DL(L) -> BL(B))"
  },
  {
    "id": "chichu_e_tn",
    "code": "TN",
    "name": "彳亍棱块 [TN] (UF -> DL -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [TN]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D M D' L' D M' D' L",
    "algs": [
      "D M D' L' D M' D' L",
      "R D M D' L' D M' D' L R'",
      "R' D M D' L' D M' D' L R",
      "D R M D' L' D M' D' L D R' D'"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [TN] (缓冲 UF, DL(L) -> BL(L))"
  },
  {
    "id": "chichu_e_to",
    "code": "TO",
    "name": "彳亍棱块 [TO] (UF -> DL -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [TO]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "d M D' L' D M' D' L D d'",
    "algs": [
      "d M D' L' D M' D' L D d'",
      "Dw M D' L' D M' D' L D Dw'",
      "U' R S' U R U' S U R' U' R' U",
      "U' R S' B R' B' R S R' B R B' R' U"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [TO] (缓冲 UF, DL(L) -> BR(B))"
  },
  {
    "id": "chichu_e_tp",
    "code": "TP",
    "name": "彳亍棱块 [TP] (UF -> DL -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [TP]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F R' S' R2 S R' F'",
    "algs": [
      "F R' S' R2 S R' F'",
      "F L' E R2 E' R2 L F'",
      "F L' F2 E' F2 E L F'",
      "Lw' E2 R' U R E2 R' U' R Lw"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [TP] (缓冲 UF, DL(L) -> BR(R))"
  },
  {
    "id": "chichu_e_tq",
    "code": "TQ",
    "name": "彳亍棱块 [TQ] (UF -> DL -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [TQ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "S' D' M' U2 M D M' U2 M S",
    "algs": [
      "S' D' M' U2 M D M' U2 M S"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [TQ] (缓冲 UF, DL(L) -> DF(D))"
  },
  {
    "id": "chichu_e_tr",
    "code": "TR",
    "name": "彳亍棱块 [TR] (UF -> DL -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [TR]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L' M' L F' L' F M F' L F",
    "algs": [
      "L' M' L F' L' F M F' L F",
      "Lw' M' U' L' U M U' L U Lw",
      "x M' U' L' U M U' L U x'",
      "Lw M' D' L' D M D' L D Lw'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [TR] (缓冲 UF, DL(L) -> DF(F))"
  },
  {
    "id": "chichu_e_tu",
    "code": "TU",
    "name": "彳亍棱块 [TU] (UF -> DL -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [TU]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L' M2 L F' L' F M2 F' L F",
    "algs": [
      "L' M2 L F' L' F M2 F' L F",
      "Lw' M2 U' L' U M2 U' L U Lw",
      "x M2 U' L' U M2 U' L U x'",
      "Lw U' L U M2 U' L' U M2 Lw'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [TU] (缓冲 UF, DL(L) -> DB(D))"
  },
  {
    "id": "chichu_e_tv",
    "code": "TV",
    "name": "彳亍棱块 [TV] (UF -> DL -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [TV]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "y' M' U M D M' U' M D' y",
    "algs": [
      "y' M' U M D M' U' M D' y",
      "y M U M' D M U' M' D' y'",
      "U D' M U M' D M U' M' U'",
      "R U D' M U M' D M U' M' U' R'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [TV] (缓冲 UF, DL(L) -> DB(B))"
  },
  {
    "id": "chichu_e_tw",
    "code": "TW",
    "name": "彳亍棱块 [TW] (UF -> DL -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [TW]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "z' S' L' U2 L S L' U2 L z",
    "algs": [
      "z' S' L' U2 L S L' U2 L z",
      "x L' U' L E' L' U L E x'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [TW] (缓冲 UF, DL(L) -> DR(D))"
  },
  {
    "id": "chichu_e_tx",
    "code": "TX",
    "name": "彳亍棱块 [TX] (UF -> DL -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [TX]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "y' M' U M D2 M' U' M D2 y",
    "algs": [
      "y' M' U M D2 M' U' M D2 y",
      "y D2 M' U' M D2 M' U M y'",
      "y M U M' D2 M U' M' D2 y'",
      "y' D2 M U' M' D2 M U M' y"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [TX] (缓冲 UF, DL(L) -> DR(R))"
  },
  {
    "id": "chichu_e_ua",
    "code": "UA",
    "name": "彳亍棱块 [UA] (UF -> DB -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [UA]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U2 M U2 M'",
    "algs": [
      "U2 M U2 M'",
      "Rw' M' U2 M U2 Rw",
      "Lw M' U2 M U2 Lw'",
      "x' M' U2 M U2 x"
    ],
    "moves": 4,
    "desc": "三阶彳亍棱块三循环 [UA] (缓冲 UF, DB(D) -> UB(U))"
  },
  {
    "id": "chichu_e_ub",
    "code": "UB",
    "name": "彳亍棱块 [UB] (UF -> DB -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [UB]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F M U R U' M' U R' U' F'",
    "algs": [
      "F M U R U' M' U R' U' F'",
      "F L' M U R U' M' U R' U' L F'",
      "F' M U' L' U M' U' L U F",
      "F' R M U' L' U M' U' L U R' F"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [UB] (缓冲 UF, DB(D) -> UB(B))"
  },
  {
    "id": "chichu_e_ue",
    "code": "UE",
    "name": "彳亍棱块 [UE] (UF -> DB -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [UE]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D' S2 R U R' S2 R U' R' D",
    "algs": [
      "D' S2 R U R' S2 R U' R' D",
      "R D' S2 R U R' S2 R U' R' D R'",
      "R' D' S2 R U R' S2 R U' R' D R",
      "R2 D' S2 R U R' S2 R U' R' D R2"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [UE] (缓冲 UF, DB(D) -> UL(U))"
  },
  {
    "id": "chichu_e_uf",
    "code": "UF",
    "name": "彳亍棱块 [UF] (UF -> DB -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [UF]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "Lw M2 U' L' U M2 U' L U Lw'",
    "algs": [
      "Lw M2 U' L' U M2 U' L U Lw'",
      "x' M2 U' L' U M2 U' L U x",
      "Lw' U' L U M2 U' L' U M2 Lw",
      "x U' L U M2 U' L' U M2 x'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [UF] (缓冲 UF, DB(D) -> UL(L))"
  },
  {
    "id": "chichu_e_ug",
    "code": "UG",
    "name": "彳亍棱块 [UG] (UF -> DB -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [UG]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "y R U R' S2 R U' R' S2 y'",
    "algs": [
      "y R U R' S2 R U' R' S2 y'",
      "y R' U R S2 R' U' R S2 y'",
      "D S2 L' U' L S2 L' U L D'",
      "L D S2 L' U' L S2 L' U L D' L'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [UG] (缓冲 UF, DB(D) -> UR(U))"
  },
  {
    "id": "chichu_e_uh",
    "code": "UH",
    "name": "彳亍棱块 [UH] (UF -> DB -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [UH]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "Rw' M2 U R U' M2 U R' U' Rw",
    "algs": [
      "Rw' M2 U R U' M2 U R' U' Rw",
      "x' M2 U R U' M2 U R' U' x",
      "Rw U R' U' M2 U R U' M2 Rw'",
      "x U R' U' M2 U R U' M2 x'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [UH] (缓冲 UF, DB(D) -> UR(R))"
  },
  {
    "id": "chichu_e_ui",
    "code": "UI",
    "name": "彳亍棱块 [UI] (UF -> DB -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [UI]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "y2 U R' U' M2 U R U' M2 y2",
    "algs": [
      "y2 U R' U' M2 U R U' M2 y2",
      "y2 M2 D R D' M2 D R' D' y2",
      "L' D' S2 R U R' S2 R U' R' D L",
      "D' L' S2 R U R' S2 R U' R' L D"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [UI] (缓冲 UF, DB(D) -> FL(F))"
  },
  {
    "id": "chichu_e_uj",
    "code": "UJ",
    "name": "彳亍棱块 [UJ] (UF -> DB -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [UJ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "M' U' L' U M2 U' L U M'",
    "algs": [
      "M' U' L' U M2 U' L U M'",
      "Rw U' L' U M2 U' L U M2 Rw'",
      "Rw' M2 U' L' U M2 U' L U Rw",
      "F R M2 F R' F' R M2 R' F R F' R' F'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [UJ] (缓冲 UF, DB(D) -> FL(L))"
  },
  {
    "id": "chichu_e_uk",
    "code": "UK",
    "name": "彳亍棱块 [UK] (UF -> DB -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [UK]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "y2 U' L U M2 U' L' U M2 y2",
    "algs": [
      "y2 U' L U M2 U' L' U M2 y2",
      "y2 M2 D' L' D M2 D' L D y2",
      "R D S2 L' U' L S2 L' U L D' R'",
      "D R S2 L' U' L S2 L' U L R' D'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [UK] (缓冲 UF, DB(D) -> FR(F))"
  },
  {
    "id": "chichu_e_ul",
    "code": "UL",
    "name": "彳亍棱块 [UL] (UF -> DB -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [UL]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "M' U R U' M2 U R' U' M'",
    "algs": [
      "M' U R U' M2 U R' U' M'",
      "Lw M2 U R U' M2 U R' U' Lw'",
      "Lw' U R U' M2 U R' U' M2 Lw",
      "R F R' F' R M2 R' F R F' M2 R'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [UL] (缓冲 UF, DB(D) -> FR(R))"
  },
  {
    "id": "chichu_e_um",
    "code": "UM",
    "name": "彳亍棱块 [UM] (UF -> DB -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [UM]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "B' U' L U M' U' L' U M B",
    "algs": [
      "B' U' L U M' U' L' U M B",
      "B' R U' L U M' U' L' U M R' B",
      "B' L M F' L F L' M' L F' L' F L' B",
      "E L F' L' F M2 F' L F L' M2 E'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [UM] (缓冲 UF, DB(D) -> BL(B))"
  },
  {
    "id": "chichu_e_un",
    "code": "UN",
    "name": "彳亍棱块 [UN] (UF -> DB -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [UN]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "M' U' L U M2 U' L' U M'",
    "algs": [
      "M' U' L U M2 U' L' U M'",
      "Rw U' L U M2 U' L' U M2 Rw'",
      "Rw' M2 U' L U M2 U' L' U Rw",
      "M D' L' D M2 D' L D M"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [UN] (缓冲 UF, DB(D) -> BL(L))"
  },
  {
    "id": "chichu_e_uo",
    "code": "UO",
    "name": "彳亍棱块 [UO] (UF -> DB -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [UO]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "B U R' U' M' U R U' M B'",
    "algs": [
      "B U R' U' M' U R U' M B'",
      "B L U R' U' M' U R U' M L' B'",
      "E' R' F R F' M2 F R' F' R M2 E",
      "y2 U' L' U M2 U' L U M2 y2"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [UO] (缓冲 UF, DB(D) -> BR(B))"
  },
  {
    "id": "chichu_e_up",
    "code": "UP",
    "name": "彳亍棱块 [UP] (UF -> DB -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [UP]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "M' U R' U' M2 U R U' M'",
    "algs": [
      "M' U R' U' M2 U R U' M'",
      "Lw M2 U R' U' M2 U R U' Lw'",
      "Lw' U R' U' M2 U R U' M2 Lw",
      "M D R D' M2 D R' D' M"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [UP] (缓冲 UF, DB(D) -> BR(R))"
  },
  {
    "id": "chichu_e_uq",
    "code": "UQ",
    "name": "彳亍棱块 [UQ] (UF -> DB -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [UQ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "M D2 M' D2",
    "algs": [
      "M D2 M' D2",
      "Rw' D2 M' D2 M Rw",
      "Lw D2 M' D2 M Lw'",
      "x' D2 M' D2 M x"
    ],
    "moves": 4,
    "desc": "三阶彳亍棱块三循环 [UQ] (缓冲 UF, DB(D) -> DF(D))"
  },
  {
    "id": "chichu_e_ur",
    "code": "UR",
    "name": "彳亍棱块 [UR] (UF -> DB -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [UR]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "B D R D' M D R' D' M' B'",
    "algs": [
      "B D R D' M D R' D' M' B'",
      "B L D R D' M D R' D' M' L' B'",
      "B' D' L' D M D' L D M' B",
      "B' R D' L' D M D' L D M' R' B"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [UR] (缓冲 UF, DB(D) -> DF(F))"
  },
  {
    "id": "chichu_e_us",
    "code": "US",
    "name": "彳亍棱块 [US] (UF -> DB -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [US]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D2 M' U2 M D' M' U2 M D'",
    "algs": [
      "D2 M' U2 M D' M' U2 M D'",
      "R D2 M' U2 M D' M' U2 M D' R'",
      "R' D2 M' U2 M D' M' U2 M D' R",
      "D R D M' U2 M D' M' U2 M R' D'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [US] (缓冲 UF, DB(D) -> DL(D))"
  },
  {
    "id": "chichu_e_ut",
    "code": "UT",
    "name": "彳亍棱块 [UT] (UF -> DB -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [UT]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F' L' F M2 F' L F L' M2 L",
    "algs": [
      "F' L' F M2 F' L F L' M2 L",
      "Lw' U' L' U M2 U' L U M2 Lw",
      "x U' L' U M2 U' L U M2 x'",
      "Lw M2 U' L U M2 U' L' U Lw'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [UT] (缓冲 UF, DB(D) -> DL(L))"
  },
  {
    "id": "chichu_e_uw",
    "code": "UW",
    "name": "彳亍棱块 [UW] (UF -> DB -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [UW]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D2 M' U2 M D M' U2 M D",
    "algs": [
      "D2 M' U2 M D M' U2 M D",
      "U2 M U2 M' D M U2 M' D' U2",
      "L D2 M' U2 M D M' U2 M D L'",
      "L' D2 M' U2 M D M' U2 M D L"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [UW] (缓冲 UF, DB(D) -> DR(D))"
  },
  {
    "id": "chichu_e_ux",
    "code": "UX",
    "name": "彳亍棱块 [UX] (UF -> DB -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [UX]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F R F' M2 F R' F' R M2 R'",
    "algs": [
      "F R F' M2 F R' F' R M2 R'",
      "Rw U R U' M2 U R' U' M2 Rw'",
      "x U R U' M2 U R' U' M2 x'",
      "Rw' M2 U R' U' M2 U R U' Rw"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [UX] (缓冲 UF, DB(D) -> DR(R))"
  },
  {
    "id": "chichu_e_va",
    "code": "VA",
    "name": "彳亍棱块 [VA] (UF -> DB -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [VA]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "B' L U L' E L U' L' E' B",
    "algs": [
      "B' L U L' E L U' L' E' B",
      "B R' U' R E' R' U R E B'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [VA] (缓冲 UF, DB(B) -> UB(U))"
  },
  {
    "id": "chichu_e_vb",
    "code": "VB",
    "name": "彳亍棱块 [VB] (UF -> DB -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [VB]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D' R U R U' M' U R' U' M R' D",
    "algs": [
      "D' R U R U' M' U R' U' M R' D",
      "D L' U' L' U M' U' L U M L D'",
      "D' R' U R' U' M' U R U' M R D",
      "D L U' L U M' U' L' U M L' D'"
    ],
    "moves": 12,
    "desc": "三阶彳亍棱块三循环 [VB] (缓冲 UF, DB(B) -> UB(B))"
  },
  {
    "id": "chichu_e_ve",
    "code": "VE",
    "name": "彳亍棱块 [VE] (UF -> DB -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [VE]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "B R S2 R' U R S2 R' U' B'",
    "algs": [
      "B R S2 R' U R S2 R' U' B'",
      "D L E L' U L E' L' U' D'",
      "D L' R' F' R E R' F R E' L D'",
      "D L' F' L F L' E L F' L' F E' L D'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [VE] (缓冲 UF, DB(B) -> UL(U))"
  },
  {
    "id": "chichu_e_vf",
    "code": "VF",
    "name": "彳亍棱块 [VF] (UF -> DB -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [VF]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D S R U R' S' R U' R' D'",
    "algs": [
      "D S R U R' S' R U' R' D'",
      "R D S R U R' S' R U' R' D' R'",
      "R' D S R U R' S' R U' R' D' R",
      "D R S R U R' S' R U' R2 D'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [VF] (缓冲 UF, DB(B) -> UL(L))"
  },
  {
    "id": "chichu_e_vg",
    "code": "VG",
    "name": "彳亍棱块 [VG] (UF -> DB -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [VG]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "B' L S L' U' L S' L' U B",
    "algs": [
      "B' L S L' U' L S' L' U B",
      "B' L S L U' L' S' L U L2 B",
      "D' S' L' U' L S L' U L D",
      "L D' S' L' U' L S L' U L D L'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [VG] (缓冲 UF, DB(B) -> UR(U))"
  },
  {
    "id": "chichu_e_vh",
    "code": "VH",
    "name": "彳亍棱块 [VH] (UF -> DB -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [VH]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D2 F R' F' R M' R' F R F' M D2",
    "algs": [
      "D2 F R' F' R M' R' F R F' M D2",
      "B2 F R' F' R M R' F R F' M' B2",
      "U L M2 L F' L' F M2 F' L F L2 U'",
      "U M2 F' L F L' M2 L F' L' F U'"
    ],
    "moves": 12,
    "desc": "三阶彳亍棱块三循环 [VH] (缓冲 UF, DB(B) -> UR(R))"
  },
  {
    "id": "chichu_e_vi",
    "code": "VI",
    "name": "彳亍棱块 [VI] (UF -> DB -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [VI]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U L' U M U' L U M' U2",
    "algs": [
      "U L' U M U' L U M' U2",
      "L D' B R' B' R M2 R' B R B' M2 D L'",
      "B' L2 F' L' F S F' L F L' S' L' B",
      "D' R F R' F' R E R' F R F' E' R' D"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [VI] (缓冲 UF, DB(B) -> FL(F))"
  },
  {
    "id": "chichu_e_vj",
    "code": "VJ",
    "name": "彳亍棱块 [VJ] (UF -> DB -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [VJ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "B2 M' U' L' U M U' L U B2",
    "algs": [
      "B2 M' U' L' U M U' L U B2",
      "B2 L F' L' F M F' L F L' M' B2",
      "L' U' M2 F R' F' R M2 R' F R F' U L",
      "L' D S R U R' S' R U' R' D' L"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [VJ] (缓冲 UF, DB(B) -> FL(L))"
  },
  {
    "id": "chichu_e_vk",
    "code": "VK",
    "name": "彳亍棱块 [VK] (UF -> DB -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [VK]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' R U' M U R' U' M' U2",
    "algs": [
      "U' R U' M U R' U' M' U2",
      "R' D B' L B L' M2 L B' L' B M2 D' R",
      "R D' S' L' U' L S L' U L D R'",
      "R D' S' L U' L' S L U L' D R'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [VK] (缓冲 UF, DB(B) -> FR(F))"
  },
  {
    "id": "chichu_e_vl",
    "code": "VL",
    "name": "彳亍棱块 [VL] (UF -> DB -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [VL]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "B2 M' U R U' M U R' U' B2",
    "algs": [
      "B2 M' U R U' M U R' U' B2",
      "B2 R' F R F' M F R' F' R M' B2",
      "R U M2 F' L F L' M2 L F' L' F U' R'",
      "B R' U' R E R' U R E' B'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [VL] (缓冲 UF, DB(B) -> FR(R))"
  },
  {
    "id": "chichu_e_vm",
    "code": "VM",
    "name": "彳亍棱块 [VM] (UF -> DB -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [VM]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U L U M U' L' U M' U2",
    "algs": [
      "U L U M U' L' U M' U2",
      "L' D' B R' B' R M2 R' B R B' M2 D L",
      "D' R' E L U L' E' L U' L' R D",
      "F' B' L B L' E' L B' L' B E F"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [VM] (缓冲 UF, DB(B) -> BL(B))"
  },
  {
    "id": "chichu_e_vn",
    "code": "VN",
    "name": "彳亍棱块 [VN] (UF -> DB -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [VN]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D2 M D' L' D M' D' L D'",
    "algs": [
      "D2 M D' L' D M' D' L D'",
      "L U' M2 F R' F' R M2 R' F R F' U L'",
      "L D S R U R' S' R U' R' D' L'",
      "L D S R' U R S' R' U' R D' L'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [VN] (缓冲 UF, DB(B) -> BL(L))"
  },
  {
    "id": "chichu_e_vo",
    "code": "VO",
    "name": "彳亍棱块 [VO] (UF -> DB -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [VO]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' R' U' M U R U' M' U2",
    "algs": [
      "U' R' U' M U R U' M' U2",
      "R D B' L B L' M2 L B' L' B M2 D' R'",
      "R' D' S' L' U' L S L' U L D R",
      "R' D' S' L U' L' S L U L' D R"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [VO] (缓冲 UF, DB(B) -> BR(B))"
  },
  {
    "id": "chichu_e_vp",
    "code": "VP",
    "name": "彳亍棱块 [VP] (UF -> DB -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [VP]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D2 M D R D' M' D R' D",
    "algs": [
      "D2 M D R D' M' D R' D",
      "R' U M2 F' L F L' M2 L F' L' F U' R",
      "U L' E B' L B L' E' L B' L' B L U'",
      "D L' R' F' R E2 R' F R E2 L D'"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [VP] (缓冲 UF, DB(B) -> BR(R))"
  },
  {
    "id": "chichu_e_vq",
    "code": "VQ",
    "name": "彳亍棱块 [VQ] (UF -> DB -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [VQ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' R M' D R D' M D R' D' R' U",
    "algs": [
      "U' R M' D R D' M D R' D' R' U",
      "U L' M' D' L' D M D' L D L U'",
      "B R D' M' U2 M D M' U2 M R' B'"
    ],
    "moves": 12,
    "desc": "三阶彳亍棱块三循环 [VQ] (缓冲 UF, DB(B) -> DF(D))"
  },
  {
    "id": "chichu_e_vr",
    "code": "VR",
    "name": "彳亍棱块 [VR] (UF -> DB -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [VR]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' D2 M' U M D2 M' U' M U",
    "algs": [
      "U' D2 M' U M D2 M' U' M U",
      "R U' D2 M' U M D2 M' U' M U R'",
      "R' U' D2 M' U M D2 M' U' M U R",
      "L U' D2 M' U M D2 M' U' M U L'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [VR] (缓冲 UF, DB(B) -> DF(F))"
  },
  {
    "id": "chichu_e_vs",
    "code": "VS",
    "name": "彳亍棱块 [VS] (UF -> DB -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [VS]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U2 M' B' L B L' M L B' L' B U2",
    "algs": [
      "U2 M' B' L B L' M L B' L' B U2",
      "F2 M B' L B L' M' L B' L' B F2",
      "D' R M2 R' F R F' M2 F R' F' D",
      "D' B R' B' R M2 R' B R B' M2 D"
    ],
    "moves": 12,
    "desc": "三阶彳亍棱块三循环 [VS] (缓冲 UF, DB(B) -> DL(D))"
  },
  {
    "id": "chichu_e_vt",
    "code": "VT",
    "name": "彳亍棱块 [VT] (UF -> DB -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [VT]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "y' D M' U M D' M' U' M y",
    "algs": [
      "y' D M' U M D' M' U' M y",
      "y D M U M' D' M U' M' y'",
      "U M U M' D' M U' M' D U'",
      "R U M U M' D' M U' M' D U' R'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [VT] (缓冲 UF, DB(B) -> DL(L))"
  },
  {
    "id": "chichu_e_vw",
    "code": "VW",
    "name": "彳亍棱块 [VW] (UF -> DB -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [VW]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "z' R' S' L' S R S' L S z",
    "algs": [
      "z' R' S' L' S R S' L S z"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [VW] (缓冲 UF, DB(B) -> DR(D))"
  },
  {
    "id": "chichu_e_vx",
    "code": "VX",
    "name": "彳亍棱块 [VX] (UF -> DB -> DR)",
    "title": "彳亍盲拧 - 棱块三循环 [VX]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U M U M' D M U' M' D' U'",
    "algs": [
      "U M U M' D M U' M' D' U'",
      "L U M U M' D M U' M' D' U' L'",
      "L' U M U M' D M U' M' D' U' L",
      "L2 U M U M' D M U' M' D' U' L2"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [VX] (缓冲 UF, DB(B) -> DR(R))"
  },
  {
    "id": "chichu_e_wa",
    "code": "WA",
    "name": "彳亍棱块 [WA] (UF -> DR -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [WA]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' S' U2 S U'",
    "algs": [
      "U' S' U2 S U'",
      "L U' S' U2 S U' L'",
      "L' U' S' U2 S U' L",
      "L2 U' S' U2 S U' L2"
    ],
    "moves": 5,
    "desc": "三阶彳亍棱块三循环 [WA] (缓冲 UF, DR(D) -> UB(U))"
  },
  {
    "id": "chichu_e_wb",
    "code": "WB",
    "name": "彳亍棱块 [WB] (UF -> DR -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [WB]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "z' E L' U2 L E' L' U2 L z",
    "algs": [
      "z' E L' U2 L E' L' U2 L z",
      "U R2 U2 R E R' U2 R E' R U'",
      "F' R L' U' L E' L' U L E R' F",
      "U R2 U2 R' E' R U2 R' E R' U'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [WB] (缓冲 UF, DR(D) -> UB(B))"
  },
  {
    "id": "chichu_e_we",
    "code": "WE",
    "name": "彳亍棱块 [WE] (UF -> DR -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [WE]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L2 D M D2 M' D L2",
    "algs": [
      "L2 D M D2 M' D L2",
      "L2 U' D2 S D2 S' U L2",
      "L2 U L2 S L2 S' U' L2",
      "L2 U S' D2 S D2 U' L2"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [WE] (缓冲 UF, DR(D) -> UL(U))"
  },
  {
    "id": "chichu_e_wf",
    "code": "WF",
    "name": "彳亍棱块 [WF] (UF -> DR -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [WF]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "S' L' U' L S2 L' U L S'",
    "algs": [
      "S' L' U' L S2 L' U L S'",
      "S' L U' L' S2 L U L' S'",
      "F' R L F' L' F E' F' L F L' E R' F",
      "M' U M' D M U' M' D' M2"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [WF] (缓冲 UF, DR(D) -> UL(L))"
  },
  {
    "id": "chichu_e_wg",
    "code": "WG",
    "name": "彳亍棱块 [WG] (UF -> DR -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [WG]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U R U R' S2 R U' R' S2 U'",
    "algs": [
      "U R U R' S2 R U' R' S2 U'",
      "L U R U R' S2 R U' R' S2 U' L'",
      "L' U R U R' S2 R U' R' S2 U' L",
      "R2 U S2 R U R' S2 R U' R' U' R2"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [WG] (缓冲 UF, DR(D) -> UR(U))"
  },
  {
    "id": "chichu_e_wh",
    "code": "WH",
    "name": "彳亍棱块 [WH] (UF -> DR -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [WH]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F' L R2 S' R2 S L' F",
    "algs": [
      "F' L R2 S' R2 S L' F",
      "S2 R U R' S R U' R' S",
      "S2 R' U R S R' U' R S",
      "R2 L' U' L S' L' U L S R2"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [WH] (缓冲 UF, DR(D) -> UR(R))"
  },
  {
    "id": "chichu_e_wi",
    "code": "WI",
    "name": "彳亍棱块 [WI] (UF -> DR -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [WI]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L D M D2 M' D L'",
    "algs": [
      "L D M D2 M' D L'",
      "d R' F R F' M2 F R' F' R M2 d'",
      "Dw R' F R F' M2 F R' F' R M2 Dw'",
      "L U' D2 S D2 S' U L'"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [WI] (缓冲 UF, DR(D) -> FL(F))"
  },
  {
    "id": "chichu_e_wj",
    "code": "WJ",
    "name": "彳亍棱块 [WJ] (UF -> DR -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [WJ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R E' R' F' R E R' F",
    "algs": [
      "R E' R' F' R E R' F",
      "R D E' R' F' R E R' F R D' R'",
      "R D' E' R' F' R E R' F R D R'",
      "B R E' R' F' R E R' F B'"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [WJ] (缓冲 UF, DR(D) -> FL(L))"
  },
  {
    "id": "chichu_e_wk",
    "code": "WK",
    "name": "彳亍棱块 [WK] (UF -> DR -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [WK]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U S2 U R' U' S2 U R U2",
    "algs": [
      "U S2 U R' U' S2 U R U2",
      "L U S2 U R' U' S2 U R U2 L'",
      "L' U S2 U R' U' S2 U R U2 L",
      "L2 U S2 U R' U' S2 U R U2 L2"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [WK] (缓冲 UF, DR(D) -> FR(F))"
  },
  {
    "id": "chichu_e_wl",
    "code": "WL",
    "name": "彳亍棱块 [WL] (UF -> DR -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [WL]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F2 R E' R' F R E R' F",
    "algs": [
      "F2 R E' R' F R E R' F",
      "F' R F' L F L' E' L F' L' F E R' F"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [WL] (缓冲 UF, DR(D) -> FR(R))"
  },
  {
    "id": "chichu_e_wm",
    "code": "WM",
    "name": "彳亍棱块 [WM] (UF -> DR -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [WM]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "L' D M D2 M' D L",
    "algs": [
      "L' D M D2 M' D L",
      "d L F' L' F M2 F' L F L' M2 d'",
      "Dw L F' L' F M2 F' L F L' M2 Dw'",
      "L' U' D2 S D2 S' U L"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [WM] (缓冲 UF, DR(D) -> BL(B))"
  },
  {
    "id": "chichu_e_wn",
    "code": "WN",
    "name": "彳亍棱块 [WN] (UF -> DR -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [WN]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F' L S L2 S' L F",
    "algs": [
      "F' L S L2 S' L F",
      "u R' U2 R S2 R' U2 R S2 u'",
      "Uw R' U2 R S2 R' U2 R S2 Uw'",
      "u S2 U R U' S2 U R' U' u'"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [WN] (缓冲 UF, DR(D) -> BL(L))"
  },
  {
    "id": "chichu_e_wo",
    "code": "WO",
    "name": "彳亍棱块 [WO] (UF -> DR -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [WO]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U S2 U R U' S2 U R' U2",
    "algs": [
      "U S2 U R U' S2 U R' U2",
      "L U S2 U R U' S2 U R' U2 L'",
      "L' U S2 U R U' S2 U R' U2 L",
      "L2 U S2 U R U' S2 U R' U2 L2"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [WO] (缓冲 UF, DR(D) -> BR(B))"
  },
  {
    "id": "chichu_e_wp",
    "code": "WP",
    "name": "彳亍棱块 [WP] (UF -> DR -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [WP]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "u R U2 R' S2 R U2 R' S2 u'",
    "algs": [
      "u R U2 R' S2 R U2 R' S2 u'",
      "Uw R U2 R' S2 R U2 R' S2 Uw'",
      "u S2 U R' U' S2 U R U' u'",
      "Uw S2 U R' U' S2 U R U' Uw'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [WP] (缓冲 UF, DR(D) -> BR(R))"
  },
  {
    "id": "chichu_e_wq",
    "code": "WQ",
    "name": "彳亍棱块 [WQ] (UF -> DR -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [WQ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D' M' U2 M D M' U2 M",
    "algs": [
      "D' M' U2 M D M' U2 M",
      "S D M' U2 M D' M' U2 M S'",
      "L D' M' U2 M D M' U2 M L'",
      "L' D' M' U2 M D M' U2 M L"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [WQ] (缓冲 UF, DR(D) -> DF(D))"
  },
  {
    "id": "chichu_e_wr",
    "code": "WR",
    "name": "彳亍棱块 [WR] (UF -> DR -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [WR]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F' R E R' F R F' E' F R'",
    "algs": [
      "F' R E R' F R F' E' F R'",
      "z' E' L' U2 L E L' U2 L z",
      "F R S' L' S R S' L S R2 F'",
      "F' R2 S' L' S R' S' L S R' F"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [WR] (缓冲 UF, DR(D) -> DF(F))"
  },
  {
    "id": "chichu_e_ws",
    "code": "WS",
    "name": "彳亍棱块 [WS] (UF -> DR -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [WS]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D M D2 M' D",
    "algs": [
      "D M D2 M' D",
      "D R M D2 M' D2 R' D'",
      "D R' M D2 M' D2 R D'",
      "D L M D2 M' D2 L' D'"
    ],
    "moves": 5,
    "desc": "三阶彳亍棱块三循环 [WS] (缓冲 UF, DR(D) -> DL(D))"
  },
  {
    "id": "chichu_e_wt",
    "code": "WT",
    "name": "彳亍棱块 [WT] (UF -> DR -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [WT]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F' S U' L U S' U' L' U F",
    "algs": [
      "F' S U' L U S' U' L' U F",
      "F' L B' L B L' S L B' L' B S' L' F",
      "S' R' F R F' S' F R' F' R S2",
      "z' L' U2 L S' L' U2 L S z"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [WT] (缓冲 UF, DR(D) -> DL(L))"
  },
  {
    "id": "chichu_e_wu",
    "code": "WU",
    "name": "彳亍棱块 [WU] (UF -> DR -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [WU]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D' M' U2 M D' M' U2 M D2",
    "algs": [
      "D' M' U2 M D' M' U2 M D2",
      "U2 D M U2 M' D' M U2 M' U2",
      "L D' M' U2 M D' M' U2 M D2 L'",
      "L' D' M' U2 M D' M' U2 M D2 L"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [WU] (缓冲 UF, DR(D) -> DB(D))"
  },
  {
    "id": "chichu_e_wv",
    "code": "WV",
    "name": "彳亍棱块 [WV] (UF -> DR -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [WV]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "B' R2 U' R' E2 R U R' E2 R' B",
    "algs": [
      "B' R2 U' R' E2 R U R' E2 R' B",
      "B' R E2 L U L' E2 L U' L' R' B"
    ],
    "moves": 11,
    "desc": "三阶彳亍棱块三循环 [WV] (缓冲 UF, DR(D) -> DB(B))"
  },
  {
    "id": "chichu_e_xa",
    "code": "XA",
    "name": "彳亍棱块 [XA] (UF -> DR -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [XA]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "M' D M U2 M' D' M U2",
    "algs": [
      "M' D M U2 M' D' M U2",
      "Lw' D M U2 M' D' M U2 M' Lw",
      "U2 M D' M' U2 M D M'",
      "Lw M' U2 M D' M' U2 M D Lw'"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [XA] (缓冲 UF, DR(R) -> UB(U))"
  },
  {
    "id": "chichu_e_xb",
    "code": "XB",
    "name": "彳亍棱块 [XB] (UF -> DR -> UB)",
    "title": "彳亍盲拧 - 棱块三循环 [XB]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R U R U' M' U R' U' M R'",
    "algs": [
      "R U R U' M' U R' U' M R'",
      "R D U R U' M' U R' U' M D' R'",
      "R D' U R U' M' U R' U' M D R'",
      "R' U R' U' M' U R U' M R"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [XB] (缓冲 UF, DR(R) -> UB(B))"
  },
  {
    "id": "chichu_e_xe",
    "code": "XE",
    "name": "彳亍棱块 [XE] (UF -> DR -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [XE]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' M D' M' U M D M'",
    "algs": [
      "U' M D' M' U M D M'",
      "x2 D' M U' M' D M U M' x2"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [XE] (缓冲 UF, DR(R) -> UL(U))"
  },
  {
    "id": "chichu_e_xf",
    "code": "XF",
    "name": "彳亍棱块 [XF] (UF -> DR -> UL)",
    "title": "彳亍盲拧 - 棱块三循环 [XF]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D2 S R U R' S' R U' R' D2",
    "algs": [
      "D2 S R U R' S' R U' R' D2",
      "D2 S R' U R S' R' U' R D2",
      "M' S2 R U' R' S2 R U R' M",
      "M' S2 R' U' R S2 R' U R M"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [XF] (缓冲 UF, DR(R) -> UL(L))"
  },
  {
    "id": "chichu_e_xg",
    "code": "XG",
    "name": "彳亍棱块 [XG] (UF -> DR -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [XG]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "S' L' U' L S L' U L",
    "algs": [
      "S' L' U' L S L' U L",
      "S' L U' L' S L U L'",
      "F U R' U' S U R U' S' F'",
      "L S' L' U' L S L' U"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [XG] (缓冲 UF, DR(R) -> UR(U))"
  },
  {
    "id": "chichu_e_xh",
    "code": "XH",
    "name": "彳亍棱块 [XH] (UF -> DR -> UR)",
    "title": "彳亍盲拧 - 棱块三循环 [XH]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F' R' E R2 E' R' F",
    "algs": [
      "F' R' E R2 E' R' F",
      "U' R' E R' U R E' R' U' R2 U",
      "F' R E' F2 E F2 R' F",
      "F' R' F2 E' F2 E R F"
    ],
    "moves": 7,
    "desc": "三阶彳亍棱块三循环 [XH] (缓冲 UF, DR(R) -> UR(R))"
  },
  {
    "id": "chichu_e_xi",
    "code": "XI",
    "name": "彳亍棱块 [XI] (UF -> DR -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [XI]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "d' M D' L' D M' D' L D d",
    "algs": [
      "d' M D' L' D M' D' L D d",
      "Dw' M D' L' D M' D' L D Dw",
      "u' S U R' U' S' U R U' u",
      "Uw' S U R' U' S' U R U' Uw"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [XI] (缓冲 UF, DR(R) -> FL(F))"
  },
  {
    "id": "chichu_e_xj",
    "code": "XJ",
    "name": "彳亍棱块 [XJ] (UF -> DR -> FL)",
    "title": "彳亍盲拧 - 棱块三循环 [XJ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R' E2 R' F' R E2 R' F R2",
    "algs": [
      "R' E2 R' F' R E2 R' F R2",
      "R' D E2 R' F' R E2 R' F R D' R",
      "R' D' E2 R' F' R E2 R' F R D R",
      "R' E2 F' L F L' E2 L F' L' F R"
    ],
    "moves": 9,
    "desc": "三阶彳亍棱块三循环 [XJ] (缓冲 UF, DR(R) -> FL(L))"
  },
  {
    "id": "chichu_e_xk",
    "code": "XK",
    "name": "彳亍棱块 [XK] (UF -> DR -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [XK]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "u' S U R U' S' U R' U' u",
    "algs": [
      "u' S U R U' S' U R' U' u",
      "Uw' S U R U' S' U R' U' Uw",
      "U R D R D' S D R' D' S' R' U'",
      "U R F R' F' R S R' F R F' S' R' U'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [XK] (缓冲 UF, DR(R) -> FR(F))"
  },
  {
    "id": "chichu_e_xl",
    "code": "XL",
    "name": "彳亍棱块 [XL] (UF -> DR -> FR)",
    "title": "彳亍盲拧 - 棱块三循环 [XL]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D' M D R' D' M' D R",
    "algs": [
      "D' M D R' D' M' D R",
      "U' S U R' U' S' U R",
      "L U' S U R' U' S' U R L'",
      "L' U' S U R' U' S' U R L"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [XL] (缓冲 UF, DR(R) -> FR(R))"
  },
  {
    "id": "chichu_e_xm",
    "code": "XM",
    "name": "彳亍棱块 [XM] (UF -> DR -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [XM]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "d' M D R D' M' D R' D' d",
    "algs": [
      "d' M D R D' M' D R' D' d",
      "Dw' M D R D' M' D R' D' Dw",
      "L U' L' U' L S' L' U L S U L'",
      "L U' L U' L' S' L U L' S U L'"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [XM] (缓冲 UF, DR(R) -> BL(B))"
  },
  {
    "id": "chichu_e_xn",
    "code": "XN",
    "name": "彳亍棱块 [XN] (UF -> DR -> BL)",
    "title": "彳亍盲拧 - 棱块三循环 [XN]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F' L D2 S' D2 S L' F",
    "algs": [
      "F' L D2 S' D2 S L' F",
      "L S2 L F' L' F S2 F' L F L2",
      "F' R' L2 E L2 E' R F",
      "F' R F2 E F2 E' R' F"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [XN] (缓冲 UF, DR(R) -> BL(L))"
  },
  {
    "id": "chichu_e_xo",
    "code": "XO",
    "name": "彳亍棱块 [XO] (UF -> DR -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [XO]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "u' L U2 L' S' L U2 L' S u",
    "algs": [
      "u' L U2 L' S' L U2 L' S u",
      "Uw' L U2 L' S' L U2 L' S Uw",
      "F' L S' U R U' S U R' U' L' F",
      "F' L S' B R' B' R S R' B R B' L' F"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [XO] (缓冲 UF, DR(R) -> BR(B))"
  },
  {
    "id": "chichu_e_xp",
    "code": "XP",
    "name": "彳亍棱块 [XP] (UF -> DR -> BR)",
    "title": "彳亍盲拧 - 棱块三循环 [XP]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "D' M D R D' M' D R'",
    "algs": [
      "D' M D R D' M' D R'",
      "L D' M D R D' M' D R' L'",
      "L' D' M D R D' M' D R' L",
      "D' L M D R D' M' D R' D' L' D"
    ],
    "moves": 8,
    "desc": "三阶彳亍棱块三循环 [XP] (缓冲 UF, DR(R) -> BR(R))"
  },
  {
    "id": "chichu_e_xq",
    "code": "XQ",
    "name": "彳亍棱块 [XQ] (UF -> DR -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [XQ]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U' R' F' R S' R' F R S U",
    "algs": [
      "U' R' F' R S' R' F R S U",
      "L U' R' F' R S' R' F R S U L'",
      "L' U' R' F' R S' R' F R S U L",
      "U' L R' F' R S' R' F R S L' U"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [XQ] (缓冲 UF, DR(R) -> DF(D))"
  },
  {
    "id": "chichu_e_xr",
    "code": "XR",
    "name": "彳亍棱块 [XR] (UF -> DR -> DF)",
    "title": "彳亍盲拧 - 棱块三循环 [XR]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R M' R' F R F' M F R' F'",
    "algs": [
      "R M' R' F R F' M F R' F'",
      "B R M' R' F R F' M F R' F' B'",
      "B' R M' R' F R F' M F R' F' B",
      "D' F' L' F M' F' L F L' M L D"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [XR] (缓冲 UF, DR(R) -> DF(F))"
  },
  {
    "id": "chichu_e_xs",
    "code": "XS",
    "name": "彳亍棱块 [XS] (UF -> DR -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [XS]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "x R U R' E R U' R' E' x'",
    "algs": [
      "x R U R' E R U' R' E' x'",
      "R U L2 S R S' L2 S R' S' U' R'",
      "U R L2 S R S' L2 S R' S' R' U'",
      "R' U L2 S R' S' L2 S R S' U' R"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [XS] (缓冲 UF, DR(R) -> DL(D))"
  },
  {
    "id": "chichu_e_xt",
    "code": "XT",
    "name": "彳亍棱块 [XT] (UF -> DR -> DL)",
    "title": "彳亍盲拧 - 棱块三循环 [XT]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "F U R' U' S' U R U' S F'",
    "algs": [
      "F U R' U' S' U R U' S F'",
      "F R' S' B R' B' R S R' B R B' R F'",
      "L2 S2 L F' L' F S2 F' L F L",
      "y' D2 M' U M D2 M' U' M y"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [XT] (缓冲 UF, DR(R) -> DL(L))"
  },
  {
    "id": "chichu_e_xu",
    "code": "XU",
    "name": "彳亍棱块 [XU] (UF -> DR -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [XU]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "R M2 R' F R F' M2 F R' F'",
    "algs": [
      "R M2 R' F R F' M2 F R' F'",
      "Rw M2 U R U' M2 U R' U' Rw'",
      "x M2 U R U' M2 U R' U' x'",
      "Rw' U R' U' M2 U R U' M2 Rw"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [XU] (缓冲 UF, DR(R) -> DB(D))"
  },
  {
    "id": "chichu_e_xv",
    "code": "XV",
    "name": "彳亍棱块 [XV] (UF -> DR -> DB)",
    "title": "彳亍盲拧 - 棱块三循环 [XV]",
    "group": "彳亍盲拧 - 棱块三循环",
    "alg": "U D M U M' D' M U' M' U'",
    "algs": [
      "U D M U M' D' M U' M' U'",
      "L U D M U M' D' M U' M' U' L'",
      "L' U D M U M' D' M U' M' U' L",
      "L2 U D M U M' D' M U' M' U' L2"
    ],
    "moves": 10,
    "desc": "三阶彳亍棱块三循环 [XV] (缓冲 UF, DR(R) -> DB(B))"
  },
  {
    "id": "chichu_c_dg",
    "code": "DG",
    "name": "彳亍角块 [DG] (UBL -> UBR -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [DG]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L' U R' D2 R U' R' D2 R L",
    "algs": [
      "L' U R' D2 R U' R' D2 R L",
      "D L' U R' D2 R U' R' D2 R L D'",
      "D' L' U R' D2 R U' R' D2 R L D",
      "Lw' U R' D2 R U' R' D2 R Lw"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [DG] (缓冲 UBL, UBR(U) -> URF(U))"
  },
  {
    "id": "chichu_c_dh",
    "code": "DH",
    "name": "彳亍角块 [DH] (UBL -> UBR -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [DH]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' U' B' D' B U B' D B2",
    "algs": [
      "B' U' B' D' B U B' D B2",
      "R B' D' B U B' D B U' R'",
      "B' L U' B' D' B U B' D B L' B",
      "U L B' D2 B U' B' D2 B U L' U'"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [DH] (缓冲 UBL, UBR(U) -> URF(F))"
  },
  {
    "id": "chichu_c_di",
    "code": "DI",
    "name": "彳亍角块 [DI] (UBL -> UBR -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [DI]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B2 D B' U2 B D' B' U2 B'",
    "algs": [
      "B2 D B' U2 B D' B' U2 B'",
      "U' L U2 B' D2 B U2 B' D2 B L' U",
      "B2 D2 L' U L D' L' U' L D' B2",
      "B2 D' R U R' D' R U' R' D2 B2"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [DI] (缓冲 UBL, UBR(U) -> URF(R))"
  },
  {
    "id": "chichu_c_dj",
    "code": "DJ",
    "name": "彳亍角块 [DJ] (UBL -> UBR -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [DJ]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R L D2 L' U' L D2 L' U R'",
    "algs": [
      "R L D2 L' U' L D2 L' U R'",
      "R D U L' D' L U' L' D L D' R'",
      "U' R' U L' D2 L U' L' D2 L R U",
      "R D' U B D2 B' U' B D2 B' D R'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [DJ] (缓冲 UBL, UBR(U) -> UFL(U))"
  },
  {
    "id": "chichu_c_dk",
    "code": "DK",
    "name": "彳亍角块 [DK] (UBL -> UBR -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [DK]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B2 D B' U B D' B' U' B'",
    "algs": [
      "B2 D B' U B D' B' U' B'",
      "L' U' B D B' U B D' B' L",
      "B R B D B' U B D' B' U' R' B'",
      "U' R' U B D2 B' U' B D2 B' R U"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [DK] (缓冲 UBL, UBR(U) -> UFL(F))"
  },
  {
    "id": "chichu_c_dl",
    "code": "DL",
    "name": "彳亍角块 [DL] (UBL -> UBR -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [DL]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' U2 B' D' B U2 B' D B2",
    "algs": [
      "B' U2 B' D' B U2 B' D B2",
      "B2 U' D L U2 L' D' L U2 L' U B2",
      "B2 D2 L' U' L D' L' U L D' B2",
      "B2 D' R U' R' D' R U R' D2 B2"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [DL] (缓冲 UBL, UBR(U) -> UFL(L))"
  },
  {
    "id": "chichu_c_dm",
    "code": "DM",
    "name": "彳亍角块 [DM] (UBL -> UBR -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [DM]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F' B D2 B' U' B D2 B' U F",
    "algs": [
      "F' B D2 B' U' B D2 B' U F",
      "z L D2 L' U2 L D2 L' U2 z'",
      "z U2 B' D' B U2 B' D B z'",
      "z' R U2 R' D2 R U2 R' D2 z"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [DM] (缓冲 UBL, UBR(U) -> DLF(D))"
  },
  {
    "id": "chichu_c_dn",
    "code": "DN",
    "name": "彳亍角块 [DN] (UBL -> UBR -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [DN]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U R D2 R' U' R D2 R'",
    "algs": [
      "U R D2 R' U' R D2 R'",
      "y2 U L D2 L' U' L D2 L' y2",
      "y U F D2 F' U' F D2 F' y'",
      "U' F' D' F U' F' D F U2"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [DN] (缓冲 UBL, UBR(U) -> DLF(F))"
  },
  {
    "id": "chichu_c_do",
    "code": "DO",
    "name": "彳亍角块 [DO] (UBL -> UBR -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [DO]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U B' D2 B U' B' D2 B",
    "algs": [
      "U B' D2 B U' B' D2 B",
      "U L R D' R' U' R D R' U L' U'",
      "U2 R' D R U' R' D' R U'",
      "U' L D L' U' L D' L' U2"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [DO] (缓冲 UBL, UBR(U) -> DLF(L))"
  },
  {
    "id": "chichu_c_dp",
    "code": "DP",
    "name": "彳亍角块 [DP] (UBL -> UBR -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [DP]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F U B' D2 B U' B' D2 B F'",
    "algs": [
      "F U B' D2 B U' B' D2 B F'",
      "U' R' L D2 L' U' L D2 L' U R U",
      "F D L' D2 L U' L' D2 L U D' F'",
      "F D' B D B' U' B D' B' U D F'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [DP] (缓冲 UBL, UBR(U) -> DFR(D))"
  },
  {
    "id": "chichu_c_dq",
    "code": "DQ",
    "name": "彳亍角块 [DQ] (UBL -> UBR -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [DQ]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L' D2 L U' L' D2 L U",
    "algs": [
      "L' D2 L U' L' D2 L U",
      "u' U L' D2 L U' L' D2 L u",
      "Uw' U L' D2 L U' L' D2 L Uw",
      "U2 F D F' U' F D' F' U'"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [DQ] (缓冲 UBL, UBR(U) -> DFR(F))"
  },
  {
    "id": "chichu_c_dr",
    "code": "DR",
    "name": "彳亍角块 [DR] (UBL -> UBR -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [DR]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B D2 B' U' B D2 B' U",
    "algs": [
      "B D2 B' U' B D2 B' U",
      "u' U B D2 B' U' B D2 B' u",
      "Uw' U B D2 B' U' B D2 B' Uw",
      "D U B' D' B U' B' D B D'"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [DR] (缓冲 UBL, UBR(U) -> DFR(R))"
  },
  {
    "id": "chichu_c_ds",
    "code": "DS",
    "name": "彳亍角块 [DS] (UBL -> UBR -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [DS]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U' L F L' B2 L F' L' B2 U",
    "algs": [
      "U' L F L' B2 L F' L' B2 U",
      "L D R' F R B2 R' F' R B2 D' L'",
      "F2 U' L F L' B2 L F' L' B2 U F2",
      "u' L F L' B2 L F' L' B2 u"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [DS] (缓冲 UBL, UBR(U) -> DBR(D))"
  },
  {
    "id": "chichu_c_dt",
    "code": "DT",
    "name": "彳亍角块 [DT] (UBL -> UBR -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [DT]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U B' D' B U' B' D B",
    "algs": [
      "U B' D' B U' B' D B",
      "F U B' D' B U' B' D B F'",
      "F' U B' D' B U' B' D B F",
      "F2 U B' D' B U' B' D B F2"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [DT] (缓冲 UBL, UBR(U) -> DBR(B))"
  },
  {
    "id": "chichu_c_du",
    "code": "DU",
    "name": "彳亍角块 [DU] (UBL -> UBR -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [DU]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U R D R' U' R D' R'",
    "algs": [
      "U R D R' U' R D' R'",
      "F U R D R' U' R D' R' F'",
      "F' U R D R' U' R D' R' F",
      "F2 U R D R' U' R D' R' F2"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [DU] (缓冲 UBL, UBR(U) -> DBR(R))"
  },
  {
    "id": "chichu_c_dv",
    "code": "DV",
    "name": "彳亍角块 [DV] (UBL -> UBR -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [DV]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U B2 R' F' R B2 R' F R U'",
    "algs": [
      "U B2 R' F' R B2 R' F R U'",
      "F2 U B2 R' F' R B2 R' F R U' F2",
      "u B2 R' F' R B2 R' F R u'",
      "Uw B2 R' F' R B2 R' F R Uw'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [DV] (缓冲 UBL, UBR(U) -> DBL(D))"
  },
  {
    "id": "chichu_c_dw",
    "code": "DW",
    "name": "彳亍角块 [DW] (UBL -> UBR -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [DW]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B D B' U' B D' B' U",
    "algs": [
      "B D B' U' B D' B' U",
      "U' R U B D B' U' B D' B' R' U",
      "U' R' U B D B' U' B D' B' R U",
      "F2 B D B' U' B D' B' U F2"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [DW] (缓冲 UBL, UBR(U) -> DBL(B))"
  },
  {
    "id": "chichu_c_dx",
    "code": "DX",
    "name": "彳亍角块 [DX] (UBL -> UBR -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [DX]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U R D' R' U' R D R'",
    "algs": [
      "U R D' R' U' R D R'",
      "F U R D' R' U' R D R' F'",
      "F' U R D' R' U' R D R' F",
      "F2 U R D' R' U' R D R' F2"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [DX] (缓冲 UBL, UBR(U) -> DBL(L))"
  },
  {
    "id": "chichu_c_eg",
    "code": "EG",
    "name": "彳亍角块 [EG] (UBL -> UBR -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [EG]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R' L' D2 L U2 L' D2 L U2 R",
    "algs": [
      "R' L' D2 L U2 L' D2 L U2 R",
      "D R' L' D2 L U2 L' D2 L U2 R D'",
      "D' R' L' D2 L U2 L' D2 L U2 R D",
      "Rw' L' D2 L U2 L' D2 L U2 Rw"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [EG] (缓冲 UBL, UBR(B) -> URF(U))"
  },
  {
    "id": "chichu_c_eh",
    "code": "EH",
    "name": "彳亍角块 [EH] (UBL -> UBR -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [EH]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F' L U2 R D2 R' U2 R D2 R' L' F",
    "algs": [
      "F' L U2 R D2 R' U2 R D2 R' L' F",
      "F' L F' D' F U2 F' D F U2 L' F",
      "B' D R' F' R B2 R' F R B2 D' B",
      "R U' B2 L F L' B2 L F' L' U R'"
    ],
    "moves": 12,
    "desc": "三阶彳亍角块三循环 [EH] (缓冲 UBL, UBR(B) -> URF(F))"
  },
  {
    "id": "chichu_c_ei",
    "code": "EI",
    "name": "彳亍角块 [EI] (UBL -> UBR -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [EI]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R' U2 R' D' R U2 R' D R2",
    "algs": [
      "R' U2 R' D' R U2 R' D R2",
      "D R' U2 R' D' R U2 R' D R2 D'",
      "D' R' U2 R' D' R U2 R' D R2 D",
      "Rw' U2 R' D' R U2 R' D R Rw"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [EI] (缓冲 UBL, UBR(B) -> URF(R))"
  },
  {
    "id": "chichu_c_ej",
    "code": "EJ",
    "name": "彳亍角块 [EJ] (UBL -> UBR -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [EJ]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L2 D L' U2 L D' L' U2 L'",
    "algs": [
      "L2 D L' U2 L D' L' U2 L'",
      "D L2 D L' U2 L D' L' U2 L' D'",
      "D' L2 D L' U2 L D' L' U2 L' D",
      "Lw L D L' U2 L D' L' U2 Lw'"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [EJ] (缓冲 UBL, UBR(B) -> UFL(U))"
  },
  {
    "id": "chichu_c_ek",
    "code": "EK",
    "name": "彳亍角块 [EK] (UBL -> UBR -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [EK]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L U2 R D2 R' U2 R D2 R' L'",
    "algs": [
      "L U2 R D2 R' U2 R D2 R' L'",
      "D L U2 R D2 R' U2 R D2 R' L' D'",
      "D' L U2 R D2 R' U2 R D2 R' L' D",
      "Lw U2 R D2 R' U2 R D2 R' Lw'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [EK] (缓冲 UBL, UBR(B) -> UFL(F))"
  },
  {
    "id": "chichu_c_el",
    "code": "EL",
    "name": "彳亍角块 [EL] (UBL -> UBR -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [EL]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F R' L' D2 L U2 L' D2 L U2 R F'",
    "algs": [
      "F R' L' D2 L U2 L' D2 L U2 R F'",
      "F R' U2 F D F' U2 F D' F' R F'",
      "L' U R' F' R B2 R' F R B2 U' L",
      "B D' B2 L F L' B2 L F' L' D B'"
    ],
    "moves": 12,
    "desc": "三阶彳亍角块三循环 [EL] (缓冲 UBL, UBR(B) -> UFL(L))"
  },
  {
    "id": "chichu_c_em",
    "code": "EM",
    "name": "彳亍角块 [EM] (UBL -> UBR -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [EM]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D L2 D' L' U2 L D L' U2 L' D'",
    "algs": [
      "D L2 D' L' U2 L D L' U2 L' D'",
      "F' R' L' D L U2 L' D' L U2 R F",
      "D R' U2 F D' F' U2 F D F' R D'",
      "F' L U2 B' D B U2 B' D' B L' F"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [EM] (缓冲 UBL, UBR(B) -> DLF(D))"
  },
  {
    "id": "chichu_c_en",
    "code": "EN",
    "name": "彳亍角块 [EN] (UBL -> UBR -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [EN]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L U2 R D' R' U2 R D R' L'",
    "algs": [
      "L U2 R D' R' U2 R D R' L'",
      "Lw U2 R D' R' U2 R D R' Lw'",
      "R' U R D2 R' U2 R D2 R' U R",
      "L D U2 R D2 R' U2 R D2 R' D' L'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [EN] (缓冲 UBL, UBR(B) -> DLF(F))"
  },
  {
    "id": "chichu_c_eo",
    "code": "EO",
    "name": "彳亍角块 [EO] (UBL -> UBR -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [EO]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R' U2 R' D R U2 R' D' R2",
    "algs": [
      "R' U2 R' D R U2 R' D' R2",
      "Rw' U2 R' D R U2 R' D' R Rw",
      "L U' R' D2 R U2 R' D2 R U' L'",
      "R' D' U2 R' D2 R U2 R' D2 R D R"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [EO] (缓冲 UBL, UBR(B) -> DLF(L))"
  },
  {
    "id": "chichu_c_ep",
    "code": "EP",
    "name": "彳亍角块 [EP] (UBL -> UBR -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [EP]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L2 D' L' U2 L D L' U2 L'",
    "algs": [
      "L2 D' L' U2 L D L' U2 L'",
      "Lw L D' L' U2 L D L' U2 Lw'",
      "R' U' L D2 L' U2 L D2 L' U' R",
      "L D L D2 L' U2 L D2 L' U2 D' L'"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [EP] (缓冲 UBL, UBR(B) -> DFR(D))"
  },
  {
    "id": "chichu_c_eq",
    "code": "EQ",
    "name": "彳亍角块 [EQ] (UBL -> UBR -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [EQ]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D' R' U2 R' D R U2 R' D' R2 D",
    "algs": [
      "D' R' U2 R' D R U2 R' D' R2 D",
      "D' L F' D F U2 F' D' F U2 L' D",
      "F R' B D' B' U2 B D B' U2 R F'",
      "D' L' B2 R' F R B2 R' F' R L D"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [EQ] (缓冲 UBL, UBR(B) -> DFR(F))"
  },
  {
    "id": "chichu_c_er",
    "code": "ER",
    "name": "彳亍角块 [ER] (UBL -> UBR -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [ER]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R' L' D L U2 L' D' L U2 R",
    "algs": [
      "R' L' D L U2 L' D' L U2 R",
      "Rw' L' D L U2 L' D' L U2 Rw",
      "L U L' D2 L U2 L' D2 L U L'",
      "R' D' L' D2 L U2 L' D2 L U2 D R"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [ER] (缓冲 UBL, UBR(B) -> DFR(R))"
  },
  {
    "id": "chichu_c_es",
    "code": "ES",
    "name": "彳亍角块 [ES] (UBL -> UBR -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [ES]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L2 D2 L' U2 L D2 L' U2 L'",
    "algs": [
      "L2 D2 L' U2 L D2 L' U2 L'",
      "F' L2 D2 L' U2 L D2 L' U2 L' F",
      "Lw L D2 L' U2 L D2 L' U2 Lw'",
      "R2 D U2 L' D L U2 L' D' L D' R2"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [ES] (缓冲 UBL, UBR(B) -> DBR(D))"
  },
  {
    "id": "chichu_c_et",
    "code": "ET",
    "name": "彳亍角块 [ET] (UBL -> UBR -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [ET]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L U2 R D R' U2 R D' R' L'",
    "algs": [
      "L U2 R D R' U2 R D' R' L'",
      "F' L U2 R D R' U2 R D' R' L' F",
      "Lw U2 R D R' U2 R D' R' Lw'",
      "L U L' D L U2 L' D' L U L'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [ET] (缓冲 UBL, UBR(B) -> DBR(B))"
  },
  {
    "id": "chichu_c_eu",
    "code": "EU",
    "name": "彳亍角块 [EU] (UBL -> UBR -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [EU]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D R' U2 R' D2 R U2 R' D2 R2 D'",
    "algs": [
      "D R' U2 R' D2 R U2 R' D2 R2 D'",
      "D R' B D B' U2 B D' B' U2 R D'",
      "R2 D' F2 R B' R' F2 R B R' D R2",
      "D L' B2 R' F2 R B2 R' F2 R L D'"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [EU] (缓冲 UBL, UBR(B) -> DBR(R))"
  },
  {
    "id": "chichu_c_ev",
    "code": "EV",
    "name": "彳亍角块 [EV] (UBL -> UBR -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [EV]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D' L2 D2 L' U2 L D2 L' U2 L' D",
    "algs": [
      "D' L2 D2 L' U2 L D2 L' U2 L' D",
      "D' L U2 B' D' B U2 B' D B L' D",
      "L2 D L' B L F2 L' B' L F2 D' L2",
      "D' R L F2 L' B2 L F2 L' B2 R' D"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [EV] (缓冲 UBL, UBR(B) -> DBL(D))"
  },
  {
    "id": "chichu_c_ew",
    "code": "EW",
    "name": "彳亍角块 [EW] (UBL -> UBR -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [EW]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R' U2 R' D2 R U2 R' D2 R2",
    "algs": [
      "R' U2 R' D2 R U2 R' D2 R2",
      "F R' U2 R' D2 R U2 R' D2 R2 F'",
      "F' R' U2 R' D2 R U2 R' D2 R2 F",
      "Rw' U2 R' D2 R U2 R' D2 R Rw"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [EW] (缓冲 UBL, UBR(B) -> DBL(B))"
  },
  {
    "id": "chichu_c_ex",
    "code": "EX",
    "name": "彳亍角块 [EX] (UBL -> UBR -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [EX]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R' L' D' L U2 L' D L U2 R",
    "algs": [
      "R' L' D' L U2 L' D L U2 R",
      "F R' L' D' L U2 L' D L U2 R F'",
      "F' R' L' D' L U2 L' D L U2 R F",
      "Rw' L' D' L U2 L' D L U2 Rw"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [EX] (缓冲 UBL, UBR(B) -> DBL(L))"
  },
  {
    "id": "chichu_c_fg",
    "code": "FG",
    "name": "彳亍角块 [FG] (UBL -> UBR -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [FG]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B L' D' L U2 L' D L U2 B'",
    "algs": [
      "B L' D' L U2 L' D L U2 B'",
      "B D' U2 F D' F' U2 F D F' D B'",
      "B U2 F D2 F' U2 F D2 F' B'",
      "U' L F' D' F U2 F' D F U2 L' U"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [FG] (缓冲 UBL, UBR(R) -> URF(U))"
  },
  {
    "id": "chichu_c_fh",
    "code": "FH",
    "name": "彳亍角块 [FH] (UBL -> UBR -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [FH]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' R' F' R B R' F R",
    "algs": [
      "B' R' F' R B R' F R",
      "D B' R' F' R B R' F R D'",
      "D' B' R' F' R B R' F R D",
      "Rw' R B' R' F' R B R' F Rw"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [FH] (缓冲 UBL, UBR(R) -> URF(F))"
  },
  {
    "id": "chichu_c_fi",
    "code": "FI",
    "name": "彳亍角块 [FI] (UBL -> UBR -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [FI]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "z' L' D' L U L' D L U' z",
    "algs": [
      "z' L' D' L U L' D L U' z",
      "x' U' F D F' U F D' F' x",
      "F' R F' D2 F U' F' D2 F U R' F",
      "z R' U' R D R' U R D' z'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [FI] (缓冲 UBL, UBR(R) -> URF(R))"
  },
  {
    "id": "chichu_c_fj",
    "code": "FJ",
    "name": "彳亍角块 [FJ] (UBL -> UBR -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [FJ]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' R' F R B R' F' R",
    "algs": [
      "B' R' F R B R' F' R",
      "R' D R B' R' F R B R' F' D' R",
      "R' D' R B' R' F R B R' F' D R",
      "D B' R' F R B R' F' R D'"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [FJ] (缓冲 UBL, UBR(R) -> UFL(U))"
  },
  {
    "id": "chichu_c_fk",
    "code": "FK",
    "name": "彳亍角块 [FK] (UBL -> UBR -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [FK]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "x' F' D' F U F' D F U' x",
    "algs": [
      "x' F' D' F U F' D F U' x",
      "B L B D' B' U B D B' U' L' B'",
      "z U' R D R' U R D' R' z'",
      "F L' R D' R' U' R D R' U L F'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [FK] (缓冲 UBL, UBR(R) -> UFL(F))"
  },
  {
    "id": "chichu_c_fl",
    "code": "FL",
    "name": "彳亍角块 [FL] (UBL -> UBR -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [FL]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' U2 R D R' U2 R D' R' B",
    "algs": [
      "B' U2 R D R' U2 R D' R' B",
      "U' L' R' D2 R U2 R' D2 R U2 L U",
      "U R' L' D2 L U2 L' D2 L U2 R U'",
      "U R' U2 F D F' U2 F D' F' R U'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [FL] (缓冲 UBL, UBR(R) -> UFL(L))"
  },
  {
    "id": "chichu_c_fm",
    "code": "FM",
    "name": "彳亍角块 [FM] (UBL -> UBR -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [FM]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "z U2 R D R' U2 R D' R' z'",
    "algs": [
      "z U2 R D R' U2 R D' R' z'",
      "z F' D2 F U2 F' D2 F U2 z'",
      "B' R' U' R D2 R' U R D2 B",
      "z' D2 L U L' D2 L U' L' z"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [FM] (缓冲 UBL, UBR(R) -> DLF(D))"
  },
  {
    "id": "chichu_c_fn",
    "code": "FN",
    "name": "彳亍角块 [FN] (UBL -> UBR -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [FN]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B D' L U L' D L U' L' B'",
    "algs": [
      "B D' L U L' D L U' L' B'",
      "L2 D B' D B U B' D' B U' D' L2",
      "L2 B' D2 B U B' D2 B U' L2",
      "L2 U2 L D L' U L D' L' U L2"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [FN] (缓冲 UBL, UBR(R) -> DLF(F))"
  },
  {
    "id": "chichu_c_fo",
    "code": "FO",
    "name": "彳亍角块 [FO] (UBL -> UBR -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [FO]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' R' F2 R B R' F2 R",
    "algs": [
      "B' R' F2 R B R' F2 R",
      "Rw' R B' R' F2 R B R' F2 Rw",
      "D L F2 L' B L F2 L' B' D'",
      "z R' F R B R' F' R B' z'"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [FO] (缓冲 UBL, UBR(R) -> DLF(L))"
  },
  {
    "id": "chichu_c_fp",
    "code": "FP",
    "name": "彳亍角块 [FP] (UBL -> UBR -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [FP]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "x' F' D2 F U F' D2 F U' x",
    "algs": [
      "x' F' D2 F U F' D2 F U' x",
      "B L B D2 B' U B D2 B' U' L' B'",
      "R2 U' B D2 B' U B D2 B' R2",
      "R2 D B' D' B U B' D B U' D' R2"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [FP] (缓冲 UBL, UBR(R) -> DFR(D))"
  },
  {
    "id": "chichu_c_fq",
    "code": "FQ",
    "name": "彳亍角块 [FQ] (UBL -> UBR -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [FQ]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L F2 L' B L F2 L' B'",
    "algs": [
      "L F2 L' B L F2 L' B'",
      "Lw F2 L' B L F2 L' B' L Lw'",
      "F' L F' L' B L F L' B' F",
      "F' D L F' L' B L F L' B' D' F"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [FQ] (缓冲 UBL, UBR(R) -> DFR(F))"
  },
  {
    "id": "chichu_c_fr",
    "code": "FR",
    "name": "彳亍角块 [FR] (UBL -> UBR -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [FR]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B D2 L U L' D2 L U' L' B'",
    "algs": [
      "B D2 L U L' D2 L U' L' B'",
      "z' L' D' L U2 L' D L U2 z",
      "z' U2 F D2 F' U2 F D2 F' z",
      "B D R' U R D2 R' U' R D B'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [FR] (缓冲 UBL, UBR(R) -> DFR(R))"
  },
  {
    "id": "chichu_c_fs",
    "code": "FS",
    "name": "彳亍角块 [FS] (UBL -> UBR -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [FS]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R D' R U2 R' D R U2 R2",
    "algs": [
      "R D' R U2 R' D R U2 R2",
      "R2 U L D' L' U2 L D L' U R2",
      "R2 D F D' F' U2 F D F' U2 D' R2",
      "R2 D' U2 B D' B' U2 B D B' D R2"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [FS] (缓冲 UBL, UBR(R) -> DBR(D))"
  },
  {
    "id": "chichu_c_ft",
    "code": "FT",
    "name": "彳亍角块 [FT] (UBL -> UBR -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [FT]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D L2 U2 L D L' U2 L D' L D'",
    "algs": [
      "D L2 U2 L D L' U2 L D' L D'",
      "U' L R' U2 R D2 R' U2 R D2 L' U",
      "R2 U F2 L' B L F2 L' B' L U' R2",
      "L' D R' F2 R B2 R' F2 R B2 D' L"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [FT] (缓冲 UBL, UBR(R) -> DBR(B))"
  },
  {
    "id": "chichu_c_fu",
    "code": "FU",
    "name": "彳亍角块 [FU] (UBL -> UBR -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [FU]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B U R D' R' U' R D R' B'",
    "algs": [
      "B U R D' R' U' R D R' B'",
      "z' U R D' R' U' R D R' z",
      "B D U R D2 R' U' R D2 R' D' B'",
      "U R' U F D F' U' F D' F' R U'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [FU] (缓冲 UBL, UBR(R) -> DBR(R))"
  },
  {
    "id": "chichu_c_fv",
    "code": "FV",
    "name": "彳亍角块 [FV] (UBL -> UBR -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [FV]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D' R D' R U2 R' D R U2 R2 D",
    "algs": [
      "D' R D' R U2 R' D R U2 R2 D",
      "B R D2 L U L' D2 L U' L' R' B'",
      "U R' D2 L U2 L' D2 L U2 L' R U'",
      "L2 U' R B' R' F2 R B R' F2 U L2"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [FV] (缓冲 UBL, UBR(R) -> DBL(D))"
  },
  {
    "id": "chichu_c_fw",
    "code": "FW",
    "name": "彳亍角块 [FW] (UBL -> UBR -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [FW]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' U R D R' U' R D' R' B",
    "algs": [
      "B' U R D R' U' R D' R' B",
      "z U R D R' U' R D' R' z'",
      "B D L U L' D' L U' L' B'",
      "U' L U B D' B' U' B D B' L' U"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [FW] (缓冲 UBL, UBR(R) -> DBL(B))"
  },
  {
    "id": "chichu_c_fx",
    "code": "FX",
    "name": "彳亍角块 [FX] (UBL -> UBR -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [FX]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L2 U2 L D L' U2 L D' L",
    "algs": [
      "L2 U2 L D L' U2 L D' L",
      "L2 D' U2 F' D F U2 F' D' F D L2",
      "L2 D B' D B U2 B' D' B U2 D' L2",
      "L2 B' D2 B U2 B' D2 B U2 L2"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [FX] (缓冲 UBL, UBR(R) -> DBL(L))"
  },
  {
    "id": "chichu_c_gd",
    "code": "GD",
    "name": "彳亍角块 [GD] (UBL -> URF -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [GD]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L' R' D2 R U R' D2 R U' L",
    "algs": [
      "L' R' D2 R U R' D2 R U' L",
      "D L' R' D2 R U R' D2 R U' L D'",
      "D' L' R' D2 R U R' D2 R U' L D",
      "Lw' R' D2 R U R' D2 R U' Lw"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [GD] (缓冲 UBL, URF(U) -> UBR(U))"
  },
  {
    "id": "chichu_c_ge",
    "code": "GE",
    "name": "彳亍角块 [GE] (UBL -> URF -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [GE]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R' U2 L' D2 L U2 L' D2 L R",
    "algs": [
      "R' U2 L' D2 L U2 L' D2 L R",
      "D R' U2 L' D2 L U2 L' D2 L R D'",
      "D' R' U2 L' D2 L U2 L' D2 L R D",
      "Rw' U2 L' D2 L U2 L' D2 L Rw"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [GE] (缓冲 UBL, URF(U) -> UBR(B))"
  },
  {
    "id": "chichu_c_gf",
    "code": "GF",
    "name": "彳亍角块 [GF] (UBL -> URF -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [GF]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B U2 L' D' L U2 L' D L B'",
    "algs": [
      "B U2 L' D' L U2 L' D L B'",
      "B D' F D' F' U2 F D F' U2 D B'",
      "B F D2 F' U2 F D2 F' U2 B'",
      "U' L U2 F' D' F U2 F' D F L' U"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [GF] (缓冲 UBL, URF(U) -> UBR(R))"
  },
  {
    "id": "chichu_c_gj",
    "code": "GJ",
    "name": "彳亍角块 [GJ] (UBL -> URF -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [GJ]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R' U L' D2 L U' L' D2 L R",
    "algs": [
      "R' U L' D2 L U' L' D2 L R",
      "D R' U L' D2 L U' L' D2 L R D'",
      "D' R' U L' D2 L U' L' D2 L R D",
      "Rw' U L' D2 L U' L' D2 L Rw"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [GJ] (缓冲 UBL, URF(U) -> UFL(U))"
  },
  {
    "id": "chichu_c_gk",
    "code": "GK",
    "name": "彳亍角块 [GK] (UBL -> URF -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [GK]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L' R' D2 R U2 R' D2 R U2 L",
    "algs": [
      "L' R' D2 R U2 R' D2 R U2 L",
      "D L' R' D2 R U2 R' D2 R U2 L D'",
      "D' L' R' D2 R U2 R' D2 R U2 L D",
      "Lw' R' D2 R U2 R' D2 R U2 Lw"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [GK] (缓冲 UBL, URF(U) -> UFL(F))"
  },
  {
    "id": "chichu_c_gl",
    "code": "GL",
    "name": "彳亍角块 [GL] (UBL -> URF -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [GL]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F R' D' R U2 R' D R U2 F'",
    "algs": [
      "F R' D' R U2 R' D R U2 F'",
      "U' R U2 L D2 L' U2 L D2 L' R' U",
      "F D F D' F' U2 F D F' U2 D' F'",
      "U L F' D' F U2 F' D F U2 L' U'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [GL] (缓冲 UBL, URF(U) -> UFL(L))"
  },
  {
    "id": "chichu_c_gm",
    "code": "GM",
    "name": "彳亍角块 [GM] (UBL -> URF -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [GM]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U' F2 U F2 U2 R2 U R2 U L R F2 L' R'",
    "algs": [
      "U' F2 U F2 U2 R2 U R2 U L R F2 L' R'"
    ],
    "moves": 14,
    "desc": "三阶彳亍角块三循环 [GM] (缓冲 UBL, URF(U) -> DLF(D))"
  },
  {
    "id": "chichu_c_gn",
    "code": "GN",
    "name": "彳亍角块 [GN] (UBL -> URF -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [GN]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B D' B' U2 B D B' U2",
    "algs": [
      "B D' B' U2 B D B' U2",
      "D B D2 B' U2 B D2 B' U2 D'",
      "d B D2 B' U2 B D2 B' U2 d'",
      "Dw B D2 B' U2 B D2 B' U2 Dw'"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [GN] (缓冲 UBL, URF(U) -> DLF(F))"
  },
  {
    "id": "chichu_c_go",
    "code": "GO",
    "name": "彳亍角块 [GO] (UBL -> URF -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [GO]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U2 R' D R U2 R' D' R",
    "algs": [
      "U2 R' D R U2 R' D' R",
      "D' U2 R' D2 R U2 R' D2 R D",
      "d' U2 R' D2 R U2 R' D2 R d",
      "Dw' U2 R' D2 R U2 R' D2 R Dw"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [GO] (缓冲 UBL, URF(U) -> DLF(L))"
  },
  {
    "id": "chichu_c_gp",
    "code": "GP",
    "name": "彳亍角块 [GP] (UBL -> URF -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [GP]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F R2 B' R' F2 R B R' F2 R' F'",
    "algs": [
      "F R2 B' R' F2 R B R' F2 R' F'",
      "F2 D F2 L' B' L F2 L' B L D' F2",
      "R2 U' B2 L F L' B2 L F' L' U R2"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [GP] (缓冲 UBL, URF(U) -> DFR(D))"
  },
  {
    "id": "chichu_c_gq",
    "code": "GQ",
    "name": "彳亍角块 [GQ] (UBL -> URF -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [GQ]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L' D2 L U2 L' D2 L U2",
    "algs": [
      "L' D2 L U2 L' D2 L U2",
      "U2 F D F' U2 F D' F'",
      "y' F' D2 F U2 F' D2 F U2 y",
      "D2 B D B' U2 B D' B' U2 D2"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [GQ] (缓冲 UBL, URF(U) -> DFR(F))"
  },
  {
    "id": "chichu_c_gr",
    "code": "GR",
    "name": "彳亍角块 [GR] (UBL -> URF -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [GR]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U2 R' D' R U2 R' D R",
    "algs": [
      "U2 R' D' R U2 R' D R",
      "U' L D' L' U2 L D L' U'",
      "u U2 L D' L' U2 L D L' u'",
      "u' L D' L' U2 L D L' U2 u"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [GR] (缓冲 UBL, URF(U) -> DFR(R))"
  },
  {
    "id": "chichu_c_gs",
    "code": "GS",
    "name": "彳亍角块 [GS] (UBL -> URF -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [GS]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U B2 U L2 U2 L2 B2 U' L2 U L' R B2 L' R'",
    "algs": [
      "U B2 U L2 U2 L2 B2 U' L2 U L' R B2 L' R'"
    ],
    "moves": 15,
    "desc": "三阶彳亍角块三循环 [GS] (缓冲 UBL, URF(U) -> DBR(D))"
  },
  {
    "id": "chichu_c_gt",
    "code": "GT",
    "name": "彳亍角块 [GT] (UBL -> URF -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [GT]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U2 F D' F' U2 F D F'",
    "algs": [
      "U2 F D' F' U2 F D F'",
      "D U2 F D2 F' U2 F D2 F' D'",
      "d U2 F D2 F' U2 F D2 F' d'",
      "Dw U2 F D2 F' U2 F D2 F' Dw'"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [GT] (缓冲 UBL, URF(U) -> DBR(B))"
  },
  {
    "id": "chichu_c_gu",
    "code": "GU",
    "name": "彳亍角块 [GU] (UBL -> URF -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [GU]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L' D L U2 L' D' L U2",
    "algs": [
      "L' D L U2 L' D' L U2",
      "D' L' D2 L U2 L' D2 L U2 D",
      "d' L' D2 L U2 L' D2 L U2 d",
      "Dw' L' D2 L U2 L' D2 L U2 Dw"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [GU] (缓冲 UBL, URF(U) -> DBR(R))"
  },
  {
    "id": "chichu_c_gv",
    "code": "GV",
    "name": "彳亍角块 [GV] (UBL -> URF -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [GV]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B L B2 L F' L' B2 L F L2 B'",
    "algs": [
      "B L B2 L F' L' B2 L F L2 B'"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [GV] (缓冲 UBL, URF(U) -> DBL(D))"
  },
  {
    "id": "chichu_c_gw",
    "code": "GW",
    "name": "彳亍角块 [GW] (UBL -> URF -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [GW]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U2 R' D2 R U2 R' D2 R",
    "algs": [
      "U2 R' D2 R U2 R' D2 R",
      "y' L D L' U2 L D' L' U2 y",
      "D' L' D L U2 L' D' L U2 D",
      "d' L' D L U2 L' D' L U2 d"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [GW] (缓冲 UBL, URF(U) -> DBL(B))"
  },
  {
    "id": "chichu_c_gx",
    "code": "GX",
    "name": "彳亍角块 [GX] (UBL -> URF -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [GX]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L' D' L U2 L' D L U2",
    "algs": [
      "L' D' L U2 L' D L U2",
      "D' U2 F D' F' U2 F D F' D",
      "d' U2 F D' F' U2 F D F' d",
      "Dw' U2 F D' F' U2 F D F' Dw"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [GX] (缓冲 UBL, URF(U) -> DBL(L))"
  },
  {
    "id": "chichu_c_hd",
    "code": "HD",
    "name": "彳亍角块 [HD] (UBL -> URF -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [HD]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B2 D' B U' B' D B U B",
    "algs": [
      "B2 D' B U' B' D B U B",
      "R U B' D' B U' B' D B R'",
      "B' L B' D' B U' B' D B U L' B",
      "U L U' B' D2 B U B' D2 B L' U'"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [HD] (缓冲 UBL, URF(F) -> UBR(U))"
  },
  {
    "id": "chichu_c_he",
    "code": "HE",
    "name": "彳亍角块 [HE] (UBL -> URF -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [HE]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F' L R D2 R' U2 R D2 R' U2 L' F",
    "algs": [
      "F' L R D2 R' U2 R D2 R' U2 L' F",
      "F' L U2 F' D' F U2 F' D F L' F",
      "B' D B2 R' F' R B2 R' F R D' B",
      "R U' L F L' B2 L F' L' B2 U R'"
    ],
    "moves": 12,
    "desc": "三阶彳亍角块三循环 [HE] (缓冲 UBL, URF(F) -> UBR(B))"
  },
  {
    "id": "chichu_c_hf",
    "code": "HF",
    "name": "彳亍角块 [HF] (UBL -> URF -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [HF]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R' F' R B' R' F R B",
    "algs": [
      "R' F' R B' R' F R B",
      "D R' F' R B' R' F R B D'",
      "D' R' F' R B' R' F R B D",
      "Rw' F' R B' R' F R B R' Rw"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [HF] (缓冲 UBL, URF(F) -> UBR(R))"
  },
  {
    "id": "chichu_c_hj",
    "code": "HJ",
    "name": "彳亍角块 [HJ] (UBL -> URF -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [HJ]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L' U2 L' D' L U2 L' D L2",
    "algs": [
      "L' U2 L' D' L U2 L' D L2",
      "D L' U2 L' D' L U2 L' D L2 D'",
      "D' L' U2 L' D' L U2 L' D L2 D",
      "Lw' U2 L' D' L U2 L' D L Lw"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [HJ] (缓冲 UBL, URF(F) -> UFL(U))"
  },
  {
    "id": "chichu_c_hk",
    "code": "HK",
    "name": "彳亍角块 [HK] (UBL -> URF -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [HK]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "z R' D' R U R' D R U' z'",
    "algs": [
      "z R' D' R U R' D R U' z'",
      "x U' B D B' U B D' B' x'",
      "B' L B' D2 B U' B' D2 B U L' B",
      "z' L' U' L D L' U L D' z"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [HK] (缓冲 UBL, URF(F) -> UFL(F))"
  },
  {
    "id": "chichu_c_hl",
    "code": "HL",
    "name": "彳亍角块 [HL] (UBL -> URF -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [HL]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F2 D F' U2 F D' F' U2 F'",
    "algs": [
      "F2 D F' U2 F D' F' U2 F'",
      "U' R U2 F' D2 F U2 F' D2 F R' U",
      "U L U2 B' D2 B U2 B' D2 B L' U'",
      "F2 D2 R' U R D' R' U' R D' F2"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [HL] (缓冲 UBL, URF(F) -> UFL(L))"
  },
  {
    "id": "chichu_c_hm",
    "code": "HM",
    "name": "彳亍角块 [HM] (UBL -> URF -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [HM]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B2 D2 B U' B' D2 B U B",
    "algs": [
      "B2 D2 B U' B' D2 B U B",
      "F2 U' R D2 R' U2 R D2 R' U' F2",
      "F2 D R' D' R U2 R' D R U2 D' F2",
      "z L D' L' U2 L D L' U2 z'"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [HM] (缓冲 UBL, URF(F) -> DLF(D))"
  },
  {
    "id": "chichu_c_hn",
    "code": "HN",
    "name": "彳亍角块 [HN] (UBL -> URF -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [HN]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R U R D2 R' U' R D2 R2",
    "algs": [
      "R U R D2 R' U' R D2 R2",
      "Rw U R D2 R' U' R D2 R' Rw'",
      "B' L U R' D2 R U' R' D2 R L' B",
      "R B D' B' U' B D B' U R'"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [HN] (缓冲 UBL, URF(F) -> DLF(F))"
  },
  {
    "id": "chichu_c_ho",
    "code": "HO",
    "name": "彳亍角块 [HO] (UBL -> URF -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [HO]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F U L' D2 L U' L' D2 L F'",
    "algs": [
      "F U L' D2 L U' L' D2 L F'",
      "L' F D2 F' U' F D2 F' U L",
      "B' D' U F D2 F' U' F D2 F' D B",
      "U R' U F' D' F U' F' D F R U'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [HO] (缓冲 UBL, URF(F) -> DLF(L))"
  },
  {
    "id": "chichu_c_hp",
    "code": "HP",
    "name": "彳亍角块 [HP] (UBL -> URF -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [HP]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F D' F U' F' D F U F2",
    "algs": [
      "F D' F U' F' D F U F2",
      "F2 U B D' B' U' B D B' F2",
      "F2 D U B D2 B' U' B D2 B' D' F2",
      "U' L' U B' D B U' B' D' B L U"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [HP] (缓冲 UBL, URF(F) -> DFR(D))"
  },
  {
    "id": "chichu_c_hq",
    "code": "HQ",
    "name": "彳亍角块 [HQ] (UBL -> URF -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [HQ]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' U R' D' R U' R' D R B",
    "algs": [
      "B' U R' D' R U' R' D R B",
      "B' L U R' D' R U' R' D R L' B",
      "x U R' D2 R U' R' D2 R x'",
      "B' D U F D' F' U' F D F' D' B"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [HQ] (缓冲 UBL, URF(F) -> DFR(F))"
  },
  {
    "id": "chichu_c_hr",
    "code": "HR",
    "name": "彳亍角块 [HR] (UBL -> URF -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [HR]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U2 F' R B' R' F R B R' U2",
    "algs": [
      "U2 F' R B' R' F R B R' U2",
      "B' D' R B R' F2 R B' R' F2 D B",
      "L2 D' R B2 R' F2 R B2 R' F2 D L2",
      "U L' B L F2 L' B' L F2 U'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [HR] (缓冲 UBL, URF(F) -> DFR(R))"
  },
  {
    "id": "chichu_c_hs",
    "code": "HS",
    "name": "彳亍角块 [HS] (UBL -> URF -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [HS]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B2 L F' L' B2 L F L'",
    "algs": [
      "B2 L F' L' B2 L F L'",
      "Lw L' B2 L F' L' B2 L F Lw'",
      "B D F2 R B R' F2 R B' R' D' B'",
      "B' D R B R' F2 R B' R' F2 D' B"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [HS] (缓冲 UBL, URF(F) -> DBR(D))"
  },
  {
    "id": "chichu_c_ht",
    "code": "HT",
    "name": "彳亍角块 [HT] (UBL -> URF -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [HT]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' U F D2 F' U' F D2 F' B",
    "algs": [
      "B' U F D2 F' U' F D2 F' B",
      "B' R D' R' U' R D R' U B",
      "B' D R D2 R' U' R D2 R' U D' B",
      "D R L' D' L U' L' D L U R' D'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [HT] (缓冲 UBL, URF(F) -> DBR(B))"
  },
  {
    "id": "chichu_c_hu",
    "code": "HU",
    "name": "彳亍角块 [HU] (UBL -> URF -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [HU]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' U R' D2 R U' R' D2 R B",
    "algs": [
      "B' U R' D2 R U' R' D2 R B",
      "R B D2 B' U' B D2 B' U R'",
      "U' L' U B' D' B U' B' D B L U",
      "R D U B' D' B U' B' D B D' R'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [HU] (缓冲 UBL, URF(F) -> DBR(R))"
  },
  {
    "id": "chichu_c_hv",
    "code": "HV",
    "name": "彳亍角块 [HV] (UBL -> URF -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [HV]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D' B2 L F' L' B2 L F L' D",
    "algs": [
      "D' B2 L F' L' B2 L F L' D",
      "U L' R' F2 R B' R' F2 R B L U'",
      "R U B2 R' F' R B2 R' F R U' R'",
      "F2 U B2 R' F2 R B2 R' F2 R U' F2"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [HV] (缓冲 UBL, URF(F) -> DBL(D))"
  },
  {
    "id": "chichu_c_hw",
    "code": "HW",
    "name": "彳亍角块 [HW] (UBL -> URF -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [HW]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R B D B' U' B D' B' U R'",
    "algs": [
      "R B D B' U' B D' B' U R'",
      "U L U B' D2 B U' B' D2 B L' U'",
      "U' L' U B' D2 B U' B' D2 B L U",
      "R D U B' D2 B U' B' D2 B D' R'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [HW] (缓冲 UBL, URF(F) -> DBL(B))"
  },
  {
    "id": "chichu_c_hx",
    "code": "HX",
    "name": "彳亍角块 [HX] (UBL -> URF -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [HX]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' L F' L' B L F L'",
    "algs": [
      "B' L F' L' B L F L'",
      "L D L' B' L F' L' B L F D' L'",
      "L D' L' B' L F' L' B L F D L'",
      "Lw L' B' L F' L' B L F Lw'"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [HX] (缓冲 UBL, URF(F) -> DBL(L))"
  },
  {
    "id": "chichu_c_id",
    "code": "ID",
    "name": "彳亍角块 [ID] (UBL -> URF -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [ID]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B U2 B D B' U2 B D' B2",
    "algs": [
      "B U2 B D B' U2 B D' B2",
      "U' L B' D2 B U2 B' D2 B U2 L' U",
      "B2 D L' U L D L' U' L D2 B2",
      "B2 D2 R U R' D R U' R' D B2"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [ID] (缓冲 UBL, URF(R) -> UBR(U))"
  },
  {
    "id": "chichu_c_ie",
    "code": "IE",
    "name": "彳亍角块 [IE] (UBL -> URF -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [IE]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R2 D' R U2 R' D R U2 R",
    "algs": [
      "R2 D' R U2 R' D R U2 R",
      "D R2 D' R U2 R' D R U2 R D'",
      "D' R2 D' R U2 R' D R U2 R D",
      "Rw' R' D' R U2 R' D R U2 Rw"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [IE] (缓冲 UBL, URF(R) -> UBR(B))"
  },
  {
    "id": "chichu_c_if",
    "code": "IF",
    "name": "彳亍角块 [IF] (UBL -> URF -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [IF]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "z' U L' D' L U' L' D L z",
    "algs": [
      "z' U L' D' L U' L' D L z",
      "x' F D F' U' F D' F' U x",
      "F' R U' F' D2 F U F' D2 F R' F",
      "z D R' U' R D' R' U R z'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [IF] (缓冲 UBL, URF(R) -> UBR(R))"
  },
  {
    "id": "chichu_c_ij",
    "code": "IJ",
    "name": "彳亍角块 [IJ] (UBL -> URF -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [IJ]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R B' R' F R B R' F'",
    "algs": [
      "R B' R' F R B R' F'",
      "D R B' R' F R B R' F' D'",
      "D' R B' R' F R B R' F' D",
      "D2 R B' R' F R B R' F' D2"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [IJ] (缓冲 UBL, URF(R) -> UFL(U))"
  },
  {
    "id": "chichu_c_ik",
    "code": "IK",
    "name": "彳亍角块 [IK] (UBL -> URF -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [IK]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F' U' F' D' F U F' D F2",
    "algs": [
      "F' U' F' D' F U F' D F2",
      "L F' D' F U F' D F U' L'",
      "F' R U' F' D' F U F' D F R' F",
      "F' R' U' F' D' F U F' D F R F"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [IK] (缓冲 UBL, URF(R) -> UFL(F))"
  },
  {
    "id": "chichu_c_il",
    "code": "IL",
    "name": "彳亍角块 [IL] (UBL -> URF -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [IL]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' R U2 L D2 L' U2 L D2 L' R' B",
    "algs": [
      "B' R U2 L D2 L' U2 L D2 L' R' B",
      "B' R B' D' B U2 B' D B U2 R' B",
      "L U' F2 R B R' F2 R B' R' U L'",
      "F' D L' B' L F2 L' B L F2 D' F"
    ],
    "moves": 12,
    "desc": "三阶彳亍角块三循环 [IL] (缓冲 UBL, URF(R) -> UFL(L))"
  },
  {
    "id": "chichu_c_im",
    "code": "IM",
    "name": "彳亍角块 [IM] (UBL -> URF -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [IM]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F' B D2 B' U B D2 B' U' F",
    "algs": [
      "F' B D2 B' U B D2 B' U' F",
      "D L U' R' D' R U R' D R L' D'",
      "F' U' L D' L' U L D L' F",
      "F' D U' L D2 L' U L D2 L' D' F"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [IM] (缓冲 UBL, URF(R) -> DLF(D))"
  },
  {
    "id": "chichu_c_in",
    "code": "IN",
    "name": "彳亍角块 [IN] (UBL -> URF -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [IN]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F' L' D2 L U L' D2 L U' F",
    "algs": [
      "F' L' D2 L U L' D2 L U' F",
      "L U' F D2 F' U F D2 F' L'",
      "U' R' F' D' F U F' D F U' R U",
      "L D F' D' F U F' D F U' D' L'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [IN] (缓冲 UBL, URF(R) -> DLF(F))"
  },
  {
    "id": "chichu_c_io",
    "code": "IO",
    "name": "彳亍角块 [IO] (UBL -> URF -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [IO]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R B' R' F2 R B R' F2",
    "algs": [
      "R B' R' F2 R B R' F2",
      "B R B2 R' F2 R B2 R' F2 B'",
      "F' L' B' L F2 L' B L F'",
      "U' F L' B L F' L' B' L U"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [IO] (缓冲 UBL, URF(R) -> DLF(L))"
  },
  {
    "id": "chichu_c_ip",
    "code": "IP",
    "name": "彳亍角块 [IP] (UBL -> URF -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [IP]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R B' R' F' R B R' F",
    "algs": [
      "R B' R' F' R B R' F",
      "F' D F R B' R' F' R B R' D' F",
      "F' D' F R B' R' F' R B R' D F",
      "z' F R B2 R' F' R B2 R' z"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [IP] (缓冲 UBL, URF(R) -> DFR(D))"
  },
  {
    "id": "chichu_c_iq",
    "code": "IQ",
    "name": "彳亍角块 [IQ] (UBL -> URF -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [IQ]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D' R B' R' F2 R B R' F2 D",
    "algs": [
      "D' R B' R' F2 R B R' F2 D",
      "d' R B' R' F2 R B R' F2 d",
      "Dw' R B' R' F2 R B R' F2 Dw",
      "L U L' B' L F2 L' B L F2 U' L'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [IQ] (缓冲 UBL, URF(R) -> DFR(F))"
  },
  {
    "id": "chichu_c_ir",
    "code": "IR",
    "name": "彳亍角块 [IR] (UBL -> URF -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [IR]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L U' F D F' U F D' F' L'",
    "algs": [
      "L U' F D F' U F D' F' L'",
      "U R F' D2 F U F' D2 F U' R' U'",
      "U' R' F' D2 F U F' D2 F U' R U",
      "L D F' D2 F U F' D2 F U' D' L'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [IR] (缓冲 UBL, URF(R) -> DFR(R))"
  },
  {
    "id": "chichu_c_is",
    "code": "IS",
    "name": "彳亍角块 [IS] (UBL -> URF -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [IS]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L2 D2 L' U L D2 L' U' L'",
    "algs": [
      "L2 D2 L' U L D2 L' U' L'",
      "Lw L D2 L' U L D2 L' U' Lw'",
      "F' R L' D2 L U L' D2 L U' R' F",
      "L U' F D' F' U F D F' L'"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [IS] (缓冲 UBL, URF(R) -> DBR(D))"
  },
  {
    "id": "chichu_c_it",
    "code": "IT",
    "name": "彳亍角块 [IT] (UBL -> URF -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [IT]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B R' D2 R U R' D2 R U' B'",
    "algs": [
      "B R' D2 R U R' D2 R U' B'",
      "L U L' D L U L' D' L U2 L'",
      "F' D L' D' L U L' D L U' D' F",
      "L D F' D F U F' D' F U' D' L'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [IT] (缓冲 UBL, URF(R) -> DBR(B))"
  },
  {
    "id": "chichu_c_iu",
    "code": "IU",
    "name": "彳亍角块 [IU] (UBL -> URF -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [IU]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F' U' F' D2 F U F' D2 F2",
    "algs": [
      "F' U' F' D2 F U F' D2 F2",
      "z' U2 R D' R' U2 R D R' z",
      "B2 D' R' D' R U2 R' D R U2 D B2",
      "B2 U L D2 L' U2 L D2 L' U B2"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [IU] (缓冲 UBL, URF(R) -> DBR(R))"
  },
  {
    "id": "chichu_c_iv",
    "code": "IV",
    "name": "彳亍角块 [IV] (UBL -> URF -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [IV]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U B2 R' F R B2 R' F' R U'",
    "algs": [
      "U B2 R' F R B2 R' F' R U'",
      "D2 R B' R' F' R B R' F D2",
      "D' R L F2 L' B L F2 L' B' R' D",
      "U2 L F' L' B' L F L' B U2"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [IV] (缓冲 UBL, URF(R) -> DBL(D))"
  },
  {
    "id": "chichu_c_iw",
    "code": "IW",
    "name": "彳亍角块 [IW] (UBL -> URF -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [IW]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B2 U' B' D' B U B' D B'",
    "algs": [
      "B2 U' B' D' B U B' D B'",
      "B2 D U' R D' R' U R D R' D' B2",
      "L2 U' R D2 R' U' R D2 R' U2 L2",
      "L2 D R' D' R U' R' D R U D' L2"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [IW] (缓冲 UBL, URF(R) -> DBL(B))"
  },
  {
    "id": "chichu_c_ix",
    "code": "IX",
    "name": "彳亍角块 [IX] (UBL -> URF -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [IX]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F' L' D' L U L' D L U' F",
    "algs": [
      "F' L' D' L U L' D L U' F",
      "F' R L' D' L U L' D L U' R' F",
      "F' R' L' D' L U L' D L U' R F",
      "x' L' D2 L U L' D2 L U' x"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [IX] (缓冲 UBL, URF(R) -> DBL(L))"
  },
  {
    "id": "chichu_c_jd",
    "code": "JD",
    "name": "彳亍角块 [JD] (UBL -> UFL -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [JD]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R U' L D2 L' U L D2 L' R'",
    "algs": [
      "R U' L D2 L' U L D2 L' R'",
      "R D L' D' L U L' D L U' D' R'",
      "U' R' L' D2 L U L' D2 L U' R U",
      "R D' B D2 B' U B D2 B' U' D R'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [JD] (缓冲 UBL, UFL(U) -> UBR(U))"
  },
  {
    "id": "chichu_c_je",
    "code": "JE",
    "name": "彳亍角块 [JE] (UBL -> UFL -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [JE]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L U2 L D L' U2 L D' L2",
    "algs": [
      "L U2 L D L' U2 L D' L2",
      "D L U2 L D L' U2 L D' L2 D'",
      "D' L U2 L D L' U2 L D' L2 D",
      "Lw U2 L D L' U2 L D' L' Lw'"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [JE] (缓冲 UBL, UFL(U) -> UBR(B))"
  },
  {
    "id": "chichu_c_jf",
    "code": "JF",
    "name": "彳亍角块 [JF] (UBL -> UFL -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [JF]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R' F R B' R' F' R B",
    "algs": [
      "R' F R B' R' F' R B",
      "R' D F R B' R' F' R B R' D' R",
      "R' D' F R B' R' F' R B R' D R",
      "D R' F R B' R' F' R B D'"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [JF] (缓冲 UBL, UFL(U) -> UBR(R))"
  },
  {
    "id": "chichu_c_jg",
    "code": "JG",
    "name": "彳亍角块 [JG] (UBL -> UFL -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [JG]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R' L' D2 L U L' D2 L U' R",
    "algs": [
      "R' L' D2 L U L' D2 L U' R",
      "D R' L' D2 L U L' D2 L U' R D'",
      "D' R' L' D2 L U L' D2 L U' R D",
      "Rw' L' D2 L U L' D2 L U' Rw"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [JG] (缓冲 UBL, UFL(U) -> URF(U))"
  },
  {
    "id": "chichu_c_jh",
    "code": "JH",
    "name": "彳亍角块 [JH] (UBL -> UFL -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [JH]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L2 D' L U2 L' D L U2 L",
    "algs": [
      "L2 D' L U2 L' D L U2 L",
      "D L2 D' L U2 L' D L U2 L D'",
      "D' L2 D' L U2 L' D L U2 L D",
      "Lw' L' D' L U2 L' D L U2 Lw"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [JH] (缓冲 UBL, UFL(U) -> URF(F))"
  },
  {
    "id": "chichu_c_ji",
    "code": "JI",
    "name": "彳亍角块 [JI] (UBL -> UFL -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [JI]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F R B' R' F' R B R'",
    "algs": [
      "F R B' R' F' R B R'",
      "D F R B' R' F' R B R' D'",
      "D' F R B' R' F' R B R' D",
      "D2 F R B' R' F' R B R' D2"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [JI] (缓冲 UBL, UFL(U) -> URF(R))"
  },
  {
    "id": "chichu_c_jm",
    "code": "JM",
    "name": "彳亍角块 [JM] (UBL -> UFL -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [JM]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U2 F2 R B R' F2 R B' R' U2",
    "algs": [
      "U2 F2 R B R' F2 R B' R' U2",
      "F' R F2 R B' R' F2 R B R2 F",
      "D L' B' L F2 L' B L F2 D'",
      "R D L' B' L F2 L' B L F2 D' R'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [JM] (缓冲 UBL, UFL(U) -> DLF(D))"
  },
  {
    "id": "chichu_c_jn",
    "code": "JN",
    "name": "彳亍角块 [JN] (UBL -> UFL -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [JN]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U' F' D' F U F' D F",
    "algs": [
      "U' F' D' F U F' D F",
      "R U' F' D' F U F' D F R'",
      "R' U' F' D' F U F' D F R",
      "R2 U' F' D' F U F' D F R2"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [JN] (缓冲 UBL, UFL(U) -> DLF(F))"
  },
  {
    "id": "chichu_c_jo",
    "code": "JO",
    "name": "彳亍角块 [JO] (UBL -> UFL -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [JO]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U' L D L' U L D' L'",
    "algs": [
      "U' L D L' U L D' L'",
      "R U' L D L' U L D' L' R'",
      "R' U' L D L' U L D' L' R",
      "R2 U' L D L' U L D' L' R2"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [JO] (缓冲 UBL, UFL(U) -> DLF(L))"
  },
  {
    "id": "chichu_c_jp",
    "code": "JP",
    "name": "彳亍角块 [JP] (UBL -> UFL -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [JP]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L' B' L F2 L' B L F2",
    "algs": [
      "L' B' L F2 L' B L F2",
      "B' D B R' F R B' R' F' R D' B",
      "F R B' R' F2 R B R' F",
      "R' D B' L F L' B L F' L' D' R"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [JP] (缓冲 UBL, UFL(U) -> DFR(D))"
  },
  {
    "id": "chichu_c_jq",
    "code": "JQ",
    "name": "彳亍角块 [JQ] (UBL -> UFL -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [JQ]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L' D2 L U L' D2 L U'",
    "algs": [
      "L' D2 L U L' D2 L U'",
      "U2 F D F' U F D' F' U",
      "B' R F' D2 F U F' D2 F U' R' B",
      "y' F' D2 F U F' D2 F U' y"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [JQ] (缓冲 UBL, UFL(U) -> DFR(F))"
  },
  {
    "id": "chichu_c_jr",
    "code": "JR",
    "name": "彳亍角块 [JR] (UBL -> UFL -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [JR]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U' L D' L' U L D L'",
    "algs": [
      "U' L D' L' U L D L'",
      "u' L D' L' U L D L' U' u",
      "Uw' L D' L' U L D L' U' Uw",
      "y' L D2 L' U L D2 L' U' y"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [JR] (缓冲 UBL, UFL(U) -> DFR(R))"
  },
  {
    "id": "chichu_c_js",
    "code": "JS",
    "name": "彳亍角块 [JS] (UBL -> UFL -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [JS]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B2 L F L' B2 L F' L'",
    "algs": [
      "B2 L F L' B2 L F' L'",
      "Lw L' B2 L F L' B2 L F' Lw'",
      "F D' R B' R' F' R B R' F D F'",
      "y2 F2 R B R' F2 R B' R' y2"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [JS] (缓冲 UBL, UFL(U) -> DBR(D))"
  },
  {
    "id": "chichu_c_jt",
    "code": "JT",
    "name": "彳亍角块 [JT] (UBL -> UFL -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [JT]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U' L D2 L' U L D2 L'",
    "algs": [
      "U' L D2 L' U L D2 L'",
      "u' L D2 L' U L D2 L' U' u",
      "Uw' L D2 L' U L D2 L' U' Uw",
      "D' R' L' D L U L' D' L U' R D"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [JT] (缓冲 UBL, UFL(U) -> DBR(B))"
  },
  {
    "id": "chichu_c_ju",
    "code": "JU",
    "name": "彳亍角块 [JU] (UBL -> UFL -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [JU]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L' D L U L' D' L U'",
    "algs": [
      "L' D L U L' D' L U'",
      "D' L' D2 L U L' D2 L U' D",
      "d' L' D2 L U L' D2 L U' d",
      "Dw' L' D2 L U L' D2 L U' Dw"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [JU] (缓冲 UBL, UFL(U) -> DBR(R))"
  },
  {
    "id": "chichu_c_jv",
    "code": "JV",
    "name": "彳亍角块 [JV] (UBL -> UFL -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [JV]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D' B2 L F L' B2 L F' L' D",
    "algs": [
      "D' B2 L F L' B2 L F' L' D",
      "D2 L' B' L F2 L' B L F2 D2",
      "U2 R' F' R B2 R' F R B2 U2",
      "R D' B2 L F L' B2 L F' L' D R'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [JV] (缓冲 UBL, UFL(U) -> DBL(D))"
  },
  {
    "id": "chichu_c_jw",
    "code": "JW",
    "name": "彳亍角块 [JW] (UBL -> UFL -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [JW]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U' F' D F U F' D' F",
    "algs": [
      "U' F' D F U F' D' F",
      "R U' F' D F U F' D' F R'",
      "R' U' F' D F U F' D' F R",
      "R2 U' F' D F U F' D' F R2"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [JW] (缓冲 UBL, UFL(U) -> DBL(B))"
  },
  {
    "id": "chichu_c_jx",
    "code": "JX",
    "name": "彳亍角块 [JX] (UBL -> UFL -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [JX]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L' D' L U L' D L U'",
    "algs": [
      "L' D' L U L' D L U'",
      "R L' D' L U L' D L U' R'",
      "R' L' D' L U L' D L U' R",
      "R2 L' D' L U L' D L U' R2"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [JX] (缓冲 UBL, UFL(U) -> DBL(L))"
  },
  {
    "id": "chichu_c_kd",
    "code": "KD",
    "name": "彳亍角块 [KD] (UBL -> UFL -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [KD]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B U B D B' U' B D' B2",
    "algs": [
      "B U B D B' U' B D' B2",
      "L' B D B' U' B D' B' U L",
      "B R U B D B' U' B D' B' R' B'",
      "U' R' B D2 B' U B D2 B' U' R U"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [KD] (缓冲 UBL, UFL(F) -> UBR(U))"
  },
  {
    "id": "chichu_c_ke",
    "code": "KE",
    "name": "彳亍角块 [KE] (UBL -> UFL -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [KE]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L R D2 R' U2 R D2 R' U2 L'",
    "algs": [
      "L R D2 R' U2 R D2 R' U2 L'",
      "D L R D2 R' U2 R D2 R' U2 L' D'",
      "D' L R D2 R' U2 R D2 R' U2 L' D",
      "Lw R D2 R' U2 R D2 R' U2 Lw'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [KE] (缓冲 UBL, UFL(F) -> UBR(B))"
  },
  {
    "id": "chichu_c_kf",
    "code": "KF",
    "name": "彳亍角块 [KF] (UBL -> UFL -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [KF]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "x' U F' D' F U' F' D F x",
    "algs": [
      "x' U F' D' F U' F' D F x",
      "B L U B D' B' U' B D B' L' B'",
      "z R D R' U' R D' R' U z'",
      "F L' U' R D' R' U R D R' L F'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [KF] (缓冲 UBL, UFL(F) -> UBR(R))"
  },
  {
    "id": "chichu_c_kg",
    "code": "KG",
    "name": "彳亍角块 [KG] (UBL -> UFL -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [KG]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L' U2 R' D2 R U2 R' D2 R L",
    "algs": [
      "L' U2 R' D2 R U2 R' D2 R L",
      "D L' U2 R' D2 R U2 R' D2 R L D'",
      "D' L' U2 R' D2 R U2 R' D2 R L D",
      "Lw' U2 R' D2 R U2 R' D2 R Lw"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [KG] (缓冲 UBL, UFL(F) -> URF(U))"
  },
  {
    "id": "chichu_c_kh",
    "code": "KH",
    "name": "彳亍角块 [KH] (UBL -> UFL -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [KH]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "z U R' D' R U' R' D R z'",
    "algs": [
      "z U R' D' R U' R' D R z'",
      "x B D B' U' B D' B' U x'",
      "B' L U' B' D2 B U B' D2 B L' B",
      "z' D L' U' L D' L' U L z"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [KH] (缓冲 UBL, UFL(F) -> URF(F))"
  },
  {
    "id": "chichu_c_ki",
    "code": "KI",
    "name": "彳亍角块 [KI] (UBL -> UFL -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [KI]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F2 D' F U' F' D F U F",
    "algs": [
      "F2 D' F U' F' D F U F",
      "L U F' D' F U' F' D F L'",
      "F' R F' D' F U' F' D F U R' F",
      "F' R' F' D' F U' F' D F U R F"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [KI] (缓冲 UBL, UFL(F) -> URF(R))"
  },
  {
    "id": "chichu_c_km",
    "code": "KM",
    "name": "彳亍角块 [KM] (UBL -> UFL -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [KM]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F' D F' U2 F D' F' U2 F2",
    "algs": [
      "F' D F' U2 F D' F' U2 F2",
      "F2 U' B' D B U2 B' D' B U' F2",
      "F' D2 R' U R D' R' U' R D' F",
      "F' D' L U L' D' L U' L' D2 F"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [KM] (缓冲 UBL, UFL(F) -> DLF(D))"
  },
  {
    "id": "chichu_c_kn",
    "code": "KN",
    "name": "彳亍角块 [KN] (UBL -> UFL -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [KN]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L' U' F' D F U F' D' F L",
    "algs": [
      "L' U' F' D F U F' D' F L",
      "L' B D B' U B D' B' U' L",
      "Lw' B D B' U B D' B' U' Lw",
      "x B D B' U B D' B' U' x'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [KN] (缓冲 UBL, UFL(F) -> DLF(F))"
  },
  {
    "id": "chichu_c_ko",
    "code": "KO",
    "name": "彳亍角块 [KO] (UBL -> UFL -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [KO]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F L' U2 L' D' L U2 L' D L2 F'",
    "algs": [
      "F L' U2 L' D' L U2 L' D L2 F'",
      "F L' F D2 F' U2 F D2 F' U2 L F'",
      "U' L2 U2 L' D' L U2 L' D L' U",
      "D L' R U2 R' D2 R U2 R' D2 L D'"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [KO] (缓冲 UBL, UFL(F) -> DLF(L))"
  },
  {
    "id": "chichu_c_kp",
    "code": "KP",
    "name": "彳亍角块 [KP] (UBL -> UFL -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [KP]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F2 U L' D2 L U' L' D2 L F2",
    "algs": [
      "F2 U L' D2 L U' L' D2 L F2",
      "F2 U2 B' D B U' B' D' B U' F2",
      "F R U B' D2 B U' B' D2 B R' F'",
      "z R D2 R' U' R D2 R' U z'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [KP] (缓冲 UBL, UFL(F) -> DFR(D))"
  },
  {
    "id": "chichu_c_kq",
    "code": "KQ",
    "name": "彳亍角块 [KQ] (UBL -> UFL -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [KQ]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "x U2 R' D2 R U2 R' D2 R x'",
    "algs": [
      "x U2 R' D2 R U2 R' D2 R x'",
      "x B D B' U2 B D' B' U2 x'",
      "L' U' R U' R' D2 R U R' D2 U L",
      "L' R U2 R' D2 R U2 R' D2 L"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [KQ] (缓冲 UBL, UFL(F) -> DFR(F))"
  },
  {
    "id": "chichu_c_kr",
    "code": "KR",
    "name": "彳亍角块 [KR] (UBL -> UFL -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [KR]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "z U R' D R U' R' D' R z'",
    "algs": [
      "z U R' D R U' R' D' R z'",
      "B R F' D F U F' D' F U' R' B'",
      "D' L' B D B' U B D' B' U' L D",
      "B R U' R' D2 R U R' D2 B'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [KR] (缓冲 UBL, UFL(F) -> DFR(R))"
  },
  {
    "id": "chichu_c_ks",
    "code": "KS",
    "name": "彳亍角块 [KS] (UBL -> UFL -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [KS]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "x' R D2 R' U2 R D2 R' U2 x",
    "algs": [
      "x' R D2 R' U2 R D2 R' U2 x",
      "x' U2 F' D' F U2 F' D F x",
      "F' L D' R' U2 R D R' U2 R L' F",
      "x R U2 R' D2 R U2 R' D2 x'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [KS] (缓冲 UBL, UFL(F) -> DBR(D))"
  },
  {
    "id": "chichu_c_kt",
    "code": "KT",
    "name": "彳亍角块 [KT] (UBL -> UFL -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [KT]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F' D2 R' U R D2 R' U' R F",
    "algs": [
      "F' D2 R' U R D2 R' U' R F",
      "B L R D2 R' U R D2 R' U' L' B'",
      "z U F D2 F' U' F D2 F' z'",
      "D L B D' B' U B D B' U' L' D'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [KT] (缓冲 UBL, UFL(F) -> DBR(B))"
  },
  {
    "id": "chichu_c_ku",
    "code": "KU",
    "name": "彳亍角块 [KU] (UBL -> UFL -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [KU]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "z U R' D2 R U' R' D2 R z'",
    "algs": [
      "z U R' D2 R U' R' D2 R z'",
      "B2 L D2 L' U' L D2 L' U B2",
      "B2 D U L' D' L U' L' D L D' B2",
      "B2 D' U B D2 B' U' B D2 B' D B2"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [KU] (缓冲 UBL, UFL(F) -> DBR(R))"
  },
  {
    "id": "chichu_c_kv",
    "code": "KV",
    "name": "彳亍角块 [KV] (UBL -> UFL -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [KV]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' L2 D L' U2 L D' L' U2 L' B",
    "algs": [
      "B' L2 D L' U2 L D' L' U2 L' B",
      "B' L U2 B' D2 B U2 B' D2 B L' B",
      "U L' D L' U2 L D' L' U2 L2 U'",
      "B R2 U' R' D2 R U R' D2 R' B'"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [KV] (缓冲 UBL, UFL(F) -> DBL(D))"
  },
  {
    "id": "chichu_c_kw",
    "code": "KW",
    "name": "彳亍角块 [KW] (UBL -> UFL -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [KW]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B2 U2 B' D' B U2 B' D B'",
    "algs": [
      "B2 U2 B' D' B U2 B' D B'",
      "B D2 L' U' L D' L' U L D' B'",
      "B D' R U' R' D' R U R' D2 B'",
      "F2 U' R U' R' D2 R U R' D2 U F2"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [KW] (缓冲 UBL, UFL(F) -> DBL(B))"
  },
  {
    "id": "chichu_c_kx",
    "code": "KX",
    "name": "彳亍角块 [KX] (UBL -> UFL -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [KX]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F' D' L U L' D L U' L' F",
    "algs": [
      "F' D' L U L' D L U' L' F",
      "L U' F' D' F U F' D F L'",
      "D L' B D B' U B D' B' U' L D'",
      "L B D' B' U B D B' U' L'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [KX] (缓冲 UBL, UFL(F) -> DBL(L))"
  },
  {
    "id": "chichu_c_ld",
    "code": "LD",
    "name": "彳亍角块 [LD] (UBL -> UFL -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [LD]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B2 D' B U2 B' D B U2 B",
    "algs": [
      "B2 D' B U2 B' D B U2 B",
      "B2 U' L U2 L' D L U2 L' D' U B2",
      "B2 D L' U' L D L' U L D2 B2",
      "B2 D2 R U' R' D R U R' D B2"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [LD] (缓冲 UBL, UFL(L) -> UBR(U))"
  },
  {
    "id": "chichu_c_le",
    "code": "LE",
    "name": "彳亍角块 [LE] (UBL -> UFL -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [LE]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F R' U2 L' D2 L U2 L' D2 L R F'",
    "algs": [
      "F R' U2 L' D2 L U2 L' D2 L R F'",
      "F R' F D F' U2 F D' F' U2 R F'",
      "L' U B2 R' F' R B2 R' F R U' L",
      "B D' L F L' B2 L F' L' B2 D B'"
    ],
    "moves": 12,
    "desc": "三阶彳亍角块三循环 [LE] (缓冲 UBL, UFL(L) -> UBR(B))"
  },
  {
    "id": "chichu_c_lf",
    "code": "LF",
    "name": "彳亍角块 [LF] (UBL -> UFL -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [LF]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' R D R' U2 R D' R' U2 B",
    "algs": [
      "B' R D R' U2 R D' R' U2 B",
      "U' L' U2 R' D2 R U2 R' D2 R L U",
      "U R' U2 L' D2 L U2 L' D2 L R U'",
      "U R' F D F' U2 F D' F' U2 R U'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [LF] (缓冲 UBL, UFL(L) -> UBR(R))"
  },
  {
    "id": "chichu_c_lg",
    "code": "LG",
    "name": "彳亍角块 [LG] (UBL -> UFL -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [LG]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F U2 R' D' R U2 R' D R F'",
    "algs": [
      "F U2 R' D' R U2 R' D R F'",
      "U' R L D2 L' U2 L D2 L' U2 R' U",
      "F D U2 F D' F' U2 F D F' D' F'",
      "U L U2 F' D' F U2 F' D F L' U'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [LG] (缓冲 UBL, UFL(L) -> URF(U))"
  },
  {
    "id": "chichu_c_lh",
    "code": "LH",
    "name": "彳亍角块 [LH] (UBL -> UFL -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [LH]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F U2 F D F' U2 F D' F2",
    "algs": [
      "F U2 F D F' U2 F D' F2",
      "U' R F' D2 F U2 F' D2 F U2 R' U",
      "U L B' D2 B U2 B' D2 B U2 L' U'",
      "F2 D R' U R D R' U' R D2 F2"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [LH] (缓冲 UBL, UFL(L) -> URF(F))"
  },
  {
    "id": "chichu_c_li",
    "code": "LI",
    "name": "彳亍角块 [LI] (UBL -> UFL -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [LI]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' R L D2 L' U2 L D2 L' U2 R' B",
    "algs": [
      "B' R L D2 L' U2 L D2 L' U2 R' B",
      "B' R U2 B' D' B U2 B' D B R' B",
      "L U' R B R' F2 R B' R' F2 U L'",
      "F' D F2 L' B' L F2 L' B L D' F"
    ],
    "moves": 12,
    "desc": "三阶彳亍角块三循环 [LI] (缓冲 UBL, UFL(L) -> URF(R))"
  },
  {
    "id": "chichu_c_lm",
    "code": "LM",
    "name": "彳亍角块 [LM] (UBL -> UFL -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [LM]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B2 D2 B U2 B' D2 B U2 B",
    "algs": [
      "B2 D2 B U2 B' D2 B U2 B",
      "B' U2 L D L' U2 L D' L' B",
      "B2 D R U' R' D2 R U R' D B2",
      "B2 L' U' L D2 L' U L D2 B2"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [LM] (缓冲 UBL, UFL(L) -> DLF(D))"
  },
  {
    "id": "chichu_c_ln",
    "code": "LN",
    "name": "彳亍角块 [LN] (UBL -> UFL -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [LN]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U' R U2 R D2 R' U2 R D2 R2 U",
    "algs": [
      "U' R U2 R D2 R' U2 R D2 R2 U",
      "F L' R' D2 R U2 R' D2 R U2 L F'",
      "U' R F' D' F U2 F' D F U2 R' U",
      "F L' U2 B D B' U2 B D' B' L F'"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [LN] (缓冲 UBL, UFL(L) -> DLF(F))"
  },
  {
    "id": "chichu_c_lo",
    "code": "LO",
    "name": "彳亍角块 [LO] (UBL -> UFL -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [LO]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' R D2 R' U2 R D2 R' U2 B",
    "algs": [
      "B' R D2 R' U2 R D2 R' U2 B",
      "U' R L D L' U2 L D' L' U2 R' U",
      "B' D U2 L D' L' U2 L D L' D' B",
      "B' U2 F' D' F U2 F' D F B"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [LO] (缓冲 UBL, UFL(L) -> DLF(L))"
  },
  {
    "id": "chichu_c_lp",
    "code": "LP",
    "name": "彳亍角块 [LP] (UBL -> UFL -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [LP]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B2 D B U2 B' D' B U2 B",
    "algs": [
      "B2 D B U2 B' D' B U2 B",
      "B' D' B' D2 B U2 B' D2 B U2 D B",
      "B2 R U' R' D' R U R' D B2",
      "F U2 R' D R U2 R' D' R F'"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [LP] (缓冲 UBL, UFL(L) -> DFR(D))"
  },
  {
    "id": "chichu_c_lq",
    "code": "LQ",
    "name": "彳亍角块 [LQ] (UBL -> UFL -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [LQ]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' U2 L D' L' U2 L D L' B",
    "algs": [
      "B' U2 L D' L' U2 L D L' B",
      "B' D U2 L D2 L' U2 L D2 L' D' B",
      "U R' U2 L' D L U2 L' D' L R U'",
      "F D' L' D' L U2 L' D L U2 D F'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [LQ] (缓冲 UBL, UFL(L) -> DFR(F))"
  },
  {
    "id": "chichu_c_lr",
    "code": "LR",
    "name": "彳亍角块 [LR] (UBL -> UFL -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [LR]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U L U2 L D' L' U2 L D L2 U'",
    "algs": [
      "U L U2 L D' L' U2 L D L2 U'",
      "U R' F D' F' U2 F D F' U2 R U'",
      "U R B2 L F' L' B2 L F L' R' U'"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [LR] (缓冲 UBL, UFL(L) -> DFR(R))"
  },
  {
    "id": "chichu_c_ls",
    "code": "LS",
    "name": "彳亍角块 [LS] (UBL -> UFL -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [LS]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U' L2 D L U2 L' D' L U2 L U",
    "algs": [
      "U' L2 D L U2 L' D' L U2 L U",
      "U' R U2 B' D B U2 B' D' B R' U",
      "U' R' L' B L F2 L' B' L F2 R U"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [LS] (缓冲 UBL, UFL(L) -> DBR(D))"
  },
  {
    "id": "chichu_c_lt",
    "code": "LT",
    "name": "彳亍角块 [LT] (UBL -> UFL -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [LT]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F U2 F D' F' U2 F D F2",
    "algs": [
      "F U2 F D' F' U2 F D F2",
      "F D U2 F D2 F' U2 F D2 F' D' F'",
      "B' D U2 F' D' F U2 F' D F D' B",
      "F D' B D2 B' U2 B D2 B' U2 D F'"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [LT] (缓冲 UBL, UFL(L) -> DBR(B))"
  },
  {
    "id": "chichu_c_lu",
    "code": "LU",
    "name": "彳亍角块 [LU] (UBL -> UFL -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [LU]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F L' D L U2 L' D' L U2 F'",
    "algs": [
      "F L' D L U2 L' D' L U2 F'",
      "F D' L' D2 L U2 L' D2 L U2 D F'",
      "F D' U2 F D F' U2 F D' F' D F'",
      "U' L' U2 F D' F' U2 F D F' L U"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [LU] (缓冲 UBL, UFL(L) -> DBR(R))"
  },
  {
    "id": "chichu_c_lv",
    "code": "LV",
    "name": "彳亍角块 [LV] (UBL -> UFL -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [LV]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U R2 D2 R U2 R' D2 R U2 R U'",
    "algs": [
      "U R2 D2 R U2 R' D2 R U2 R U'",
      "B' L F' D' F U2 F' D F U2 L' B",
      "U R' U2 B D B' U2 B D' B' R U'",
      "U L' R' F2 R B2 R' F2 R B2 L U'"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [LV] (缓冲 UBL, UFL(L) -> DBL(D))"
  },
  {
    "id": "chichu_c_lw",
    "code": "LW",
    "name": "彳亍角块 [LW] (UBL -> UFL -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [LW]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F U2 R' D2 R U2 R' D2 R F'",
    "algs": [
      "F U2 R' D2 R U2 R' D2 R F'",
      "F D' L' D L U2 L' D' L U2 D F'",
      "U R' U2 L' D' L U2 L' D L R U'",
      "U R' F D2 F' U2 F D2 F' U2 R U'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [LW] (缓冲 UBL, UFL(L) -> DBL(B))"
  },
  {
    "id": "chichu_c_lx",
    "code": "LX",
    "name": "彳亍角块 [LX] (UBL -> UFL -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [LX]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F U2 F D2 F' U2 F D2 F2",
    "algs": [
      "F U2 F D2 F' U2 F D2 F2",
      "B2 D F' D F U2 F' D' F U2 D' B2",
      "B2 F' D2 F U2 F' D2 F U2 B2",
      "U' L' B D' B' U2 B D B' U2 L U"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [LX] (缓冲 UBL, UFL(L) -> DBL(L))"
  },
  {
    "id": "chichu_c_md",
    "code": "MD",
    "name": "彳亍角块 [MD] (UBL -> DLF -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [MD]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F' U' B D2 B' U B D2 B' F",
    "algs": [
      "F' U' B D2 B' U B D2 B' F",
      "z U2 L D2 L' U2 L D2 L' z'",
      "z B' D' B U2 B' D B U2 z'",
      "z' D2 R U2 R' D2 R U2 R' z"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [MD] (缓冲 UBL, DLF(D) -> UBR(U))"
  },
  {
    "id": "chichu_c_me",
    "code": "ME",
    "name": "彳亍角块 [ME] (UBL -> DLF -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [ME]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D L U2 L D' L' U2 L D L2 D'",
    "algs": [
      "D L U2 L D' L' U2 L D L2 D'",
      "F' R' U2 L' D L U2 L' D' L R F",
      "D R' F D' F' U2 F D F' U2 R D'",
      "F' L B' D B U2 B' D' B U2 L' F"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [ME] (缓冲 UBL, DLF(D) -> UBR(B))"
  },
  {
    "id": "chichu_c_mf",
    "code": "MF",
    "name": "彳亍角块 [MF] (UBL -> DLF -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [MF]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "z R D R' U2 R D' R' U2 z'",
    "algs": [
      "z R D R' U2 R D' R' U2 z'",
      "z U2 F' D2 F U2 F' D2 F z'",
      "B' D2 R' U' R D2 R' U R B",
      "z' L U L' D2 L U' L' D2 z"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [MF] (缓冲 UBL, DLF(D) -> UBR(R))"
  },
  {
    "id": "chichu_c_mg",
    "code": "MG",
    "name": "彳亍角块 [MG] (UBL -> DLF -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [MG]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U F2 U R2 U2 R2 F2 U' R2 U L R' F2 L' R'",
    "algs": [
      "U F2 U R2 U2 R2 F2 U' R2 U L R' F2 L' R'"
    ],
    "moves": 15,
    "desc": "三阶彳亍角块三循环 [MG] (缓冲 UBL, DLF(D) -> URF(U))"
  },
  {
    "id": "chichu_c_mh",
    "code": "MH",
    "name": "彳亍角块 [MH] (UBL -> DLF -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [MH]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' U' B' D2 B U B' D2 B2",
    "algs": [
      "B' U' B' D2 B U B' D2 B2",
      "F2 U R D2 R' U2 R D2 R' U F2",
      "F2 D U2 R' D' R U2 R' D R D' F2",
      "z U2 L D' L' U2 L D L' z'"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [MH] (缓冲 UBL, DLF(D) -> URF(F))"
  },
  {
    "id": "chichu_c_mi",
    "code": "MI",
    "name": "彳亍角块 [MI] (UBL -> DLF -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [MI]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F' U B D2 B' U' B D2 B' F",
    "algs": [
      "F' U B D2 B' U' B D2 B' F",
      "D L R' D' R U' R' D R U L' D'",
      "F' L D' L' U' L D L' U F",
      "F' D L D2 L' U' L D2 L' U D' F"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [MI] (缓冲 UBL, DLF(D) -> URF(R))"
  },
  {
    "id": "chichu_c_mj",
    "code": "MJ",
    "name": "彳亍角块 [MJ] (UBL -> DLF -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [MJ]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U2 R B R' F2 R B' R' F2 U2",
    "algs": [
      "U2 R B R' F2 R B' R' F2 U2",
      "F' R2 B' R' F2 R B R' F2 R' F",
      "D F2 L' B' L F2 L' B L D'",
      "R D F2 L' B' L F2 L' B L D' R'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [MJ] (缓冲 UBL, DLF(D) -> UFL(U))"
  },
  {
    "id": "chichu_c_mk",
    "code": "MK",
    "name": "彳亍角块 [MK] (UBL -> DLF -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [MK]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F2 U2 F D F' U2 F D' F",
    "algs": [
      "F2 U2 F D F' U2 F D' F",
      "F2 U B' D B U2 B' D' B U F2",
      "F' D R' U R D R' U' R D2 F",
      "F' D2 L U L' D L U' L' D F"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [MK] (缓冲 UBL, DLF(D) -> UFL(F))"
  },
  {
    "id": "chichu_c_ml",
    "code": "ML",
    "name": "彳亍角块 [ML] (UBL -> DLF -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [ML]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' U2 B' D2 B U2 B' D2 B2",
    "algs": [
      "B' U2 B' D2 B U2 B' D2 B2",
      "B' L D L' U2 L D' L' U2 B",
      "B2 D' R U' R' D2 R U R' D' B2",
      "B2 D2 L' U' L D2 L' U L B2"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [ML] (缓冲 UBL, DLF(D) -> UFL(L))"
  },
  {
    "id": "chichu_c_mp",
    "code": "MP",
    "name": "彳亍角块 [MP] (UBL -> DLF -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [MP]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "z R D2 R' U2 R D2 R' U2 z'",
    "algs": [
      "z R D2 R' U2 R D2 R' U2 z'",
      "z U2 F' D' F U2 F' D F z'",
      "B' D2 R' U' R D' R' U R D' B",
      "D L D R' U2 R D' R' U2 R L' D'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [MP] (缓冲 UBL, DLF(D) -> DFR(D))"
  },
  {
    "id": "chichu_c_mq",
    "code": "MQ",
    "name": "彳亍角块 [MQ] (UBL -> DLF -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [MQ]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U L2 U' L' D2 L U L' D2 L' U'",
    "algs": [
      "U L2 U' L' D2 L U L' D2 L' U'"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [MQ] (缓冲 UBL, DLF(D) -> DFR(F))"
  },
  {
    "id": "chichu_c_mr",
    "code": "MR",
    "name": "彳亍角块 [MR] (UBL -> DLF -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [MR]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F' R' D' R U2 R' D R U2 F",
    "algs": [
      "F' R' D' R U2 R' D R U2 F",
      "z U2 L D L' U2 L D' L' z'",
      "F' D F D' F' U2 F D F' U2 D' F",
      "F' D' U2 B D' B' U2 B D B' D F"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [MR] (缓冲 UBL, DLF(D) -> DFR(R))"
  },
  {
    "id": "chichu_c_ms",
    "code": "MS",
    "name": "彳亍角块 [MS] (UBL -> DLF -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [MS]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U' L2 U' L2 U2 B2 U' B2 U L R B2 L' R'",
    "algs": [
      "U' L2 U' L2 U2 B2 U' B2 U L R B2 L' R'"
    ],
    "moves": 14,
    "desc": "三阶彳亍角块三循环 [MS] (缓冲 UBL, DLF(D) -> DBR(D))"
  },
  {
    "id": "chichu_c_mt",
    "code": "MT",
    "name": "彳亍角块 [MT] (UBL -> DLF -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [MT]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F2 U2 F D' F' U2 F D F",
    "algs": [
      "F2 U2 F D' F' U2 F D F",
      "F2 D U2 F D2 F' U2 F D2 F' D' F2",
      "F2 D' B D2 B' U2 B D2 B' U2 D F2",
      "F2 U B' D' B U2 B' D B U F2"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [MT] (缓冲 UBL, DLF(D) -> DBR(B))"
  },
  {
    "id": "chichu_c_mu",
    "code": "MU",
    "name": "彳亍角块 [MU] (UBL -> DLF -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [MU]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' D' L U' L' D L U L' B",
    "algs": [
      "B' D' L U' L' D L U L' B",
      "U R' B' D2 B U' B' D2 B U R U'",
      "F2 U R D R' U2 R D' R' U F2",
      "F2 D U2 R' D2 R U2 R' D2 R D' F2"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [MU] (缓冲 UBL, DLF(D) -> DBR(R))"
  },
  {
    "id": "chichu_c_mv",
    "code": "MV",
    "name": "彳亍角块 [MV] (UBL -> DLF -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [MV]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' L U2 R D' R' U2 R D R' L' B",
    "algs": [
      "B' L U2 R D' R' U2 R D R' L' B",
      "U R' D' L U2 L' D L U2 L' R U'",
      "L2 D L' B' L F2 L' B L F2 D' L2"
    ],
    "moves": 12,
    "desc": "三阶彳亍角块三循环 [MV] (缓冲 UBL, DLF(D) -> DBL(D))"
  },
  {
    "id": "chichu_c_mw",
    "code": "MW",
    "name": "彳亍角块 [MW] (UBL -> DLF -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [MW]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' U B' D2 B U' B' D2 B2",
    "algs": [
      "B' U B' D2 B U' B' D2 B2",
      "B' D L' D2 L U' L' D2 L U D' B",
      "U L B D B' U' B D' B' U L' U'",
      "B' D' B D B' U' B D' B' U D B"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [MW] (缓冲 UBL, DLF(D) -> DBL(B))"
  },
  {
    "id": "chichu_c_mx",
    "code": "MX",
    "name": "彳亍角块 [MX] (UBL -> DLF -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [MX]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F2 U2 F D2 F' U2 F D2 F",
    "algs": [
      "F2 U2 F D2 F' U2 F D2 F",
      "F2 D B D' B' U2 B D B' U2 D' F2",
      "D R2 U R D2 R' U' R D2 R D'",
      "F' D R' U R D2 R' U' R D F"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [MX] (缓冲 UBL, DLF(D) -> DBL(L))"
  },
  {
    "id": "chichu_c_nd",
    "code": "ND",
    "name": "彳亍角块 [ND] (UBL -> DLF -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [ND]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R D2 R' U R D2 R' U'",
    "algs": [
      "R D2 R' U R D2 R' U'",
      "y2 L D2 L' U L D2 L' U' y2",
      "y F D2 F' U F D2 F' U' y'",
      "U2 F' D' F U F' D F U"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [ND] (缓冲 UBL, DLF(F) -> UBR(U))"
  },
  {
    "id": "chichu_c_ne",
    "code": "NE",
    "name": "彳亍角块 [NE] (UBL -> DLF -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [NE]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L R D' R' U2 R D R' U2 L'",
    "algs": [
      "L R D' R' U2 R D R' U2 L'",
      "Lw R D' R' U2 R D R' U2 Lw'",
      "R' U' R D2 R' U2 R D2 R' U' R",
      "L D R D2 R' U2 R D2 R' U2 D' L'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [NE] (缓冲 UBL, DLF(F) -> UBR(B))"
  },
  {
    "id": "chichu_c_nf",
    "code": "NF",
    "name": "彳亍角块 [NF] (UBL -> DLF -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [NF]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B L U L' D' L U' L' D B'",
    "algs": [
      "B L U L' D' L U' L' D B'",
      "L2 D U B' D B U' B' D' B D' L2",
      "L2 U B' D2 B U' B' D2 B L2",
      "L2 U' L D L' U' L D' L' U2 L2"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [NF] (缓冲 UBL, DLF(F) -> UBR(R))"
  },
  {
    "id": "chichu_c_ng",
    "code": "NG",
    "name": "彳亍角块 [NG] (UBL -> DLF -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [NG]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U2 B D' B' U2 B D B'",
    "algs": [
      "U2 B D' B' U2 B D B'",
      "D U2 B D2 B' U2 B D2 B' D'",
      "d U2 B D2 B' U2 B D2 B' d'",
      "Dw U2 B D2 B' U2 B D2 B' Dw'"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [NG] (缓冲 UBL, DLF(F) -> URF(U))"
  },
  {
    "id": "chichu_c_nh",
    "code": "NH",
    "name": "彳亍角块 [NH] (UBL -> DLF -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [NH]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R2 D2 R' U R D2 R' U' R'",
    "algs": [
      "R2 D2 R' U R D2 R' U' R'",
      "Rw R D2 R' U R D2 R' U' Rw'",
      "B' L R' D2 R U R' D2 R U' L' B",
      "R U' B D' B' U B D B' R'"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [NH] (缓冲 UBL, DLF(F) -> URF(F))"
  },
  {
    "id": "chichu_c_ni",
    "code": "NI",
    "name": "彳亍角块 [NI] (UBL -> DLF -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [NI]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F' U L' D2 L U' L' D2 L F",
    "algs": [
      "F' U L' D2 L U' L' D2 L F",
      "L F D2 F' U' F D2 F' U L'",
      "U' R' U F' D' F U' F' D F R U",
      "L D U F' D' F U' F' D F D' L'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [NI] (缓冲 UBL, DLF(F) -> URF(R))"
  },
  {
    "id": "chichu_c_nj",
    "code": "NJ",
    "name": "彳亍角块 [NJ] (UBL -> DLF -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [NJ]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F' D' F U' F' D F U",
    "algs": [
      "F' D' F U' F' D F U",
      "R F' D' F U' F' D F U R'",
      "R' F' D' F U' F' D F U R",
      "R2 F' D' F U' F' D F U R2"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [NJ] (缓冲 UBL, DLF(F) -> UFL(U))"
  },
  {
    "id": "chichu_c_nk",
    "code": "NK",
    "name": "彳亍角块 [NK] (UBL -> DLF -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [NK]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L' F' D F U' F' D' F U L",
    "algs": [
      "L' F' D F U' F' D' F U L",
      "L' U B D B' U' B D' B' L",
      "Lw' U B D B' U' B D' B' Lw",
      "x U B D B' U' B D' B' x'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [NK] (缓冲 UBL, DLF(F) -> UFL(F))"
  },
  {
    "id": "chichu_c_nl",
    "code": "NL",
    "name": "彳亍角块 [NL] (UBL -> DLF -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [NL]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U' R2 D2 R' U2 R D2 R' U2 R' U",
    "algs": [
      "U' R2 D2 R' U2 R D2 R' U2 R' U",
      "F L' U2 R' D2 R U2 R' D2 R L F'",
      "U' R U2 F' D' F U2 F' D F R' U",
      "F L' B D B' U2 B D' B' U2 L F'"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [NL] (缓冲 UBL, DLF(F) -> UFL(L))"
  },
  {
    "id": "chichu_c_np",
    "code": "NP",
    "name": "彳亍角块 [NP] (UBL -> DLF -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [NP]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R' D2 R' U R D2 R' U' R2",
    "algs": [
      "R' D2 R' U R D2 R' U' R2",
      "R2 U' B D' B' U B D B' R2",
      "R2 D' U' L' D' L U L' D L D R2",
      "R2 U2 F' D' F U F' D F U R2"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [NP] (缓冲 UBL, DLF(F) -> DFR(D))"
  },
  {
    "id": "chichu_c_nq",
    "code": "NQ",
    "name": "彳亍角块 [NQ] (UBL -> DLF -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [NQ]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "x F' D F U F' D' F U' x'",
    "algs": [
      "x F' D F U F' D' F U' x'",
      "U' R U F' D' F U' F' D F R' U",
      "D' L U B D B' U' B D' B' L' D",
      "F L' B D B' U B D' B' U' L F'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [NQ] (缓冲 UBL, DLF(F) -> DFR(F))"
  },
  {
    "id": "chichu_c_nr",
    "code": "NR",
    "name": "彳亍角块 [NR] (UBL -> DLF -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [NR]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D F' U2 F D' F' U2 F",
    "algs": [
      "D F' U2 F D' F' U2 F",
      "U2 D R U R' D' R U' R' U2",
      "D2 R' U R D' R' U' R D'",
      "d D R' U R D' R' U' R d'"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [NR] (缓冲 UBL, DLF(F) -> DFR(R))"
  },
  {
    "id": "chichu_c_ns",
    "code": "NS",
    "name": "彳亍角块 [NS] (UBL -> DLF -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [NS]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "x' R D' R' U2 R D R' U2 x",
    "algs": [
      "x' R D' R' U2 R D R' U2 x",
      "R2 U' R D2 R' U2 R D2 R' U' R2",
      "R2 D R' D' R U2 R' D R U2 D' R2",
      "R2 D' U2 L' D' L U2 L' D L D R2"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [NS] (缓冲 UBL, DLF(F) -> DBR(D))"
  },
  {
    "id": "chichu_c_nt",
    "code": "NT",
    "name": "彳亍角块 [NT] (UBL -> DLF -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [NT]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D2 R' U R D2 R' U' R",
    "algs": [
      "D2 R' U R D2 R' U' R",
      "Rw' R D2 R' U R D2 R' U' Rw",
      "D' L U L' D2 L U' L' D'",
      "R' U' B D' B' U B D B' R"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [NT] (缓冲 UBL, DLF(F) -> DBR(B))"
  },
  {
    "id": "chichu_c_nu",
    "code": "NU",
    "name": "彳亍角块 [NU] (UBL -> DLF -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [NU]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F' R U2 R' D' R U2 R' D F",
    "algs": [
      "F' R U2 R' D' R U2 R' D F",
      "D' R U2 L' D' L U2 L' D L R' D",
      "D' R F D2 F' U2 F D2 F' U2 R' D",
      "U L' U2 F' D2 F U2 F' D2 F L U'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [NU] (缓冲 UBL, DLF(F) -> DBR(R))"
  },
  {
    "id": "chichu_c_nv",
    "code": "NV",
    "name": "彳亍角块 [NV] (UBL -> DLF -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [NV]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U B2 R' F2 R B2 R' F2 R U'",
    "algs": [
      "U B2 R' F2 R B2 R' F2 R U'",
      "D' R L F2 L' B' L F2 L' B R' D",
      "R U B2 R' F2 R B2 R' F2 R U' R'",
      "R' U B2 R' F2 R B2 R' F2 R U' R"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [NV] (缓冲 UBL, DLF(F) -> DBL(D))"
  },
  {
    "id": "chichu_c_nw",
    "code": "NW",
    "name": "彳亍角块 [NW] (UBL -> DLF -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [NW]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F' R U2 R' D2 R U2 R' D2 F",
    "algs": [
      "F' R U2 R' D2 R U2 R' D2 F",
      "F' R B D B' U2 B D' B' U2 R' F",
      "D L R U' R' D2 R U R' D2 L' D'",
      "D' R L U L' D2 L U' L' D2 R' D"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [NW] (缓冲 UBL, DLF(F) -> DBL(B))"
  },
  {
    "id": "chichu_c_nx",
    "code": "NX",
    "name": "彳亍角块 [NX] (UBL -> DLF -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [NX]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D' L U L' D L U' L'",
    "algs": [
      "D' L U L' D L U' L'",
      "Lw L' D' L U L' D L U' Lw'",
      "x' L' D' L U L' D L U' x",
      "L2 D L' D2 L U L' D2 L U' D' L2"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [NX] (缓冲 UBL, DLF(F) -> DBL(L))"
  },
  {
    "id": "chichu_c_od",
    "code": "OD",
    "name": "彳亍角块 [OD] (UBL -> DLF -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [OD]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' D2 B U B' D2 B U'",
    "algs": [
      "B' D2 B U B' D2 B U'",
      "U L U' R D' R' U R D R' L' U'",
      "U R' D R U R' D' R U2",
      "U2 L D L' U L D' L' U"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [OD] (缓冲 UBL, DLF(L) -> UBR(U))"
  },
  {
    "id": "chichu_c_oe",
    "code": "OE",
    "name": "彳亍角块 [OE] (UBL -> DLF -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [OE]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R2 D R U2 R' D' R U2 R",
    "algs": [
      "R2 D R U2 R' D' R U2 R",
      "Rw' R' D R U2 R' D' R U2 Rw",
      "L U R' D2 R U2 R' D2 R U L'",
      "R' D' R' D2 R U2 R' D2 R U2 D R"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [OE] (缓冲 UBL, DLF(L) -> UBR(B))"
  },
  {
    "id": "chichu_c_of",
    "code": "OF",
    "name": "彳亍角块 [OF] (UBL -> DLF -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [OF]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R' F2 R B' R' F2 R B",
    "algs": [
      "R' F2 R B' R' F2 R B",
      "Rw' F2 R B' R' F2 R B R' Rw",
      "D B L F2 L' B' L F2 L' D'",
      "z B R' F R B' R' F' R z'"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [OF] (缓冲 UBL, DLF(L) -> UBR(R))"
  },
  {
    "id": "chichu_c_og",
    "code": "OG",
    "name": "彳亍角块 [OG] (UBL -> DLF -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [OG]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R' D R U2 R' D' R U2",
    "algs": [
      "R' D R U2 R' D' R U2",
      "D' R' D2 R U2 R' D2 R U2 D",
      "d' R' D2 R U2 R' D2 R U2 d",
      "Dw' R' D2 R U2 R' D2 R U2 Dw"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [OG] (缓冲 UBL, DLF(L) -> URF(U))"
  },
  {
    "id": "chichu_c_oh",
    "code": "OH",
    "name": "彳亍角块 [OH] (UBL -> DLF -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [OH]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F L' D2 L U L' D2 L U' F'",
    "algs": [
      "F L' D2 L U L' D2 L U' F'",
      "L' U' F D2 F' U F D2 F' L",
      "B' D' F D2 F' U F D2 F' U' D B",
      "U R' F' D' F U F' D F U' R U'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [OH] (缓冲 UBL, DLF(L) -> URF(F))"
  },
  {
    "id": "chichu_c_oi",
    "code": "OI",
    "name": "彳亍角块 [OI] (UBL -> DLF -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [OI]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F2 R B' R' F2 R B R'",
    "algs": [
      "F2 R B' R' F2 R B R'",
      "B F2 R B2 R' F2 R B2 R' B'",
      "F L' B' L F2 L' B L F",
      "U' L' B L F L' B' L F' U"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [OI] (缓冲 UBL, DLF(L) -> URF(R))"
  },
  {
    "id": "chichu_c_oj",
    "code": "OJ",
    "name": "彳亍角块 [OJ] (UBL -> DLF -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [OJ]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L D L' U' L D' L' U",
    "algs": [
      "L D L' U' L D' L' U",
      "R L D L' U' L D' L' U R'",
      "R' L D L' U' L D' L' U R",
      "R2 L D L' U' L D' L' U R2"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [OJ] (缓冲 UBL, DLF(L) -> UFL(U))"
  },
  {
    "id": "chichu_c_ok",
    "code": "OK",
    "name": "彳亍角块 [OK] (UBL -> DLF -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [OK]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F L2 D' L U2 L' D L U2 L F'",
    "algs": [
      "F L2 D' L U2 L' D L U2 L F'",
      "F L' U2 F D2 F' U2 F D2 F' L F'",
      "U' L D' L U2 L' D L U2 L2 U",
      "D L' D2 R U2 R' D2 R U2 R' L D'"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [OK] (缓冲 UBL, DLF(L) -> UFL(F))"
  },
  {
    "id": "chichu_c_ol",
    "code": "OL",
    "name": "彳亍角块 [OL] (UBL -> DLF -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [OL]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' U2 R D2 R' U2 R D2 R' B",
    "algs": [
      "B' U2 R D2 R' U2 R D2 R' B",
      "U' R U2 L D L' U2 L D' L' R' U",
      "B' D L D' L' U2 L D L' U2 D' B",
      "B' F' D' F U2 F' D F U2 B"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [OL] (缓冲 UBL, DLF(L) -> UFL(L))"
  },
  {
    "id": "chichu_c_op",
    "code": "OP",
    "name": "彳亍角块 [OP] (UBL -> DLF -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [OP]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F2 R B' R' F R B R' F",
    "algs": [
      "F2 R B' R' F R B R' F",
      "F2 D R B' R' F R B R' F' D' F2",
      "F2 D' R B' R' F R B R' F' D F2",
      "F L' B' L F L' B L F2"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [OP] (缓冲 UBL, DLF(L) -> DFR(D))"
  },
  {
    "id": "chichu_c_oq",
    "code": "OQ",
    "name": "彳亍角块 [OQ] (UBL -> DLF -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [OQ]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F U' F' D' F U F' D",
    "algs": [
      "F U' F' D' F U F' D",
      "F R U' F' D' F U F' D F R' F'",
      "F R' U' F' D' F U F' D F R F'",
      "x2 B D' B' U' B D B' U x2"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [OQ] (缓冲 UBL, DLF(L) -> DFR(F))"
  },
  {
    "id": "chichu_c_or",
    "code": "OR",
    "name": "彳亍角块 [OR] (UBL -> DLF -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [OR]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R F2 R B' R' F2 R B R2",
    "algs": [
      "R F2 R B' R' F2 R B R2",
      "Rw F2 R B' R' F2 R B R' Rw'",
      "B R F2 R B2 R' F2 R B2 R2 B'",
      "U L2 B L F2 L' B' L F2 L U'"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [OR] (缓冲 UBL, DLF(L) -> DFR(R))"
  },
  {
    "id": "chichu_c_os",
    "code": "OS",
    "name": "彳亍角块 [OS] (UBL -> DLF -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [OS]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R D R U2 R' D' R U2 R2",
    "algs": [
      "R D R U2 R' D' R U2 R2",
      "R2 D' R' D2 R U2 R' D2 R U2 D R2",
      "R2 U L D L' U2 L D' L' U R2",
      "R2 D U2 L' D2 L U2 L' D2 L D' R2"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [OS] (缓冲 UBL, DLF(L) -> DBR(D))"
  },
  {
    "id": "chichu_c_ot",
    "code": "OT",
    "name": "彳亍角块 [OT] (UBL -> DLF -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [OT]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R' B' D2 B U B' D2 B U' R",
    "algs": [
      "R' B' D2 B U B' D2 B U' R",
      "Rw' B' D2 B U B' D2 B U' Rw",
      "R' U2 L D L' U L D' L' U R",
      "F D' U' L D' L' U L D L' D F'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [OT] (缓冲 UBL, DLF(L) -> DBR(B))"
  },
  {
    "id": "chichu_c_ou",
    "code": "OU",
    "name": "彳亍角块 [OU] (UBL -> DLF -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [OU]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F U' F' D2 F U F' D2",
    "algs": [
      "F U' F' D2 F U F' D2",
      "D R U2 R' D2 R U2 R' D",
      "D R B D B' U2 B D' B' U2 R' D'",
      "D' R U2 B D B' U2 B D' B' R' D"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [OU] (缓冲 UBL, DLF(L) -> DBR(R))"
  },
  {
    "id": "chichu_c_ov",
    "code": "OV",
    "name": "彳亍角块 [OV] (UBL -> DLF -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [OV]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D' R D2 R U2 R' D2 R U2 R2 D",
    "algs": [
      "D' R D2 R U2 R' D2 R U2 R2 D",
      "F2 U B2 R' F R B2 R' F' R U' F2",
      "F D' B2 L F L' B2 L F' L' D F'"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [OV] (缓冲 UBL, DLF(L) -> DBL(D))"
  },
  {
    "id": "chichu_c_ow",
    "code": "OW",
    "name": "彳亍角块 [OW] (UBL -> DLF -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [OW]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F U' F' D F U F' D'",
    "algs": [
      "F U' F' D F U F' D'",
      "F R U' F' D F U F' D' F R' F'",
      "F R' U' F' D F U F' D' F R F'",
      "L2 U' F' D' F U F' D F L2"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [OW] (缓冲 UBL, DLF(L) -> DBL(B))"
  },
  {
    "id": "chichu_c_ox",
    "code": "OX",
    "name": "彳亍角块 [OX] (UBL -> DLF -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [OX]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B2 R' F2 R B R' F2 R B",
    "algs": [
      "B2 R' F2 R B R' F2 R B",
      "z L F L' B L F' L' B' z'",
      "B' D L F2 L' B L F2 L' B' D' B",
      "z B' R' F R B R' F' R z'"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [OX] (缓冲 UBL, DLF(L) -> DBL(L))"
  },
  {
    "id": "chichu_c_pd",
    "code": "PD",
    "name": "彳亍角块 [PD] (UBL -> DFR -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [PD]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F B' D2 B U B' D2 B U' F'",
    "algs": [
      "F B' D2 B U B' D2 B U' F'",
      "U' R' U' L D2 L' U L D2 L' R U",
      "F D U' L' D2 L U L' D2 L D' F'",
      "F D' U' B D B' U B D' B' D F'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [PD] (缓冲 UBL, DFR(D) -> UBR(U))"
  },
  {
    "id": "chichu_c_pe",
    "code": "PE",
    "name": "彳亍角块 [PE] (UBL -> DFR -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [PE]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L U2 L D' L' U2 L D L2",
    "algs": [
      "L U2 L D' L' U2 L D L2",
      "Lw U2 L D' L' U2 L D L' Lw'",
      "R' U L D2 L' U2 L D2 L' U R",
      "L D U2 L D2 L' U2 L D2 L' D' L'"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [PE] (缓冲 UBL, DFR(D) -> UBR(B))"
  },
  {
    "id": "chichu_c_pf",
    "code": "PF",
    "name": "彳亍角块 [PF] (UBL -> DFR -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [PF]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "x' U F' D2 F U' F' D2 F x",
    "algs": [
      "x' U F' D2 F U' F' D2 F x",
      "B L U B D2 B' U' B D2 B' L' B'",
      "R2 B D2 B' U' B D2 B' U R2",
      "R2 D U B' D' B U' B' D B D' R2"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [PF] (缓冲 UBL, DFR(D) -> UBR(R))"
  },
  {
    "id": "chichu_c_pg",
    "code": "PG",
    "name": "彳亍角块 [PG] (UBL -> DFR -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [PG]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F R F2 R B' R' F2 R B R2 F'",
    "algs": [
      "F R F2 R B' R' F2 R B R2 F'",
      "F2 D L' B' L F2 L' B L F2 D' F2",
      "R2 U' L F L' B2 L F' L' B2 U R2"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [PG] (缓冲 UBL, DFR(D) -> URF(U))"
  },
  {
    "id": "chichu_c_ph",
    "code": "PH",
    "name": "彳亍角块 [PH] (UBL -> DFR -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [PH]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F2 U' F' D' F U F' D F'",
    "algs": [
      "F2 U' F' D' F U F' D F'",
      "F2 B D' B' U B D B' U' F2",
      "F2 D B D2 B' U B D2 B' U' D' F2",
      "U' L' B' D B U B' D' B U' L U"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [PH] (缓冲 UBL, DFR(D) -> URF(F))"
  },
  {
    "id": "chichu_c_pi",
    "code": "PI",
    "name": "彳亍角块 [PI] (UBL -> DFR -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [PI]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F' R B' R' F R B R'",
    "algs": [
      "F' R B' R' F R B R'",
      "F' D R B' R' F R B R' F' D' F",
      "F' D' R B' R' F R B R' F' D F",
      "z' R B2 R' F R B2 R' F' z"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [PI] (缓冲 UBL, DFR(D) -> URF(R))"
  },
  {
    "id": "chichu_c_pj",
    "code": "PJ",
    "name": "彳亍角块 [PJ] (UBL -> DFR -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [PJ]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F2 L' B' L F2 L' B L",
    "algs": [
      "F2 L' B' L F2 L' B L",
      "B' D R' F R B R' F' R B' D' B",
      "F' R B' R' F2 R B R' F'",
      "R' D L F L' B' L F' L' B D' R"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [PJ] (缓冲 UBL, DFR(D) -> UFL(U))"
  },
  {
    "id": "chichu_c_pk",
    "code": "PK",
    "name": "彳亍角块 [PK] (UBL -> DFR -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [PK]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F2 L' D2 L U L' D2 L U' F2",
    "algs": [
      "F2 L' D2 L U L' D2 L U' F2",
      "F2 U B' D B U B' D' B U2 F2",
      "F R B' D2 B U B' D2 B U' R' F'",
      "z U' R D2 R' U R D2 R' z'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [PK] (缓冲 UBL, DFR(D) -> UFL(F))"
  },
  {
    "id": "chichu_c_pl",
    "code": "PL",
    "name": "彳亍角块 [PL] (UBL -> DFR -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [PL]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' U2 B' D B U2 B' D' B2",
    "algs": [
      "B' U2 B' D B U2 B' D' B2",
      "B' D' U2 B' D2 B U2 B' D2 B D B",
      "B2 D' R U' R' D R U R' B2",
      "F R' D R U2 R' D' R U2 F'"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [PL] (缓冲 UBL, DFR(D) -> UFL(L))"
  },
  {
    "id": "chichu_c_pm",
    "code": "PM",
    "name": "彳亍角块 [PM] (UBL -> DFR -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [PM]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "z U2 R D2 R' U2 R D2 R' z'",
    "algs": [
      "z U2 R D2 R' U2 R D2 R' z'",
      "z F' D' F U2 F' D F U2 z'",
      "B' D R' U' R D R' U R D2 B",
      "D L R' U2 R D R' U2 R D' L' D'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [PM] (缓冲 UBL, DFR(D) -> DLF(D))"
  },
  {
    "id": "chichu_c_pn",
    "code": "PN",
    "name": "彳亍角块 [PN] (UBL -> DFR -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [PN]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R2 U R D2 R' U' R D2 R",
    "algs": [
      "R2 U R D2 R' U' R D2 R",
      "R2 B D' B' U' B D B' U R2",
      "R2 D' L' D' L U' L' D L U D R2",
      "R2 U' F' D' F U' F' D F U2 R2"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [PN] (缓冲 UBL, DFR(D) -> DLF(F))"
  },
  {
    "id": "chichu_c_po",
    "code": "PO",
    "name": "彳亍角块 [PO] (UBL -> DFR -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [PO]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F' R B' R' F' R B R' F2",
    "algs": [
      "F' R B' R' F' R B R' F2",
      "F2 D F R B' R' F' R B R' D' F2",
      "F2 D' F R B' R' F' R B R' D F2",
      "F2 L' B' L F' L' B L F'"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [PO] (缓冲 UBL, DFR(D) -> DLF(L))"
  },
  {
    "id": "chichu_c_ps",
    "code": "PS",
    "name": "彳亍角块 [PS] (UBL -> DFR -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [PS]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "x' R D R' U2 R D' R' U2 x",
    "algs": [
      "x' R D R' U2 R D' R' U2 x",
      "x' U2 F' D2 F U2 F' D2 F x",
      "F R D R U2 R' D' R U2 R2 F'",
      "L U D R' U R D' R' U' R U' L'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [PS] (缓冲 UBL, DFR(D) -> DBR(D))"
  },
  {
    "id": "chichu_c_pt",
    "code": "PT",
    "name": "彳亍角块 [PT] (UBL -> DFR -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [PT]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "z' R' D2 R U R' D2 R U' z",
    "algs": [
      "z' R' D2 R U R' D2 R U' z",
      "F2 U' L D2 L' U L D2 L' F2",
      "F2 D L' D' L U L' D L U' D' F2",
      "R' U F D' F' U F D F' U2 R"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [PT] (缓冲 UBL, DFR(D) -> DBR(B))"
  },
  {
    "id": "chichu_c_pu",
    "code": "PU",
    "name": "彳亍角块 [PU] (UBL -> DFR -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [PU]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F2 U' F' D2 F U F' D2 F'",
    "algs": [
      "F2 U' F' D2 F U F' D2 F'",
      "F2 D B D B' U B D' B' U' D' F2",
      "B' L U B' D B U' B' D' B L' B",
      "F2 L' D L U L' D' L U' F2"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [PU] (缓冲 UBL, DFR(D) -> DBR(R))"
  },
  {
    "id": "chichu_c_pv",
    "code": "PV",
    "name": "彳亍角块 [PV] (UBL -> DFR -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [PV]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' L U2 B' D B U2 B' D' B L' B",
    "algs": [
      "B' L U2 B' D B U2 B' D' B L' B",
      "R2 U B2 R' F' R B2 R' F R U' R2",
      "F2 D' B2 L F L' B2 L F' L' D F2",
      "R D' B2 L F' L' B2 L F L' D R'"
    ],
    "moves": 12,
    "desc": "三阶彳亍角块三循环 [PV] (缓冲 UBL, DFR(D) -> DBL(D))"
  },
  {
    "id": "chichu_c_pw",
    "code": "PW",
    "name": "彳亍角块 [PW] (UBL -> DFR -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [PW]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F2 U' F' D F U F' D' F'",
    "algs": [
      "F2 U' F' D F U F' D' F'",
      "F2 B D B' U B D' B' U' F2",
      "R2 B D B' U' B D' B' U R2",
      "B' U B' D B U' B' D' B2"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [PW] (缓冲 UBL, DFR(D) -> DBL(B))"
  },
  {
    "id": "chichu_c_px",
    "code": "PX",
    "name": "彳亍角块 [PX] (UBL -> DFR -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [PX]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R2 U R D' R' U' R D R",
    "algs": [
      "R2 U R D' R' U' R D R",
      "F2 U R D' R' U R D R' U2 F2",
      "R2 D U R D2 R' U' R D2 R' D' R2",
      "L U' L D' L' U L D L2"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [PX] (缓冲 UBL, DFR(D) -> DBL(L))"
  },
  {
    "id": "chichu_c_qd",
    "code": "QD",
    "name": "彳亍角块 [QD] (UBL -> DFR -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [QD]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U' L' D2 L U L' D2 L",
    "algs": [
      "U' L' D2 L U L' D2 L",
      "u' L' D2 L U L' D2 L U' u",
      "Uw' L' D2 L U L' D2 L U' Uw",
      "U F D F' U F D' F' U2"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [QD] (缓冲 UBL, DFR(F) -> UBR(U))"
  },
  {
    "id": "chichu_c_qe",
    "code": "QE",
    "name": "彳亍角块 [QE] (UBL -> DFR -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [QE]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D' R2 D R U2 R' D' R U2 R D",
    "algs": [
      "D' R2 D R U2 R' D' R U2 R D",
      "D' L U2 F' D F U2 F' D' F L' D",
      "F R' U2 B D' B' U2 B D B' R F'",
      "D' L' R' F R B2 R' F' R B2 L D"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [QE] (缓冲 UBL, DFR(F) -> UBR(B))"
  },
  {
    "id": "chichu_c_qf",
    "code": "QF",
    "name": "彳亍角块 [QF] (UBL -> DFR -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [QF]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B L F2 L' B' L F2 L'",
    "algs": [
      "B L F2 L' B' L F2 L'",
      "Lw L' B L F2 L' B' L F2 Lw'",
      "F' B L F' L' B' L F L' F",
      "F' D B L F' L' B' L F L' D' F"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [QF] (缓冲 UBL, DFR(F) -> UBR(R))"
  },
  {
    "id": "chichu_c_qg",
    "code": "QG",
    "name": "彳亍角块 [QG] (UBL -> DFR -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [QG]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U2 L' D2 L U2 L' D2 L",
    "algs": [
      "U2 L' D2 L U2 L' D2 L",
      "F D F' U2 F D' F' U2",
      "y' U2 F' D2 F U2 F' D2 F y",
      "D2 U2 B D B' U2 B D' B' D2"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [QG] (缓冲 UBL, DFR(F) -> URF(U))"
  },
  {
    "id": "chichu_c_qh",
    "code": "QH",
    "name": "彳亍角块 [QH] (UBL -> DFR -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [QH]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' R' D' R U R' D R U' B",
    "algs": [
      "B' R' D' R U R' D R U' B",
      "B' L R' D' R U R' D R U' L' B",
      "x R' D2 R U R' D2 R U' x'",
      "B' D F D' F' U F D F' U' D' B"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [QH] (缓冲 UBL, DFR(F) -> URF(F))"
  },
  {
    "id": "chichu_c_qi",
    "code": "QI",
    "name": "彳亍角块 [QI] (UBL -> DFR -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [QI]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D' F2 R B' R' F2 R B R' D",
    "algs": [
      "D' F2 R B' R' F2 R B R' D",
      "d' F2 R B' R' F2 R B R' d",
      "Dw' F2 R B' R' F2 R B R' Dw",
      "L U F2 L' B' L F2 L' B L U' L'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [QI] (缓冲 UBL, DFR(F) -> URF(R))"
  },
  {
    "id": "chichu_c_qj",
    "code": "QJ",
    "name": "彳亍角块 [QJ] (UBL -> DFR -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [QJ]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U L' D2 L U' L' D2 L",
    "algs": [
      "U L' D2 L U' L' D2 L",
      "U' F D F' U' F D' F' U2",
      "B' R U F' D2 F U' F' D2 F R' B",
      "y' U F' D2 F U' F' D2 F y"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [QJ] (缓冲 UBL, DFR(F) -> UFL(U))"
  },
  {
    "id": "chichu_c_qk",
    "code": "QK",
    "name": "彳亍角块 [QK] (UBL -> DFR -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [QK]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "x R' D2 R U2 R' D2 R U2 x'",
    "algs": [
      "x R' D2 R U2 R' D2 R U2 x'",
      "x U2 B D B' U2 B D' B' x'",
      "L' U' D2 R U' R' D2 R U R' U L",
      "L' D2 R U2 R' D2 R U2 R' L"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [QK] (缓冲 UBL, DFR(F) -> UFL(F))"
  },
  {
    "id": "chichu_c_ql",
    "code": "QL",
    "name": "彳亍角块 [QL] (UBL -> DFR -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [QL]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' L D' L' U2 L D L' U2 B",
    "algs": [
      "B' L D' L' U2 L D L' U2 B",
      "B' D L D2 L' U2 L D2 L' U2 D' B",
      "U R' L' D L U2 L' D' L U2 R U'",
      "F D' U2 L' D' L U2 L' D L D F'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [QL] (缓冲 UBL, DFR(F) -> UFL(L))"
  },
  {
    "id": "chichu_c_qm",
    "code": "QM",
    "name": "彳亍角块 [QM] (UBL -> DFR -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [QM]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U L D2 L U' L' D2 L U L2 U'",
    "algs": [
      "U L D2 L U' L' D2 L U L2 U'"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [QM] (缓冲 UBL, DFR(F) -> DLF(D))"
  },
  {
    "id": "chichu_c_qn",
    "code": "QN",
    "name": "彳亍角块 [QN] (UBL -> DFR -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [QN]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "x U F' D F U' F' D' F x'",
    "algs": [
      "x U F' D F U' F' D' F x'",
      "U' R F' D' F U F' D F U' R' U",
      "D' L B D B' U B D' B' U' L' D",
      "F L' U B D B' U' B D' B' L F'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [QN] (缓冲 UBL, DFR(F) -> DLF(F))"
  },
  {
    "id": "chichu_c_qo",
    "code": "QO",
    "name": "彳亍角块 [QO] (UBL -> DFR -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [QO]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D' F U' F' D F U F'",
    "algs": [
      "D' F U' F' D F U F'",
      "F R F' D' F U' F' D F U R' F'",
      "F R' F' D' F U' F' D F U R F'",
      "x2 U' B D' B' U B D B' x2"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [QO] (缓冲 UBL, DFR(F) -> DLF(L))"
  },
  {
    "id": "chichu_c_qs",
    "code": "QS",
    "name": "彳亍角块 [QS] (UBL -> DFR -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [QS]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B2 L F2 L' B2 L F2 L'",
    "algs": [
      "B2 L F2 L' B2 L F2 L'",
      "Lw L' B2 L F2 L' B2 L F2 Lw'",
      "z' R' F' R B2 R' F R B2 z",
      "F' B2 L F' L' B2 L F L' F"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [QS] (缓冲 UBL, DFR(F) -> DBR(D))"
  },
  {
    "id": "chichu_c_qt",
    "code": "QT",
    "name": "彳亍角块 [QT] (UBL -> DFR -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [QT]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F D2 R' U R D2 R' U' R F'",
    "algs": [
      "F D2 R' U R D2 R' U' R F'",
      "F R' U' B D' B' U B D B' R F'",
      "B' R L U2 L' D L U2 L' D' R' B",
      "D' L D2 R U' R' D2 R U R' L' D"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [QT] (缓冲 UBL, DFR(F) -> DBR(B))"
  },
  {
    "id": "chichu_c_qu",
    "code": "QU",
    "name": "彳亍角块 [QU] (UBL -> DFR -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [QU]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R U2 R' D' R U2 R' D",
    "algs": [
      "R U2 R' D' R U2 R' D",
      "Rw U2 R' D' R U2 R' D R Rw'",
      "R U' L D' L' U2 L D L' U' R'",
      "R D U2 F D' F' U2 F D F' D' R'"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [QU] (缓冲 UBL, DFR(F) -> DBR(R))"
  },
  {
    "id": "chichu_c_qv",
    "code": "QV",
    "name": "彳亍角块 [QV] (UBL -> DFR -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [QV]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' L2 D' L' U2 L D L' U2 L' B",
    "algs": [
      "B' L2 D' L' U2 L D L' U2 L' B",
      "D' R D R U2 R' D' R U2 R2 D",
      "U R' D L U2 L' D' L U2 L' R U'",
      "B R2 U R' D2 R U' R' D2 R' B'"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [QV] (缓冲 UBL, DFR(F) -> DBL(D))"
  },
  {
    "id": "chichu_c_qw",
    "code": "QW",
    "name": "彳亍角块 [QW] (UBL -> DFR -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [QW]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D2 B' U' B D2 B' U B",
    "algs": [
      "D2 B' U' B D2 B' U B",
      "x2 R D2 R' U2 R D2 R' U2 x2",
      "R D U2 R' D R U2 R' D' R D' R'",
      "R U2 R' D2 R U2 R' D2"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [QW] (缓冲 UBL, DFR(F) -> DBL(B))"
  },
  {
    "id": "chichu_c_qx",
    "code": "QX",
    "name": "彳亍角块 [QX] (UBL -> DFR -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [QX]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' L F2 L' B L F2 L'",
    "algs": [
      "B' L F2 L' B L F2 L'",
      "Lw L' B' L F2 L' B L F2 Lw'",
      "B' D' B' R' F2 R B R' F2 R D B",
      "F' B' L F' L' B L F L' F"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [QX] (缓冲 UBL, DFR(F) -> DBL(L))"
  },
  {
    "id": "chichu_c_rd",
    "code": "RD",
    "name": "彳亍角块 [RD] (UBL -> DFR -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [RD]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U' B D2 B' U B D2 B'",
    "algs": [
      "U' B D2 B' U B D2 B'",
      "u' B D2 B' U B D2 B' U' u",
      "Uw' B D2 B' U B D2 B' U' Uw",
      "D B' D' B U B' D B U' D'"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [RD] (缓冲 UBL, DFR(R) -> UBR(U))"
  },
  {
    "id": "chichu_c_re",
    "code": "RE",
    "name": "彳亍角块 [RE] (UBL -> DFR -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [RE]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R' U2 L' D L U2 L' D' L R",
    "algs": [
      "R' U2 L' D L U2 L' D' L R",
      "Rw' U2 L' D L U2 L' D' L Rw",
      "L U' L' D2 L U2 L' D2 L U' L'",
      "R' D' U2 L' D2 L U2 L' D2 L D R"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [RE] (缓冲 UBL, DFR(R) -> UBR(B))"
  },
  {
    "id": "chichu_c_rf",
    "code": "RF",
    "name": "彳亍角块 [RF] (UBL -> DFR -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [RF]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B L U L' D2 L U' L' D2 B'",
    "algs": [
      "B L U L' D2 L U' L' D2 B'",
      "z' U2 L' D' L U2 L' D L z",
      "z' F D2 F' U2 F D2 F' U2 z",
      "B D' R' U R D2 R' U' R D' B'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [RF] (缓冲 UBL, DFR(R) -> UBR(R))"
  },
  {
    "id": "chichu_c_rg",
    "code": "RG",
    "name": "彳亍角块 [RG] (UBL -> DFR -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [RG]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R' D' R U2 R' D R U2",
    "algs": [
      "R' D' R U2 R' D R U2",
      "U L D' L' U2 L D L' U",
      "u L D' L' U2 L D L' U2 u'",
      "u' U2 L D' L' U2 L D L' u"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [RG] (缓冲 UBL, DFR(R) -> URF(U))"
  },
  {
    "id": "chichu_c_rh",
    "code": "RH",
    "name": "彳亍角块 [RH] (UBL -> DFR -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [RH]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U2 R B' R' F' R B R' F U2",
    "algs": [
      "U2 R B' R' F' R B R' F U2",
      "B' D' F2 R B R' F2 R B' R' D B",
      "L2 D' F2 R B2 R' F2 R B2 R' D L2",
      "U F2 L' B L F2 L' B' L U'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [RH] (缓冲 UBL, DFR(R) -> URF(F))"
  },
  {
    "id": "chichu_c_ri",
    "code": "RI",
    "name": "彳亍角块 [RI] (UBL -> DFR -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [RI]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L F D F' U' F D' F' U L'",
    "algs": [
      "L F D F' U' F D' F' U L'",
      "U R U F' D2 F U' F' D2 F R' U'",
      "U' R' U F' D2 F U' F' D2 F R U",
      "L D U F' D2 F U' F' D2 F D' L'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [RI] (缓冲 UBL, DFR(R) -> URF(R))"
  },
  {
    "id": "chichu_c_rj",
    "code": "RJ",
    "name": "彳亍角块 [RJ] (UBL -> DFR -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [RJ]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L D' L' U' L D L' U",
    "algs": [
      "L D' L' U' L D L' U",
      "u' U L D' L' U' L D L' u",
      "Uw' U L D' L' U' L D L' Uw",
      "y' U L D2 L' U' L D2 L' y"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [RJ] (缓冲 UBL, DFR(R) -> UFL(U))"
  },
  {
    "id": "chichu_c_rk",
    "code": "RK",
    "name": "彳亍角块 [RK] (UBL -> DFR -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [RK]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "z R' D R U R' D' R U' z'",
    "algs": [
      "z R' D R U R' D' R U' z'",
      "B R U F' D F U' F' D' F R' B'",
      "D' L' U B D B' U' B D' B' L D",
      "B D2 R U' R' D2 R U R' B'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [RK] (缓冲 UBL, DFR(R) -> UFL(F))"
  },
  {
    "id": "chichu_c_rl",
    "code": "RL",
    "name": "彳亍角块 [RL] (UBL -> DFR -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [RL]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U L2 D' L' U2 L D L' U2 L' U'",
    "algs": [
      "U L2 D' L' U2 L D L' U2 L' U'",
      "U R' U2 F D' F' U2 F D F' R U'",
      "U R L F' L' B2 L F L' B2 R' U'"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [RL] (缓冲 UBL, DFR(R) -> UFL(L))"
  },
  {
    "id": "chichu_c_rm",
    "code": "RM",
    "name": "彳亍角块 [RM] (UBL -> DFR -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [RM]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F' U2 R' D' R U2 R' D R F",
    "algs": [
      "F' U2 R' D' R U2 R' D R F",
      "z L D L' U2 L D' L' U2 z'",
      "F' D U2 F D' F' U2 F D F' D' F",
      "F' D' B D' B' U2 B D B' U2 D F"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [RM] (缓冲 UBL, DFR(R) -> DLF(D))"
  },
  {
    "id": "chichu_c_rn",
    "code": "RN",
    "name": "彳亍角块 [RN] (UBL -> DFR -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [RN]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F' U2 F D F' U2 F D'",
    "algs": [
      "F' U2 F D F' U2 F D'",
      "U2 R U R' D R U' R' D' U2",
      "D R' U R D R' U' R D2",
      "d R' U R D R' U' R D' d'"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [RN] (缓冲 UBL, DFR(R) -> DLF(F))"
  },
  {
    "id": "chichu_c_ro",
    "code": "RO",
    "name": "彳亍角块 [RO] (UBL -> DFR -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [RO]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R2 B' R' F2 R B R' F2 R'",
    "algs": [
      "R2 B' R' F2 R B R' F2 R'",
      "Rw R B' R' F2 R B R' F2 Rw'",
      "B R2 B2 R' F2 R B2 R' F2 R' B'",
      "U L' F2 L' B L F2 L' B' L2 U'"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [RO] (缓冲 UBL, DFR(R) -> DLF(L))"
  },
  {
    "id": "chichu_c_rs",
    "code": "RS",
    "name": "彳亍角块 [RS] (UBL -> DFR -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [RS]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D' R' D2 R' U R D2 R' U' R2 D",
    "algs": [
      "D' R' D2 R' U R D2 R' U' R2 D",
      "R D' R B' R' F2 R B R' F2 D R'"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [RS] (缓冲 UBL, DFR(R) -> DBR(D))"
  },
  {
    "id": "chichu_c_rt",
    "code": "RT",
    "name": "彳亍角块 [RT] (UBL -> DFR -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [RT]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D R' U R D' R' U' R",
    "algs": [
      "D R' U R D' R' U' R",
      "Rw' R D R' U R D' R' U' Rw",
      "x2 U R' D R U' R' D' R x2",
      "R' U' L' D L U L' D' L R"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [RT] (缓冲 UBL, DFR(R) -> DBR(B))"
  },
  {
    "id": "chichu_c_ru",
    "code": "RU",
    "name": "彳亍角块 [RU] (UBL -> DFR -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [RU]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "z' F D2 F' U F D2 F' U' z",
    "algs": [
      "z' F D2 F' U F D2 F' U' z",
      "z' U' R D' R' U R D R' z",
      "D R' B D B' U' B D' B' U R D'",
      "U R' B' D' B U' B' D B U R U'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [RU] (缓冲 UBL, DFR(R) -> DBR(R))"
  },
  {
    "id": "chichu_c_rv",
    "code": "RV",
    "name": "彳亍角块 [RV] (UBL -> DFR -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [RV]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U L' D' L' U2 L D L' U2 L2 U'",
    "algs": [
      "U L' D' L' U2 L D L' U2 L2 U'",
      "B R D2 L U2 L' D2 L U2 L' R' B'",
      "L2 D L' B2 L F2 L' B2 L F2 D' L2",
      "R U B2 R' F R B2 R' F' R U' R'"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [RV] (缓冲 UBL, DFR(R) -> DBL(D))"
  },
  {
    "id": "chichu_c_rw",
    "code": "RW",
    "name": "彳亍角块 [RW] (UBL -> DFR -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [RW]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "z U B' D2 B U' B' D2 B z'",
    "algs": [
      "z U B' D2 B U' B' D2 B z'",
      "U L B D2 B' U' B D2 B' U L' U'",
      "F' D U2 R' D R U2 R' D' R D' F",
      "F' U2 R' D2 R U2 R' D2 R F"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [RW] (缓冲 UBL, DFR(R) -> DBL(B))"
  },
  {
    "id": "chichu_c_rx",
    "code": "RX",
    "name": "彳亍角块 [RX] (UBL -> DFR -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [RX]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D2 L U L' D2 L U' L'",
    "algs": [
      "D2 L U L' D2 L U' L'",
      "Lw L' D2 L U L' D2 L U' Lw'",
      "L U B' D B U B' D' B U2 L'",
      "L D' U' L D L' U L D' L' D L'"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [RX] (缓冲 UBL, DFR(R) -> DBL(L))"
  },
  {
    "id": "chichu_c_sd",
    "code": "SD",
    "name": "彳亍角块 [SD] (UBL -> DBR -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [SD]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U' B2 L F L' B2 L F' L' U",
    "algs": [
      "U' B2 L F L' B2 L F' L' U",
      "L D B2 R' F R B2 R' F' R D' L'",
      "F2 U' B2 L F L' B2 L F' L' U F2",
      "u' B2 L F L' B2 L F' L' u"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [SD] (缓冲 UBL, DBR(D) -> UBR(U))"
  },
  {
    "id": "chichu_c_se",
    "code": "SE",
    "name": "彳亍角块 [SE] (UBL -> DBR -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [SE]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L U2 L D2 L' U2 L D2 L2",
    "algs": [
      "L U2 L D2 L' U2 L D2 L2",
      "F' L U2 L D2 L' U2 L D2 L2 F",
      "Lw U2 L D2 L' U2 L D2 L' Lw'",
      "R2 D L' D L U2 L' D' L U2 D' R2"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [SE] (缓冲 UBL, DBR(D) -> UBR(B))"
  },
  {
    "id": "chichu_c_sf",
    "code": "SF",
    "name": "彳亍角块 [SF] (UBL -> DBR -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [SF]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R2 U2 R' D' R U2 R' D R'",
    "algs": [
      "R2 U2 R' D' R U2 R' D R'",
      "R2 U' L D' L' U2 L D L' U' R2",
      "R2 D U2 F D' F' U2 F D F' D' R2",
      "R2 D' B D' B' U2 B D B' U2 D R2"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [SF] (缓冲 UBL, DBR(D) -> UBR(R))"
  },
  {
    "id": "chichu_c_sg",
    "code": "SG",
    "name": "彳亍角块 [SG] (UBL -> DBR -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [SG]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U' B2 U B2 U2 L2 U L2 U L R B2 L' R'",
    "algs": [
      "U' B2 U B2 U2 L2 U L2 U L R B2 L' R'"
    ],
    "moves": 14,
    "desc": "三阶彳亍角块三循环 [SG] (缓冲 UBL, DBR(D) -> URF(U))"
  },
  {
    "id": "chichu_c_sh",
    "code": "SH",
    "name": "彳亍角块 [SH] (UBL -> DBR -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [SH]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L F' L' B2 L F L' B2",
    "algs": [
      "L F' L' B2 L F L' B2",
      "Lw F' L' B2 L F L' B2 L Lw'",
      "B D R B R' F2 R B' R' F2 D' B'",
      "B' D F2 R B R' F2 R B' R' D' B"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [SH] (缓冲 UBL, DBR(D) -> URF(F))"
  },
  {
    "id": "chichu_c_si",
    "code": "SI",
    "name": "彳亍角块 [SI] (UBL -> DBR -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [SI]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L U L D2 L' U' L D2 L2",
    "algs": [
      "L U L D2 L' U' L D2 L2",
      "Lw U L D2 L' U' L D2 L' Lw'",
      "F' R U L' D2 L U' L' D2 L R' F",
      "L F D' F' U' F D F' U L'"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [SI] (缓冲 UBL, DBR(D) -> URF(R))"
  },
  {
    "id": "chichu_c_sj",
    "code": "SJ",
    "name": "彳亍角块 [SJ] (UBL -> DBR -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [SJ]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L F L' B2 L F' L' B2",
    "algs": [
      "L F L' B2 L F' L' B2",
      "Lw F L' B2 L F' L' B2 L Lw'",
      "F D' F' R B' R' F R B R' D F'",
      "y2 R B R' F2 R B' R' F2 y2"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [SJ] (缓冲 UBL, DBR(D) -> UFL(U))"
  },
  {
    "id": "chichu_c_sk",
    "code": "SK",
    "name": "彳亍角块 [SK] (UBL -> DBR -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [SK]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "x' U2 R D2 R' U2 R D2 R' x",
    "algs": [
      "x' U2 R D2 R' U2 R D2 R' x",
      "x' F' D' F U2 F' D F U2 x",
      "F' L R' U2 R D' R' U2 R D L' F",
      "x D2 R U2 R' D2 R U2 R' x'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [SK] (缓冲 UBL, DBR(D) -> UFL(F))"
  },
  {
    "id": "chichu_c_sl",
    "code": "SL",
    "name": "彳亍角块 [SL] (UBL -> DBR -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [SL]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U' L' U2 L' D L U2 L' D' L2 U",
    "algs": [
      "U' L' U2 L' D L U2 L' D' L2 U",
      "U' R B' D B U2 B' D' B U2 R' U",
      "U' R' F2 L' B L F2 L' B' L R U"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [SL] (缓冲 UBL, DBR(D) -> UFL(L))"
  },
  {
    "id": "chichu_c_sm",
    "code": "SM",
    "name": "彳亍角块 [SM] (UBL -> DBR -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [SM]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U R2 D F2 D2 F2 R2 U' R2 D L R' B2 L' R'",
    "algs": [
      "U R2 D F2 D2 F2 R2 U' R2 D L R' B2 L' R'"
    ],
    "moves": 15,
    "desc": "三阶彳亍角块三循环 [SM] (缓冲 UBL, DBR(D) -> DLF(D))"
  },
  {
    "id": "chichu_c_sn",
    "code": "SN",
    "name": "彳亍角块 [SN] (UBL -> DBR -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [SN]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "x' U2 R D' R' U2 R D R' x",
    "algs": [
      "x' U2 R D' R' U2 R D R' x",
      "R2 U R D2 R' U2 R D2 R' U R2",
      "R2 D U2 R' D' R U2 R' D R D' R2",
      "R2 D' L' D' L U2 L' D L U2 D R2"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [SN] (缓冲 UBL, DBR(D) -> DLF(F))"
  },
  {
    "id": "chichu_c_so",
    "code": "SO",
    "name": "彳亍角块 [SO] (UBL -> DBR -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [SO]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R2 U2 R' D R U2 R' D' R'",
    "algs": [
      "R2 U2 R' D R U2 R' D' R'",
      "R2 D' U2 R' D2 R U2 R' D2 R D R2",
      "R2 U' L D L' U2 L D' L' U' R2",
      "R2 D L' D2 L U2 L' D2 L U2 D' R2"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [SO] (缓冲 UBL, DBR(D) -> DLF(L))"
  },
  {
    "id": "chichu_c_sp",
    "code": "SP",
    "name": "彳亍角块 [SP] (UBL -> DBR -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [SP]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "x' U2 R D R' U2 R D' R' x",
    "algs": [
      "x' U2 R D R' U2 R D' R' x",
      "x' F' D2 F U2 F' D2 F U2 x",
      "F R2 U2 R' D R U2 R' D' R' F'",
      "L U R' U R D R' U' R D' U' L'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [SP] (缓冲 UBL, DBR(D) -> DFR(D))"
  },
  {
    "id": "chichu_c_sq",
    "code": "SQ",
    "name": "彳亍角块 [SQ] (UBL -> DBR -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [SQ]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L F2 L' B2 L F2 L' B2",
    "algs": [
      "L F2 L' B2 L F2 L' B2",
      "Lw F2 L' B2 L F2 L' B2 L Lw'",
      "z' B2 R' F' R B2 R' F R z",
      "F' L F' L' B2 L F L' B2 F"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [SQ] (缓冲 UBL, DBR(D) -> DFR(F))"
  },
  {
    "id": "chichu_c_sr",
    "code": "SR",
    "name": "彳亍角块 [SR] (UBL -> DBR -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [SR]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D' R2 U R D2 R' U' R D2 R D",
    "algs": [
      "D' R2 U R D2 R' U' R D2 R D",
      "R D' F2 R B' R' F2 R B R' D R'"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [SR] (缓冲 UBL, DBR(D) -> DFR(R))"
  },
  {
    "id": "chichu_c_sv",
    "code": "SV",
    "name": "彳亍角块 [SV] (UBL -> DBR -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [SV]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D' L D R' U2 R D' R' U2 R L' D",
    "algs": [
      "D' L D R' U2 R D' R' U2 R L' D",
      "B2 U' L F L' B2 L F' L' B2 U B2"
    ],
    "moves": 12,
    "desc": "三阶彳亍角块三循环 [SV] (缓冲 UBL, DBR(D) -> DBL(D))"
  },
  {
    "id": "chichu_c_sw",
    "code": "SW",
    "name": "彳亍角块 [SW] (UBL -> DBR -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [SW]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R2 U2 R' D2 R U2 R' D2 R'",
    "algs": [
      "R2 U2 R' D2 R U2 R' D2 R'",
      "R2 D' L' D L U2 L' D' L U2 D R2",
      "R2 U' F' D F U2 F' D' F U' R2",
      "R2 B D B' U2 B D' B' U2 R2"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [SW] (缓冲 UBL, DBR(D) -> DBL(B))"
  },
  {
    "id": "chichu_c_sx",
    "code": "SX",
    "name": "彳亍角块 [SX] (UBL -> DBR -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [SX]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L U' L D2 L' U L D2 L2",
    "algs": [
      "L U' L D2 L' U L D2 L2",
      "L D L' D' L U L' D L U' D' L'",
      "L D' B D2 B' U B D2 B' U' D L'",
      "L U B' D' B U B' D B U2 L'"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [SX] (缓冲 UBL, DBR(D) -> DBL(L))"
  },
  {
    "id": "chichu_c_td",
    "code": "TD",
    "name": "彳亍角块 [TD] (UBL -> DBR -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [TD]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' D' B U B' D B U'",
    "algs": [
      "B' D' B U B' D B U'",
      "F B' D' B U B' D B U' F'",
      "F' B' D' B U B' D B U' F",
      "F2 B' D' B U B' D B U' F2"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [TD] (缓冲 UBL, DBR(B) -> UBR(U))"
  },
  {
    "id": "chichu_c_te",
    "code": "TE",
    "name": "彳亍角块 [TE] (UBL -> DBR -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [TE]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L R D R' U2 R D' R' U2 L'",
    "algs": [
      "L R D R' U2 R D' R' U2 L'",
      "F' L R D R' U2 R D' R' U2 L' F",
      "Lw R D R' U2 R D' R' U2 Lw'",
      "L U' L' D L U2 L' D' L U' L'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [TE] (缓冲 UBL, DBR(B) -> UBR(B))"
  },
  {
    "id": "chichu_c_tf",
    "code": "TF",
    "name": "彳亍角块 [TF] (UBL -> DBR -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [TF]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D L' D L' U2 L D' L' U2 L2 D'",
    "algs": [
      "D L' D L' U2 L D' L' U2 L2 D'",
      "U' L D2 R' U2 R D2 R' U2 R L' U",
      "R2 U L' B L F2 L' B' L F2 U' R2",
      "L' D B2 R' F2 R B2 R' F2 R D' L"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [TF] (缓冲 UBL, DBR(B) -> UBR(R))"
  },
  {
    "id": "chichu_c_tg",
    "code": "TG",
    "name": "彳亍角块 [TG] (UBL -> DBR -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [TG]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F D' F' U2 F D F' U2",
    "algs": [
      "F D' F' U2 F D F' U2",
      "D F D2 F' U2 F D2 F' U2 D'",
      "d F D2 F' U2 F D2 F' U2 d'",
      "Dw F D2 F' U2 F D2 F' U2 Dw'"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [TG] (缓冲 UBL, DBR(B) -> URF(U))"
  },
  {
    "id": "chichu_c_th",
    "code": "TH",
    "name": "彳亍角块 [TH] (UBL -> DBR -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [TH]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' F D2 F' U F D2 F' U' B",
    "algs": [
      "B' F D2 F' U F D2 F' U' B",
      "B' U' R D' R' U R D R' B",
      "B' D U' R D2 R' U R D2 R' D' B",
      "D R U' L' D' L U L' D L R' D'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [TH] (缓冲 UBL, DBR(B) -> URF(F))"
  },
  {
    "id": "chichu_c_ti",
    "code": "TI",
    "name": "彳亍角块 [TI] (UBL -> DBR -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [TI]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B U R' D2 R U' R' D2 R B'",
    "algs": [
      "B U R' D2 R U' R' D2 R B'",
      "L U2 L' D L U' L' D' L U' L'",
      "F' D U L' D' L U' L' D L D' F",
      "L D U F' D F U' F' D' F D' L'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [TI] (缓冲 UBL, DBR(B) -> URF(R))"
  },
  {
    "id": "chichu_c_tj",
    "code": "TJ",
    "name": "彳亍角块 [TJ] (UBL -> DBR -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [TJ]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L D2 L' U' L D2 L' U",
    "algs": [
      "L D2 L' U' L D2 L' U",
      "u' U L D2 L' U' L D2 L' u",
      "Uw' U L D2 L' U' L D2 L' Uw",
      "D' R' U L' D L U' L' D' L R D"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [TJ] (缓冲 UBL, DBR(B) -> UFL(U))"
  },
  {
    "id": "chichu_c_tk",
    "code": "TK",
    "name": "彳亍角块 [TK] (UBL -> DBR -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [TK]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F' R' U R D2 R' U' R D2 F",
    "algs": [
      "F' R' U R D2 R' U' R D2 F",
      "B L U R D2 R' U' R D2 R' L' B'",
      "z F D2 F' U F D2 F' U' z'",
      "D L U B D' B' U' B D B' L' D'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [TK] (缓冲 UBL, DBR(B) -> UFL(F))"
  },
  {
    "id": "chichu_c_tl",
    "code": "TL",
    "name": "彳亍角块 [TL] (UBL -> DBR -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [TL]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F2 D' F' U2 F D F' U2 F'",
    "algs": [
      "F2 D' F' U2 F D F' U2 F'",
      "F D F D2 F' U2 F D2 F' U2 D' F'",
      "B' D F' D' F U2 F' D F U2 D' B",
      "F D' U2 B D2 B' U2 B D2 B' D F'"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [TL] (缓冲 UBL, DBR(B) -> UFL(L))"
  },
  {
    "id": "chichu_c_tm",
    "code": "TM",
    "name": "彳亍角块 [TM] (UBL -> DBR -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [TM]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F' D' F' U2 F D F' U2 F2",
    "algs": [
      "F' D' F' U2 F D F' U2 F2",
      "F2 D F D2 F' U2 F D2 F' U2 D' F2",
      "F2 D' U2 B D2 B' U2 B D2 B' D F2",
      "F2 U' B' D' B U2 B' D B U' F2"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [TM] (缓冲 UBL, DBR(B) -> DLF(D))"
  },
  {
    "id": "chichu_c_tn",
    "code": "TN",
    "name": "彳亍角块 [TN] (UBL -> DBR -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [TN]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R' U R D2 R' U' R D2",
    "algs": [
      "R' U R D2 R' U' R D2",
      "Rw' U R D2 R' U' R D2 R' Rw",
      "D L U L' D2 L U' L' D",
      "R' B D' B' U' B D B' U R"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [TN] (缓冲 UBL, DBR(B) -> DLF(F))"
  },
  {
    "id": "chichu_c_to",
    "code": "TO",
    "name": "彳亍角块 [TO] (UBL -> DBR -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [TO]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R' U B' D2 B U' B' D2 B R",
    "algs": [
      "R' U B' D2 B U' B' D2 B R",
      "Rw' U B' D2 B U' B' D2 B Rw",
      "R' U' L D L' U' L D' L' U2 R",
      "F D' L D' L' U' L D L' U D F'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [TO] (缓冲 UBL, DBR(B) -> DLF(L))"
  },
  {
    "id": "chichu_c_tp",
    "code": "TP",
    "name": "彳亍角块 [TP] (UBL -> DBR -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [TP]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "z' U R' D2 R U' R' D2 R z",
    "algs": [
      "z' U R' D2 R U' R' D2 R z",
      "F2 L D2 L' U' L D2 L' U F2",
      "F2 D U L' D' L U' L' D L D' F2",
      "R' U2 F D' F' U' F D F' U' R"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [TP] (缓冲 UBL, DBR(B) -> DFR(D))"
  },
  {
    "id": "chichu_c_tq",
    "code": "TQ",
    "name": "彳亍角块 [TQ] (UBL -> DBR -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [TQ]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F R' U R D2 R' U' R D2 F'",
    "algs": [
      "F R' U R D2 R' U' R D2 F'",
      "F R' B D' B' U' B D B' U R F'",
      "B' R D L U2 L' D' L U2 L' R' B",
      "D' L R U' R' D2 R U R' D2 L' D"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [TQ] (缓冲 UBL, DBR(B) -> DFR(F))"
  },
  {
    "id": "chichu_c_tr",
    "code": "TR",
    "name": "彳亍角块 [TR] (UBL -> DBR -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [TR]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R' U R D R' U' R D'",
    "algs": [
      "R' U R D R' U' R D'",
      "Rw' U R D R' U' R D' R' Rw",
      "x2 R' D R U R' D' R U' x2",
      "R' L' D L U' L' D' L U R"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [TR] (缓冲 UBL, DBR(B) -> DFR(R))"
  },
  {
    "id": "chichu_c_tv",
    "code": "TV",
    "name": "彳亍角块 [TV] (UBL -> DBR -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [TV]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U L' D2 L' U2 L D2 L' U2 L2 U'",
    "algs": [
      "U L' D2 L' U2 L D2 L' U2 L2 U'",
      "R' U B2 R' F' R B2 R' F R U' R",
      "R2 D' B2 L F' L' B2 L F L' D R2"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [TV] (缓冲 UBL, DBR(B) -> DBL(D))"
  },
  {
    "id": "chichu_c_tw",
    "code": "TW",
    "name": "彳亍角块 [TW] (UBL -> DBR -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [TW]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' U R D' R' U' R D R' B",
    "algs": [
      "B' U R D' R' U' R D R' B",
      "z U R D' R' U' R D R' z'",
      "B' D U R D2 R' U' R D2 R' D' B",
      "R' U2 R' D2 R U' R' D2 R U' R"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [TW] (缓冲 UBL, DBR(B) -> DBL(B))"
  },
  {
    "id": "chichu_c_tx",
    "code": "TX",
    "name": "彳亍角块 [TX] (UBL -> DBR -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [TX]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R' U R D' R' U' R D",
    "algs": [
      "R' U R D' R' U' R D",
      "F R' U R D' R' U' R D F'",
      "F' R' U R D' R' U' R D F",
      "Rw' U R D' R' U' R D R' Rw"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [TX] (缓冲 UBL, DBR(B) -> DBL(L))"
  },
  {
    "id": "chichu_c_ud",
    "code": "UD",
    "name": "彳亍角块 [UD] (UBL -> DBR -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [UD]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R D R' U R D' R' U'",
    "algs": [
      "R D R' U R D' R' U'",
      "F R D R' U R D' R' U' F'",
      "F' R D R' U R D' R' U' F",
      "F2 R D R' U R D' R' U' F2"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [UD] (缓冲 UBL, DBR(R) -> UBR(U))"
  },
  {
    "id": "chichu_c_ue",
    "code": "UE",
    "name": "彳亍角块 [UE] (UBL -> DBR -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [UE]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D R2 D2 R U2 R' D2 R U2 R D'",
    "algs": [
      "D R2 D2 R U2 R' D2 R U2 R D'",
      "D R' U2 B D B' U2 B D' B' R D'",
      "R2 D' R B' R' F2 R B R' F2 D R2",
      "D L' R' F2 R B2 R' F2 R B2 L D'"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [UE] (缓冲 UBL, DBR(R) -> UBR(B))"
  },
  {
    "id": "chichu_c_uf",
    "code": "UF",
    "name": "彳亍角块 [UF] (UBL -> DBR -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [UF]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B R D' R' U R D R' U' B'",
    "algs": [
      "B R D' R' U R D R' U' B'",
      "z' R D' R' U R D R' U' z",
      "B D R D2 R' U R D2 R' U' D' B'",
      "U R' F D F' U F D' F' U' R U'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [UF] (缓冲 UBL, DBR(R) -> UBR(R))"
  },
  {
    "id": "chichu_c_ug",
    "code": "UG",
    "name": "彳亍角块 [UG] (UBL -> DBR -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [UG]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U2 L' D L U2 L' D' L",
    "algs": [
      "U2 L' D L U2 L' D' L",
      "D' U2 L' D2 L U2 L' D2 L D",
      "d' U2 L' D2 L U2 L' D2 L d",
      "Dw' U2 L' D2 L U2 L' D2 L Dw"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [UG] (缓冲 UBL, DBR(R) -> URF(U))"
  },
  {
    "id": "chichu_c_uh",
    "code": "UH",
    "name": "彳亍角块 [UH] (UBL -> DBR -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [UH]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' R' D2 R U R' D2 R U' B",
    "algs": [
      "B' R' D2 R U R' D2 R U' B",
      "R U' B D2 B' U B D2 B' R'",
      "U' L' B' D' B U B' D B U' L U",
      "R D B' D' B U B' D B U' D' R'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [UH] (缓冲 UBL, DBR(R) -> URF(F))"
  },
  {
    "id": "chichu_c_ui",
    "code": "UI",
    "name": "彳亍角块 [UI] (UBL -> DBR -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [UI]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F2 D2 F U' F' D2 F U F",
    "algs": [
      "F2 D2 F U' F' D2 F U F",
      "z' R D' R' U2 R D R' U2 z",
      "B2 D' U2 R' D' R U2 R' D R D B2",
      "B2 U' L D2 L' U2 L D2 L' U' B2"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [UI] (缓冲 UBL, DBR(R) -> URF(R))"
  },
  {
    "id": "chichu_c_uj",
    "code": "UJ",
    "name": "彳亍角块 [UJ] (UBL -> DBR -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [UJ]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U L' D L U' L' D' L",
    "algs": [
      "U L' D L U' L' D' L",
      "D' U L' D2 L U' L' D2 L D",
      "d' U L' D2 L U' L' D2 L d",
      "Dw' U L' D2 L U' L' D2 L Dw"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [UJ] (缓冲 UBL, DBR(R) -> UFL(U))"
  },
  {
    "id": "chichu_c_uk",
    "code": "UK",
    "name": "彳亍角块 [UK] (UBL -> DBR -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [UK]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "z R' D2 R U R' D2 R U' z'",
    "algs": [
      "z R' D2 R U R' D2 R U' z'",
      "B2 U' L D2 L' U L D2 L' B2",
      "B2 D L' D' L U L' D L U' D' B2",
      "B2 D' B D2 B' U B D2 B' U' D B2"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [UK] (缓冲 UBL, DBR(R) -> UFL(F))"
  },
  {
    "id": "chichu_c_ul",
    "code": "UL",
    "name": "彳亍角块 [UL] (UBL -> DBR -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [UL]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F U2 L' D L U2 L' D' L F'",
    "algs": [
      "F U2 L' D L U2 L' D' L F'",
      "F D' U2 L' D2 L U2 L' D2 L D F'",
      "F D' F D F' U2 F D' F' U2 D F'",
      "U' L' F D' F' U2 F D F' U2 L U"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [UL] (缓冲 UBL, DBR(R) -> UFL(L))"
  },
  {
    "id": "chichu_c_um",
    "code": "UM",
    "name": "彳亍角块 [UM] (UBL -> DBR -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [UM]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' L U' L' D' L U L' D B",
    "algs": [
      "B' L U' L' D' L U L' D B",
      "U R' U' B' D2 B U B' D2 B R U'",
      "F2 U' R D R' U2 R D' R' U' F2",
      "F2 D R' D2 R U2 R' D2 R U2 D' F2"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [UM] (缓冲 UBL, DBR(R) -> DLF(D))"
  },
  {
    "id": "chichu_c_un",
    "code": "UN",
    "name": "彳亍角块 [UN] (UBL -> DBR -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [UN]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F' D' R U2 R' D R U2 R' F",
    "algs": [
      "F' D' R U2 R' D R U2 R' F",
      "D' R L' D' L U2 L' D L U2 R' D",
      "D' R U2 F D2 F' U2 F D2 F' R' D",
      "U L' F' D2 F U2 F' D2 F U2 L U'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [UN] (缓冲 UBL, DBR(R) -> DLF(F))"
  },
  {
    "id": "chichu_c_uo",
    "code": "UO",
    "name": "彳亍角块 [UO] (UBL -> DBR -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [UO]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D2 F U' F' D2 F U F'",
    "algs": [
      "D2 F U' F' D2 F U F'",
      "D' R U2 R' D2 R U2 R' D'",
      "D R U2 B D B' U2 B D' B' R' D'",
      "D' R B D B' U2 B D' B' U2 R' D"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [UO] (缓冲 UBL, DBR(R) -> DLF(L))"
  },
  {
    "id": "chichu_c_up",
    "code": "UP",
    "name": "彳亍角块 [UP] (UBL -> DBR -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [UP]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F D2 F U' F' D2 F U F2",
    "algs": [
      "F D2 F U' F' D2 F U F2",
      "F2 D U B D B' U' B D' B' D' F2",
      "B' L B' D B U B' D' B U' L' B",
      "F2 U L' D L U' L' D' L F2"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [UP] (缓冲 UBL, DBR(R) -> DFR(D))"
  },
  {
    "id": "chichu_c_uq",
    "code": "UQ",
    "name": "彳亍角块 [UQ] (UBL -> DBR -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [UQ]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D' R U2 R' D R U2 R'",
    "algs": [
      "D' R U2 R' D R U2 R'",
      "Rw R' D' R U2 R' D R U2 Rw'",
      "R U L D' L' U2 L D L' U R'",
      "R D F D' F' U2 F D F' U2 D' R'"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [UQ] (缓冲 UBL, DBR(R) -> DFR(F))"
  },
  {
    "id": "chichu_c_ur",
    "code": "UR",
    "name": "彳亍角块 [UR] (UBL -> DBR -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [UR]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "z' U F D2 F' U' F D2 F' z",
    "algs": [
      "z' U F D2 F' U' F D2 F' z",
      "z' R D' R' U' R D R' U z",
      "D R' U' B D B' U B D' B' R D'",
      "U R' U' B' D' B U B' D B R U'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [UR] (缓冲 UBL, DBR(R) -> DFR(R))"
  },
  {
    "id": "chichu_c_uv",
    "code": "UV",
    "name": "彳亍角块 [UV] (UBL -> DBR -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [UV]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D' B2 L F2 L' B2 L F2 L' D",
    "algs": [
      "D' B2 L F2 L' B2 L F2 L' D",
      "U L' R' F2 R B R' F2 R B' L U'",
      "R2 U B2 R' F R B2 R' F' R U' R2",
      "F D' B2 L F2 L' B2 L F2 L' D F'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [UV] (缓冲 UBL, DBR(R) -> DBL(D))"
  },
  {
    "id": "chichu_c_uw",
    "code": "UW",
    "name": "彳亍角块 [UW] (UBL -> DBR -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [UW]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D B' U' B D' B' U B",
    "algs": [
      "D B' U' B D' B' U B",
      "z B D B' U' B D' B' U z'",
      "B2 D' B D2 B' U' B D2 B' U D B2",
      "B2 U B' D' B U' B' D B'"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [UW] (缓冲 UBL, DBR(R) -> DBL(B))"
  },
  {
    "id": "chichu_c_ux",
    "code": "UX",
    "name": "彳亍角块 [UX] (UBL -> DBR -> DBL)",
    "title": "彳亍盲拧 - 角块三循环 [UX]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L B2 L F L' B2 L F' L2",
    "algs": [
      "L B2 L F L' B2 L F' L2",
      "L D' L' B' L F2 L' B L F2 D L'",
      "U' R2 F R B2 R' F' R B2 R U",
      "U R2 F' R B2 R' F R B2 R U'"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [UX] (缓冲 UBL, DBR(R) -> DBL(L))"
  },
  {
    "id": "chichu_c_vd",
    "code": "VD",
    "name": "彳亍角块 [VD] (UBL -> DBL -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [VD]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U R' F' R B2 R' F R B2 U'",
    "algs": [
      "U R' F' R B2 R' F R B2 U'",
      "F2 U R' F' R B2 R' F R B2 U' F2",
      "u R' F' R B2 R' F R B2 u'",
      "Uw R' F' R B2 R' F R B2 Uw'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [VD] (缓冲 UBL, DBL(D) -> UBR(U))"
  },
  {
    "id": "chichu_c_ve",
    "code": "VE",
    "name": "彳亍角块 [VE] (UBL -> DBL -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [VE]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D' L U2 L D2 L' U2 L D2 L2 D",
    "algs": [
      "D' L U2 L D2 L' U2 L D2 L2 D",
      "D' L B' D' B U2 B' D B U2 L' D",
      "L2 D F2 L' B L F2 L' B' L D' L2",
      "D' R B2 L F2 L' B2 L F2 L' R' D"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [VE] (缓冲 UBL, DBL(D) -> UBR(B))"
  },
  {
    "id": "chichu_c_vf",
    "code": "VF",
    "name": "彳亍角块 [VF] (UBL -> DBL -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [VF]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D' R2 U2 R' D' R U2 R' D R' D",
    "algs": [
      "D' R2 U2 R' D' R U2 R' D R' D",
      "B R L U L' D2 L U' L' D2 R' B'",
      "U R' L U2 L' D2 L U2 L' D2 R U'",
      "L2 U' F2 R B' R' F2 R B R' U L2"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [VF] (缓冲 UBL, DBL(D) -> UBR(R))"
  },
  {
    "id": "chichu_c_vg",
    "code": "VG",
    "name": "彳亍角块 [VG] (UBL -> DBL -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [VG]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B L2 F' L' B2 L F L' B2 L' B'",
    "algs": [
      "B L2 F' L' B2 L F L' B2 L' B'"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [VG] (缓冲 UBL, DBL(D) -> URF(U))"
  },
  {
    "id": "chichu_c_vh",
    "code": "VH",
    "name": "彳亍角块 [VH] (UBL -> DBL -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [VH]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D' L F' L' B2 L F L' B2 D",
    "algs": [
      "D' L F' L' B2 L F L' B2 D",
      "U L' B' R' F2 R B R' F2 R L U'",
      "R U R' F' R B2 R' F R B2 U' R'",
      "F2 U R' F2 R B2 R' F2 R B2 U' F2"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [VH] (缓冲 UBL, DBL(D) -> URF(F))"
  },
  {
    "id": "chichu_c_vi",
    "code": "VI",
    "name": "彳亍角块 [VI] (UBL -> DBL -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [VI]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U R' F R B2 R' F' R B2 U'",
    "algs": [
      "U R' F R B2 R' F' R B2 U'",
      "D2 F' R B' R' F R B R' D2",
      "D' R B L F2 L' B' L F2 L' R' D",
      "U2 B' L F' L' B L F L' U2"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [VI] (缓冲 UBL, DBL(D) -> URF(R))"
  },
  {
    "id": "chichu_c_vj",
    "code": "VJ",
    "name": "彳亍角块 [VJ] (UBL -> DBL -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [VJ]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D' L F L' B2 L F' L' B2 D",
    "algs": [
      "D' L F L' B2 L F' L' B2 D",
      "D2 F2 L' B' L F2 L' B L D2",
      "U2 B2 R' F' R B2 R' F R U2",
      "R D' L F L' B2 L F' L' B2 D R'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [VJ] (缓冲 UBL, DBL(D) -> UFL(U))"
  },
  {
    "id": "chichu_c_vk",
    "code": "VK",
    "name": "彳亍角块 [VK] (UBL -> DBL -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [VK]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' L U2 L D L' U2 L D' L2 B",
    "algs": [
      "B' L U2 L D L' U2 L D' L2 B",
      "B' L B' D2 B U2 B' D2 B U2 L' B",
      "U L2 U2 L D L' U2 L D' L U'",
      "B R D2 R U' R' D2 R U R2 B'"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [VK] (缓冲 UBL, DBL(D) -> UFL(F))"
  },
  {
    "id": "chichu_c_vl",
    "code": "VL",
    "name": "彳亍角块 [VL] (UBL -> DBL -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [VL]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U R' U2 R' D2 R U2 R' D2 R2 U'",
    "algs": [
      "U R' U2 R' D2 R U2 R' D2 R2 U'",
      "B' L U2 F' D' F U2 F' D F L' B",
      "U R' B D B' U2 B D' B' U2 R U'",
      "U L' B2 R' F2 R B2 R' F2 R L U'"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [VL] (缓冲 UBL, DBL(D) -> UFL(L))"
  },
  {
    "id": "chichu_c_vm",
    "code": "VM",
    "name": "彳亍角块 [VM] (UBL -> DBL -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [VM]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' L R D' R' U2 R D R' U2 L' B",
    "algs": [
      "B' L R D' R' U2 R D R' U2 L' B",
      "U R' L U2 L' D' L U2 L' D R U'",
      "L2 D F2 L' B' L F2 L' B L D' L2"
    ],
    "moves": 12,
    "desc": "三阶彳亍角块三循环 [VM] (缓冲 UBL, DBL(D) -> DLF(D))"
  },
  {
    "id": "chichu_c_vn",
    "code": "VN",
    "name": "彳亍角块 [VN] (UBL -> DBL -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [VN]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U R' F2 R B2 R' F2 R B2 U'",
    "algs": [
      "U R' F2 R B2 R' F2 R B2 U'",
      "D' R B' L F2 L' B L F2 L' R' D",
      "R U R' F2 R B2 R' F2 R B2 U' R'",
      "R' U R' F2 R B2 R' F2 R B2 U' R"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [VN] (缓冲 UBL, DBL(D) -> DLF(F))"
  },
  {
    "id": "chichu_c_vo",
    "code": "VO",
    "name": "彳亍角块 [VO] (UBL -> DBL -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [VO]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D' R2 U2 R' D2 R U2 R' D2 R' D",
    "algs": [
      "D' R2 U2 R' D2 R U2 R' D2 R' D",
      "F2 U R' F R B2 R' F' R B2 U' F2",
      "F D' L F L' B2 L F' L' B2 D F'"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [VO] (缓冲 UBL, DBL(D) -> DLF(L))"
  },
  {
    "id": "chichu_c_vp",
    "code": "VP",
    "name": "彳亍角块 [VP] (UBL -> DBL -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [VP]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' L B' D B U2 B' D' B U2 L' B",
    "algs": [
      "B' L B' D B U2 B' D' B U2 L' B",
      "R2 U R' F' R B2 R' F R B2 U' R2",
      "F2 D' L F L' B2 L F' L' B2 D F2",
      "R D' L F' L' B2 L F L' B2 D R'"
    ],
    "moves": 12,
    "desc": "三阶彳亍角块三循环 [VP] (缓冲 UBL, DBL(D) -> DFR(D))"
  },
  {
    "id": "chichu_c_vq",
    "code": "VQ",
    "name": "彳亍角块 [VQ] (UBL -> DBL -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [VQ]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' L U2 L D' L' U2 L D L2 B",
    "algs": [
      "B' L U2 L D' L' U2 L D L2 B",
      "D' R2 U2 R' D R U2 R' D' R' D",
      "U R' L U2 L' D L U2 L' D' R U'",
      "B R D2 R U R' D2 R U' R2 B'"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [VQ] (缓冲 UBL, DBL(D) -> DFR(F))"
  },
  {
    "id": "chichu_c_vr",
    "code": "VR",
    "name": "彳亍角块 [VR] (UBL -> DBL -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [VR]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U L2 U2 L D' L' U2 L D L U'",
    "algs": [
      "U L2 U2 L D' L' U2 L D L U'",
      "B R L U2 L' D2 L U2 L' D2 R' B'",
      "L2 D F2 L' B2 L F2 L' B2 L D' L2",
      "R U R' F R B2 R' F' R B2 U' R'"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [VR] (缓冲 UBL, DBL(D) -> DFR(R))"
  },
  {
    "id": "chichu_c_vs",
    "code": "VS",
    "name": "彳亍角块 [VS] (UBL -> DBL -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [VS]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D' L R' U2 R D R' U2 R D' L' D",
    "algs": [
      "D' L R' U2 R D R' U2 R D' L' D",
      "B2 U' B2 L F L' B2 L F' L' U B2"
    ],
    "moves": 12,
    "desc": "三阶彳亍角块三循环 [VS] (缓冲 UBL, DBL(D) -> DBR(D))"
  },
  {
    "id": "chichu_c_vt",
    "code": "VT",
    "name": "彳亍角块 [VT] (UBL -> DBL -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [VT]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U L2 U2 L D2 L' U2 L D2 L U'",
    "algs": [
      "U L2 U2 L D2 L' U2 L D2 L U'",
      "R' U R' F' R B2 R' F R B2 U' R",
      "R2 D' L F' L' B2 L F L' B2 D R2"
    ],
    "moves": 11,
    "desc": "三阶彳亍角块三循环 [VT] (缓冲 UBL, DBL(D) -> DBR(B))"
  },
  {
    "id": "chichu_c_vu",
    "code": "VU",
    "name": "彳亍角块 [VU] (UBL -> DBL -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [VU]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D' L F2 L' B2 L F2 L' B2 D",
    "algs": [
      "D' L F2 L' B2 L F2 L' B2 D",
      "U L' B R' F2 R B' R' F2 R L U'",
      "R2 U R' F R B2 R' F' R B2 U' R2",
      "F D' L F2 L' B2 L F2 L' B2 D F'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [VU] (缓冲 UBL, DBL(D) -> DBR(R))"
  },
  {
    "id": "chichu_c_wd",
    "code": "WD",
    "name": "彳亍角块 [WD] (UBL -> DBL -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [WD]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U' B D B' U B D' B'",
    "algs": [
      "U' B D B' U B D' B'",
      "U' R B D B' U B D' B' U' R' U",
      "U' R' B D B' U B D' B' U' R U",
      "F2 U' B D B' U B D' B' F2"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [WD] (缓冲 UBL, DBL(B) -> UBR(U))"
  },
  {
    "id": "chichu_c_we",
    "code": "WE",
    "name": "彳亍角块 [WE] (UBL -> DBL -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [WE]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R2 D2 R U2 R' D2 R U2 R",
    "algs": [
      "R2 D2 R U2 R' D2 R U2 R",
      "F R2 D2 R U2 R' D2 R U2 R F'",
      "F' R2 D2 R U2 R' D2 R U2 R F",
      "Rw' R' D2 R U2 R' D2 R U2 Rw"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [WE] (缓冲 UBL, DBL(B) -> UBR(B))"
  },
  {
    "id": "chichu_c_wf",
    "code": "WF",
    "name": "彳亍角块 [WF] (UBL -> DBL -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [WF]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' R D R' U R D' R' U' B",
    "algs": [
      "B' R D R' U R D' R' U' B",
      "z R D R' U R D' R' U' z'",
      "B L U L' D L U' L' D' B'",
      "U' L B D' B' U B D B' U' L' U"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [WF] (缓冲 UBL, DBL(B) -> UBR(R))"
  },
  {
    "id": "chichu_c_wg",
    "code": "WG",
    "name": "彳亍角块 [WG] (UBL -> DBL -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [WG]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R' D2 R U2 R' D2 R U2",
    "algs": [
      "R' D2 R U2 R' D2 R U2",
      "y' U2 L D L' U2 L D' L' y",
      "D' U2 L' D L U2 L' D' L D",
      "d' U2 L' D L U2 L' D' L d"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [WG] (缓冲 UBL, DBL(B) -> URF(U))"
  },
  {
    "id": "chichu_c_wh",
    "code": "WH",
    "name": "彳亍角块 [WH] (UBL -> DBL -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [WH]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R U' B D B' U B D' B' R'",
    "algs": [
      "R U' B D B' U B D' B' R'",
      "U L B' D2 B U B' D2 B U' L' U'",
      "U' L' B' D2 B U B' D2 B U' L U",
      "R D B' D2 B U B' D2 B U' D' R'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [WH] (缓冲 UBL, DBL(B) -> URF(F))"
  },
  {
    "id": "chichu_c_wi",
    "code": "WI",
    "name": "彳亍角块 [WI] (UBL -> DBL -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [WI]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B D' B U' B' D B U B2",
    "algs": [
      "B D' B U' B' D B U B2",
      "B2 D R D' R' U' R D R' U D' B2",
      "L2 U2 R D2 R' U R D2 R' U L2",
      "L2 D U' R' D' R U R' D R D' L2"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [WI] (缓冲 UBL, DBL(B) -> URF(R))"
  },
  {
    "id": "chichu_c_wj",
    "code": "WJ",
    "name": "彳亍角块 [WJ] (UBL -> DBL -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [WJ]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F' D F U' F' D' F U",
    "algs": [
      "F' D F U' F' D' F U",
      "R F' D F U' F' D' F U R'",
      "R' F' D F U' F' D' F U R",
      "R2 F' D F U' F' D' F U R2"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [WJ] (缓冲 UBL, DBL(B) -> UFL(U))"
  },
  {
    "id": "chichu_c_wk",
    "code": "WK",
    "name": "彳亍角块 [WK] (UBL -> DBL -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [WK]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B D' B U2 B' D B U2 B2",
    "algs": [
      "B D' B U2 B' D B U2 B2",
      "B D L' U' L D L' U L D2 B'",
      "B D2 R U' R' D R U R' D B'",
      "F2 U' D2 R U' R' D2 R U R' U F2"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [WK] (缓冲 UBL, DBL(B) -> UFL(F))"
  },
  {
    "id": "chichu_c_wl",
    "code": "WL",
    "name": "彳亍角块 [WL] (UBL -> DBL -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [WL]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F R' D2 R U2 R' D2 R U2 F'",
    "algs": [
      "F R' D2 R U2 R' D2 R U2 F'",
      "F D' U2 L' D L U2 L' D' L D F'",
      "U R' L' D' L U2 L' D L U2 R U'",
      "U R' U2 F D2 F' U2 F D2 F' R U'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [WL] (缓冲 UBL, DBL(B) -> UFL(L))"
  },
  {
    "id": "chichu_c_wm",
    "code": "WM",
    "name": "彳亍角块 [WM] (UBL -> DBL -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [WM]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B2 D2 B U B' D2 B U' B",
    "algs": [
      "B2 D2 B U B' D2 B U' B",
      "B' D U' L' D2 L U L' D2 L D' B",
      "U L U' B D B' U B D' B' L' U'",
      "B' D' U' B D B' U B D' B' D B"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [WM] (缓冲 UBL, DBL(B) -> DLF(D))"
  },
  {
    "id": "chichu_c_wn",
    "code": "WN",
    "name": "彳亍角块 [WN] (UBL -> DBL -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [WN]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F' D2 R U2 R' D2 R U2 R' F",
    "algs": [
      "F' D2 R U2 R' D2 R U2 R' F",
      "F' R U2 B D B' U2 B D' B' R' F",
      "D L D2 R U' R' D2 R U R' L' D'",
      "D' R D2 L U L' D2 L U' L' R' D"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [WN] (缓冲 UBL, DBL(B) -> DLF(F))"
  },
  {
    "id": "chichu_c_wo",
    "code": "WO",
    "name": "彳亍角块 [WO] (UBL -> DBL -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [WO]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D F U' F' D' F U F'",
    "algs": [
      "D F U' F' D' F U F'",
      "F R F' D F U' F' D' F U R' F'",
      "F R' F' D F U' F' D' F U R F'",
      "L2 F' D' F U' F' D F U L2"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [WO] (缓冲 UBL, DBL(B) -> DLF(L))"
  },
  {
    "id": "chichu_c_wp",
    "code": "WP",
    "name": "彳亍角块 [WP] (UBL -> DBL -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [WP]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F D F U' F' D' F U F2",
    "algs": [
      "F D F U' F' D' F U F2",
      "F2 U B D B' U' B D' B' F2",
      "R2 U' B D B' U B D' B' R2",
      "B2 D B U B' D' B U' B"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [WP] (缓冲 UBL, DBL(B) -> DFR(D))"
  },
  {
    "id": "chichu_c_wq",
    "code": "WQ",
    "name": "彳亍角块 [WQ] (UBL -> DBL -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [WQ]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' U' B D2 B' U B D2",
    "algs": [
      "B' U' B D2 B' U B D2",
      "x2 U2 R D2 R' U2 R D2 R' x2",
      "R D R' D R U2 R' D' R U2 D' R'",
      "D2 R U2 R' D2 R U2 R'"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [WQ] (缓冲 UBL, DBL(B) -> DFR(F))"
  },
  {
    "id": "chichu_c_wr",
    "code": "WR",
    "name": "彳亍角块 [WR] (UBL -> DBL -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [WR]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "z B' D2 B U B' D2 B U' z'",
    "algs": [
      "z B' D2 B U B' D2 B U' z'",
      "U L U' B D2 B' U B D2 B' L' U'",
      "F' D R' D R U2 R' D' R U2 D' F",
      "F' R' D2 R U2 R' D2 R U2 F"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [WR] (缓冲 UBL, DBL(B) -> DFR(R))"
  },
  {
    "id": "chichu_c_ws",
    "code": "WS",
    "name": "彳亍角块 [WS] (UBL -> DBL -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [WS]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R D2 R U2 R' D2 R U2 R2",
    "algs": [
      "R D2 R U2 R' D2 R U2 R2",
      "R2 D' U2 L' D L U2 L' D' L D R2",
      "R2 U F' D F U2 F' D' F U R2",
      "R2 U2 B D B' U2 B D' B' R2"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [WS] (缓冲 UBL, DBL(B) -> DBR(D))"
  },
  {
    "id": "chichu_c_wt",
    "code": "WT",
    "name": "彳亍角块 [WT] (UBL -> DBL -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [WT]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' R D' R' U R D R' U' B",
    "algs": [
      "B' R D' R' U R D R' U' B",
      "z R D' R' U R D R' U' z'",
      "B' D R D2 R' U R D2 R' U' D' B",
      "R' U R' D2 R U R' D2 R U2 R"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [WT] (缓冲 UBL, DBL(B) -> DBR(B))"
  },
  {
    "id": "chichu_c_wu",
    "code": "WU",
    "name": "彳亍角块 [WU] (UBL -> DBL -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [WU]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' U' B D B' U B D'",
    "algs": [
      "B' U' B D B' U B D'",
      "z U' B D B' U B D' B' z'",
      "B2 D' U' B D2 B' U B D2 B' D B2",
      "B D' B U B' D B U' B2"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [WU] (缓冲 UBL, DBL(B) -> DBR(R))"
  },
  {
    "id": "chichu_c_xd",
    "code": "XD",
    "name": "彳亍角块 [XD] (UBL -> DBL -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [XD]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R D' R' U R D R' U'",
    "algs": [
      "R D' R' U R D R' U'",
      "F R D' R' U R D R' U' F'",
      "F' R D' R' U R D R' U' F",
      "F2 R D' R' U R D R' U' F2"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [XD] (缓冲 UBL, DBL(L) -> UBR(U))"
  },
  {
    "id": "chichu_c_xe",
    "code": "XE",
    "name": "彳亍角块 [XE] (UBL -> DBL -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [XE]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R' U2 L' D' L U2 L' D L R",
    "algs": [
      "R' U2 L' D' L U2 L' D L R",
      "F R' U2 L' D' L U2 L' D L R F'",
      "F' R' U2 L' D' L U2 L' D L R F",
      "Rw' U2 L' D' L U2 L' D L Rw"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [XE] (缓冲 UBL, DBL(L) -> UBR(B))"
  },
  {
    "id": "chichu_c_xf",
    "code": "XF",
    "name": "彳亍角块 [XF] (UBL -> DBL -> UBR)",
    "title": "彳亍盲拧 - 角块三循环 [XF]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L' D L' U2 L D' L' U2 L2",
    "algs": [
      "L' D L' U2 L D' L' U2 L2",
      "L2 D' F' D F U2 F' D' F U2 D L2",
      "L2 D U2 B' D B U2 B' D' B D' L2",
      "L2 U2 B' D2 B U2 B' D2 B L2"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [XF] (缓冲 UBL, DBL(L) -> UBR(R))"
  },
  {
    "id": "chichu_c_xg",
    "code": "XG",
    "name": "彳亍角块 [XG] (UBL -> DBL -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [XG]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U2 L' D' L U2 L' D L",
    "algs": [
      "U2 L' D' L U2 L' D L",
      "D' F D' F' U2 F D F' U2 D",
      "d' F D' F' U2 F D F' U2 d",
      "Dw' F D' F' U2 F D F' U2 Dw"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [XG] (缓冲 UBL, DBL(L) -> URF(U))"
  },
  {
    "id": "chichu_c_xh",
    "code": "XH",
    "name": "彳亍角块 [XH] (UBL -> DBL -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [XH]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L F' L' B' L F L' B",
    "algs": [
      "L F' L' B' L F L' B",
      "L D F' L' B' L F L' B L D' L'",
      "L D' F' L' B' L F L' B L D L'",
      "Lw F' L' B' L F L' B L Lw'"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [XH] (缓冲 UBL, DBL(L) -> URF(F))"
  },
  {
    "id": "chichu_c_xi",
    "code": "XI",
    "name": "彳亍角块 [XI] (UBL -> DBL -> URF)",
    "title": "彳亍盲拧 - 角块三循环 [XI]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F' U L' D' L U' L' D L F",
    "algs": [
      "F' U L' D' L U' L' D L F",
      "F' R U L' D' L U' L' D L R' F",
      "F' R' U L' D' L U' L' D L R F",
      "x' U L' D2 L U' L' D2 L x"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [XI] (缓冲 UBL, DBL(L) -> URF(R))"
  },
  {
    "id": "chichu_c_xj",
    "code": "XJ",
    "name": "彳亍角块 [XJ] (UBL -> DBL -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [XJ]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "U L' D' L U' L' D L",
    "algs": [
      "U L' D' L U' L' D L",
      "R U L' D' L U' L' D L R'",
      "R' U L' D' L U' L' D L R",
      "R2 U L' D' L U' L' D L R2"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [XJ] (缓冲 UBL, DBL(L) -> UFL(U))"
  },
  {
    "id": "chichu_c_xk",
    "code": "XK",
    "name": "彳亍角块 [XK] (UBL -> DBL -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [XK]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F' L U L' D' L U' L' D F",
    "algs": [
      "F' L U L' D' L U' L' D F",
      "L F' D' F U' F' D F U L'",
      "D L' U B D B' U' B D' B' L D'",
      "L U B D' B' U' B D B' L'"
    ],
    "moves": 10,
    "desc": "三阶彳亍角块三循环 [XK] (缓冲 UBL, DBL(L) -> UFL(F))"
  },
  {
    "id": "chichu_c_xl",
    "code": "XL",
    "name": "彳亍角块 [XL] (UBL -> DBL -> UFL)",
    "title": "彳亍盲拧 - 角块三循环 [XL]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F2 D2 F' U2 F D2 F' U2 F'",
    "algs": [
      "F2 D2 F' U2 F D2 F' U2 F'",
      "B2 D U2 F' D F U2 F' D' F D' B2",
      "B2 U2 F' D2 F U2 F' D2 F B2",
      "U' L' U2 B D' B' U2 B D B' L U"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [XL] (缓冲 UBL, DBL(L) -> UFL(L))"
  },
  {
    "id": "chichu_c_xm",
    "code": "XM",
    "name": "彳亍角块 [XM] (UBL -> DBL -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [XM]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "F' D2 F' U2 F D2 F' U2 F2",
    "algs": [
      "F' D2 F' U2 F D2 F' U2 F2",
      "F2 D U2 B D' B' U2 B D B' D' F2",
      "D R' D2 R' U R D2 R' U' R2 D'",
      "F' D' R' U R D2 R' U' R D' F"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [XM] (缓冲 UBL, DBL(L) -> DLF(D))"
  },
  {
    "id": "chichu_c_xn",
    "code": "XN",
    "name": "彳亍角块 [XN] (UBL -> DBL -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [XN]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L U L' D' L U' L' D",
    "algs": [
      "L U L' D' L U' L' D",
      "Lw U L' D' L U' L' D L Lw'",
      "x' U L' D' L U' L' D L x",
      "L2 D U L' D2 L U' L' D2 L D' L2"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [XN] (缓冲 UBL, DBL(L) -> DLF(F))"
  },
  {
    "id": "chichu_c_xo",
    "code": "XO",
    "name": "彳亍角块 [XO] (UBL -> DBL -> DLF)",
    "title": "彳亍盲拧 - 角块三循环 [XO]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "B' R' F2 R B' R' F2 R B2",
    "algs": [
      "B' R' F2 R B' R' F2 R B2",
      "z B L F L' B' L F' L' z'",
      "B' D B L F2 L' B' L F2 L' D' B",
      "z R' F R B' R' F' R B z'"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [XO] (缓冲 UBL, DBL(L) -> DLF(L))"
  },
  {
    "id": "chichu_c_xp",
    "code": "XP",
    "name": "彳亍角块 [XP] (UBL -> DBL -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [XP]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "R' D' R' U R D R' U' R2",
    "algs": [
      "R' D' R' U R D R' U' R2",
      "F2 U2 R D' R' U' R D R' U' F2",
      "R2 D R D2 R' U R D2 R' U' D' R2",
      "L2 D' L' U' L D L' U L'"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [XP] (缓冲 UBL, DBL(L) -> DFR(D))"
  },
  {
    "id": "chichu_c_xq",
    "code": "XQ",
    "name": "彳亍角块 [XQ] (UBL -> DBL -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [XQ]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L F2 L' B' L F2 L' B",
    "algs": [
      "L F2 L' B' L F2 L' B",
      "Lw F2 L' B' L F2 L' B L Lw'",
      "B' D' R' F2 R B' R' F2 R B D B",
      "F' L F' L' B' L F L' B F"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [XQ] (缓冲 UBL, DBL(L) -> DFR(F))"
  },
  {
    "id": "chichu_c_xr",
    "code": "XR",
    "name": "彳亍角块 [XR] (UBL -> DBL -> DFR)",
    "title": "彳亍盲拧 - 角块三循环 [XR]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L U L' D2 L U' L' D2",
    "algs": [
      "L U L' D2 L U' L' D2",
      "Lw U L' D2 L U' L' D2 L Lw'",
      "L U2 B' D B U' B' D' B U' L'",
      "L D' L D L' U' L D' L' U D L'"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [XR] (缓冲 UBL, DBL(L) -> DFR(R))"
  },
  {
    "id": "chichu_c_xs",
    "code": "XS",
    "name": "彳亍角块 [XS] (UBL -> DBL -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [XS]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L2 D2 L' U' L D2 L' U L'",
    "algs": [
      "L2 D2 L' U' L D2 L' U L'",
      "L D U L' D' L U' L' D L D' L'",
      "L D' U B D2 B' U' B D2 B' D L'",
      "L U2 B' D' B U' B' D B U' L'"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [XS] (缓冲 UBL, DBL(L) -> DBR(D))"
  },
  {
    "id": "chichu_c_xt",
    "code": "XT",
    "name": "彳亍角块 [XT] (UBL -> DBL -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [XT]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "D' R' U R D R' U' R",
    "algs": [
      "D' R' U R D R' U' R",
      "F D' R' U R D R' U' R F'",
      "F' D' R' U R D R' U' R F",
      "Rw' R D' R' U R D R' U' Rw"
    ],
    "moves": 8,
    "desc": "三阶彳亍角块三循环 [XT] (缓冲 UBL, DBL(L) -> DBR(B))"
  },
  {
    "id": "chichu_c_xu",
    "code": "XU",
    "name": "彳亍角块 [XU] (UBL -> DBL -> DBR)",
    "title": "彳亍盲拧 - 角块三循环 [XU]",
    "group": "彳亍盲拧 - 角块三循环",
    "alg": "L2 F L' B2 L F' L' B2 L'",
    "algs": [
      "L2 F L' B2 L F' L' B2 L'",
      "L D' F2 L' B' L F2 L' B L D L'",
      "U' R' B2 R' F R B2 R' F' R2 U",
      "U R' B2 R' F' R B2 R' F R2 U'"
    ],
    "moves": 9,
    "desc": "三阶彳亍角块三循环 [XU] (缓冲 UBL, DBL(L) -> DBR(R))"
  },
  {
    "id": "chichu_flip_uf",
    "code": "CD",
    "name": "彳亍棱块原地翻 [CD] (UF缓冲翻色)",
    "title": "彳亍棱块原地翻 [CD] (UF缓冲翻色)",
    "group": "彳亍盲拧 - 棱块原地翻",
    "alg": "r U R' U' M U R U' R'",
    "algs": [
      "r U R' U' M U R U' R'",
      "(M' U)4 (M' U')4"
    ],
    "moves": 9,
    "desc": "UF缓冲棱块原地翻色公式"
  },
  {
    "id": "chichu_flip_ub",
    "code": "AB",
    "name": "彳亍棱块原地翻 [AB] (UB棱翻色)",
    "title": "彳亍棱块原地翻 [AB] (UB棱翻色)",
    "group": "彳亍盲拧 - 棱块原地翻",
    "alg": "U2 r U R' U' M U R U' R' U2",
    "algs": [
      "U2 r U R' U' M U R U' R' U2"
    ],
    "moves": 11,
    "desc": "UB棱原地翻色公式"
  },
  {
    "id": "chichu_flip_ul",
    "code": "EF",
    "name": "彳亍棱块原地翻 [EF] (UL棱翻色)",
    "title": "彳亍棱块原地翻 [EF] (UL棱翻色)",
    "group": "彳亍盲拧 - 棱块原地翻",
    "alg": "U r U R' U' M U R U' R' U'",
    "algs": [
      "U r U R' U' M U R U' R' U'"
    ],
    "moves": 11,
    "desc": "UL棱原地翻色公式"
  },
  {
    "id": "chichu_flip_ur",
    "code": "GH",
    "name": "彳亍棱块原地翻 [GH] (UR棱翻色)",
    "title": "彳亍棱块原地翻 [GH] (UR棱翻色)",
    "group": "彳亍盲拧 - 棱块原地翻",
    "alg": "U' r U R' U' M U R U' R' U",
    "algs": [
      "U' r U R' U' M U R U' R' U"
    ],
    "moves": 11,
    "desc": "UR棱原地翻色公式"
  },
  {
    "id": "chichu_flip_fl",
    "code": "IJ",
    "name": "彳亍棱块原地翻 [IJ] (FL棱翻色)",
    "title": "彳亍棱块原地翻 [IJ] (FL棱翻色)",
    "group": "彳亍盲拧 - 棱块原地翻",
    "alg": "L' r U R' U' M U R U' R' L",
    "algs": [
      "L' r U R' U' M U R U' R' L"
    ],
    "moves": 11,
    "desc": "FL棱原地翻色公式"
  },
  {
    "id": "chichu_flip_fr",
    "code": "KL",
    "name": "彳亍棱块原地翻 [KL] (FR棱翻色)",
    "title": "彳亍棱块原地翻 [KL] (FR棱翻色)",
    "group": "彳亍盲拧 - 棱块原地翻",
    "alg": "R r U R' U' M U R U' R' R'",
    "algs": [
      "R r U R' U' M U R U' R' R'"
    ],
    "moves": 11,
    "desc": "FR棱原地翻色公式"
  },
  {
    "id": "chichu_flip_bl",
    "code": "MN",
    "name": "彳亍棱块原地翻 [MN] (BL棱翻色)",
    "title": "彳亍棱块原地翻 [MN] (BL棱翻色)",
    "group": "彳亍盲拧 - 棱块原地翻",
    "alg": "L r U R' U' M U R U' R' L'",
    "algs": [
      "L r U R' U' M U R U' R' L'"
    ],
    "moves": 11,
    "desc": "BL棱原地翻色公式"
  },
  {
    "id": "chichu_flip_br",
    "code": "OP",
    "name": "彳亍棱块原地翻 [OP] (BR棱翻色)",
    "title": "彳亍棱块原地翻 [OP] (BR棱翻色)",
    "group": "彳亍盲拧 - 棱块原地翻",
    "alg": "R' r U R' U' M U R U' R' R",
    "algs": [
      "R' r U R' U' M U R U' R' R"
    ],
    "moves": 11,
    "desc": "BR棱原地翻色公式"
  },
  {
    "id": "chichu_flip_df",
    "code": "QR",
    "name": "彳亍棱块原地翻 [QR] (DF棱翻色)",
    "title": "彳亍棱块原地翻 [QR] (DF棱翻色)",
    "group": "彳亍盲拧 - 棱块原地翻",
    "alg": "M2 r U R' U' M U R U' R' M2",
    "algs": [
      "M2 r U R' U' M U R U' R' M2"
    ],
    "moves": 11,
    "desc": "DF棱原地翻色公式"
  },
  {
    "id": "chichu_flip_dl",
    "code": "ST",
    "name": "彳亍棱块原地翻 [ST] (DL棱翻色)",
    "title": "彳亍棱块原地翻 [ST] (DL棱翻色)",
    "group": "彳亍盲拧 - 棱块原地翻",
    "alg": "D M2 r U R' U' M U R U' R' M2 D'",
    "algs": [
      "D M2 r U R' U' M U R U' R' M2 D'"
    ],
    "moves": 13,
    "desc": "DL棱原地翻色公式"
  },
  {
    "id": "chichu_flip_db",
    "code": "UV",
    "name": "彳亍棱块原地翻 [UV] (DB棱翻色)",
    "title": "彳亍棱块原地翻 [UV] (DB棱翻色)",
    "group": "彳亍盲拧 - 棱块原地翻",
    "alg": "D2 M2 r U R' U' M U R U' R' M2 D2",
    "algs": [
      "D2 M2 r U R' U' M U R U' R' M2 D2"
    ],
    "moves": 13,
    "desc": "DB棱原地翻色公式"
  },
  {
    "id": "chichu_flip_dr",
    "code": "WX",
    "name": "彳亍棱块原地翻 [WX] (DR棱翻色)",
    "title": "彳亍棱块原地翻 [WX] (DR棱翻色)",
    "group": "彳亍盲拧 - 棱块原地翻",
    "alg": "D' M2 r U R' U' M U R U' R' M2 D",
    "algs": [
      "D' M2 r U R' U' M U R U' R' M2 D"
    ],
    "moves": 13,
    "desc": "DR棱原地翻色公式"
  },
  {
    "id": "chichu_eo_uf_ub_double",
    "code": "EO_UF_UB",
    "name": "彳亍双棱翻色 (UF+UB相对翻色)",
    "title": "彳亍双棱翻色 (UF+UB相对翻色)",
    "group": "彳亍盲拧 - 翻色与奇偶",
    "alg": "M' U M' U M' U2 M U M U M U2",
    "algs": [
      "M' U M' U M' U2 M U M U M U2",
      "r U R' U' M U R U' R'"
    ],
    "moves": 12,
    "desc": "顶层相对双棱(UF+UB)标准高速翻色"
  },
  {
    "id": "chichu_eo_uf_ul_adjacent",
    "code": "EO_UF_UL",
    "name": "彳亍双棱翻色 (UF+UL相邻翻色)",
    "title": "彳亍双棱翻色 (UF+UL相邻翻色)",
    "group": "彳亍盲拧 - 翻色与奇偶",
    "alg": "r' U2 R2 U R' U' r' U2 R2 U R' U' r'",
    "algs": [
      "r' U2 R2 U R' U' r' U2 R2 U R' U' r'"
    ],
    "moves": 13,
    "desc": "顶层相邻双棱(UF+UL)高效翻色"
  },
  {
    "id": "chichu_eo_uf_ur_adjacent",
    "code": "EO_UF_UR",
    "name": "彳亍双棱翻色 (UF+UR相邻翻色)",
    "title": "彳亍双棱翻色 (UF+UR相邻翻色)",
    "group": "彳亍盲拧 - 翻色与奇偶",
    "alg": "r U2 R2 U' R U r U2 R2 U' R U r",
    "algs": [
      "r U2 R2 U' R U r U2 R2 U' R U r"
    ],
    "moves": 13,
    "desc": "顶层相邻双棱(UF+UR)高效翻色"
  },
  {
    "id": "chichu_eo_uf_df_vertical",
    "code": "EO_UF_DF",
    "name": "彳亍双棱翻色 (UF+DF上下纵向翻色)",
    "title": "彳亍双棱翻色 (UF+DF上下纵向翻色)",
    "group": "彳亍盲拧 - 翻色与奇偶",
    "alg": "M' U2 M U2 M' U2 M U2",
    "algs": [
      "M' U2 M U2 M' U2 M U2"
    ],
    "moves": 8,
    "desc": "中层前后双棱(UF+DF)极速翻色"
  },
  {
    "id": "chichu_eo_top_four_edges",
    "code": "EO_TOP_4",
    "name": "彳亍四棱翻色 (顶层4棱全翻)",
    "title": "彳亍四棱翻色 (顶层4棱全翻)",
    "group": "彳亍盲拧 - 翻色与奇偶",
    "alg": "M' U M' U M' U M' U M' U M' U M' U M' U",
    "algs": [
      "(M' U)8",
      "M' U M' U M' U2 M U M U M U2 y M' U M' U M' U2 M U M U M U2 y'"
    ],
    "moves": 16,
    "desc": "顶层4棱全翻公式"
  },
  {
    "id": "chichu_eo_eight_m_layer",
    "code": "EO_8_M",
    "name": "彳亍八棱翻色 (M+S层8棱全翻)",
    "title": "彳亍八棱翻色 (M+S层8棱全翻)",
    "group": "彳亍盲拧 - 翻色与奇偶",
    "alg": "M' U M' U M' U M' U y' M' U M' U M' U M' U",
    "algs": [
      "(M' U)4 y' (M' U)4"
    ],
    "moves": 17,
    "desc": "8棱快速全翻公式"
  },
  {
    "id": "chichu_twist_ubl_cw",
    "code": "ABC",
    "name": "彳亍角块原地翻 [ABC] (UBL缓冲顺翻)",
    "title": "彳亍角块原地翻 [ABC] (UBL缓冲顺翻)",
    "group": "彳亍盲拧 - 角块原地翻",
    "alg": "R' D' R D R' D' R D U D' R' D R D' R' D R U'",
    "algs": [
      "R' D' R D R' D' R D U D' R' D R D' R' D R U'"
    ],
    "moves": 18,
    "desc": "UBL缓冲角块原地顺时针翻色"
  },
  {
    "id": "chichu_twist_ubl_ccw",
    "code": "ACB",
    "name": "彳亍角块原地翻 [ACB] (UBL缓冲逆翻)",
    "title": "彳亍角块原地翻 [ACB] (UBL缓冲逆翻)",
    "group": "彳亍盲拧 - 角块原地翻",
    "alg": "D' R' D R D' R' D R U R' D' R D R' D' R D U'",
    "algs": [
      "D' R' D R D' R' D R U R' D' R D R' D' R D U'"
    ],
    "moves": 18,
    "desc": "UBL缓冲角块原地逆时针翻色"
  },
  {
    "id": "chichu_twist_ubr",
    "code": "DEF",
    "name": "彳亍角块原地翻 [DEF] (UBR角翻色)",
    "title": "彳亍角块原地翻 [DEF] (UBR角翻色)",
    "group": "彳亍盲拧 - 角块原地翻",
    "alg": "U R' D' R D R' D' R D U' D' R' D R D' R' D R",
    "algs": [
      "U R' D' R D R' D' R D U' D' R' D R D' R' D R"
    ],
    "moves": 18,
    "desc": "UBR角原地翻色"
  },
  {
    "id": "chichu_twist_ufr",
    "code": "GHI",
    "name": "彳亍角块原地翻 [GHI] (UFR角翻色)",
    "title": "彳亍角块原地翻 [GHI] (UFR角翻色)",
    "group": "彳亍盲拧 - 角块原地翻",
    "alg": "U2 R' D' R D R' D' R D U2 D' R' D R D' R' D R",
    "algs": [
      "U2 R' D' R D R' D' R D U2 D' R' D R D' R' D R"
    ],
    "moves": 18,
    "desc": "UFR角原地翻色"
  },
  {
    "id": "chichu_twist_ufl",
    "code": "JKL",
    "name": "彳亍角块原地翻 [JKL] (UFL角翻色)",
    "title": "彳亍角块原地翻 [JKL] (UFL角翻色)",
    "group": "彳亍盲拧 - 角块原地翻",
    "alg": "U' R' D' R D R' D' R D U D' R' D R D' R' D R",
    "algs": [
      "U' R' D' R D R' D' R D U D' R' D R D' R' D R"
    ],
    "moves": 18,
    "desc": "UFL角原地翻色"
  },
  {
    "id": "chichu_twist_dlf",
    "code": "MNO",
    "name": "彳亍角块原地翻 [MNO] (DFL角翻色)",
    "title": "彳亍角块原地翻 [MNO] (DFL角翻色)",
    "group": "彳亍盲拧 - 角块原地翻",
    "alg": "D R' D' R D R' D' R D D' D' R' D R D' R' D R",
    "algs": [
      "D R' D' R D R' D' R D D' D' R' D R D' R' D R"
    ],
    "moves": 18,
    "desc": "DFL角原地翻色"
  },
  {
    "id": "chichu_twist_dfr",
    "code": "PQR",
    "name": "彳亍角块原地翻 [PQR] (DFR角翻色)",
    "title": "彳亍角块原地翻 [PQR] (DFR角翻色)",
    "group": "彳亍盲拧 - 角块原地翻",
    "alg": "D' R' D' R D R' D' R D D D' R' D R D' R' D R",
    "algs": [
      "D' R' D' R D R' D' R D D D' R' D R D' R' D R"
    ],
    "moves": 18,
    "desc": "DFR角原地翻色"
  },
  {
    "id": "chichu_twist_dbr",
    "code": "STU",
    "name": "彳亍角块原地翻 [STU] (DBR角翻色)",
    "title": "彳亍角块原地翻 [STU] (DBR角翻色)",
    "group": "彳亍盲拧 - 角块原地翻",
    "alg": "D2 R' D' R D R' D' R D D2 D' R' D R D' R' D R",
    "algs": [
      "D2 R' D' R D R' D' R D D2 D' R' D R D' R' D R"
    ],
    "moves": 18,
    "desc": "DBR角原地翻色"
  },
  {
    "id": "chichu_twist_dbl",
    "code": "VWX",
    "name": "彳亍角块原地翻 [VWX] (DBL角翻色)",
    "title": "彳亍角块原地翻 [VWX] (DBL角翻色)",
    "group": "彳亍盲拧 - 角块原地翻",
    "alg": "D R' D' R D R' D' R D D' D' R' D R D' R' D R",
    "algs": [
      "D R' D' R D R' D' R D D' D' R' D R D' R' D R"
    ],
    "moves": 18,
    "desc": "DBL角原地翻色"
  },
  {
    "id": "chichu_co_ubl_ubr_cw_ccw",
    "code": "CO_UBL_UBR_CW_CCW",
    "name": "彳亍双角翻色 (UBL顺 + UBR逆)",
    "title": "彳亍双角翻色 (UBL顺 + UBR逆)",
    "group": "彳亍盲拧 - 翻色与奇偶",
    "alg": "R' D' R D R' D' R D U' D' R' D R D' R' D R U",
    "algs": [
      "R' D' R D R' D' R D U' D' R' D R D' R' D R U"
    ],
    "moves": 18,
    "desc": "顶层后侧双角标准极速翻色公式"
  },
  {
    "id": "chichu_co_ubl_ubr_ccw_cw",
    "code": "CO_UBL_UBR_CCW_CW",
    "name": "彳亍双角翻色 (UBL逆 + UBR顺)",
    "title": "彳亍双角翻色 (UBL逆 + UBR顺)",
    "group": "彳亍盲拧 - 翻色与奇偶",
    "alg": "D' R' D R D' R' D R U' R' D' R D R' D' R D U",
    "algs": [
      "D' R' D R D' R' D R U' R' D' R D R' D' R D U"
    ],
    "moves": 18,
    "desc": "顶层后侧双角反向极速翻色公式"
  },
  {
    "id": "chichu_co_ubl_ufr_diag",
    "code": "CO_DIAG",
    "name": "彳亍双角对角翻色 (UBL顺 + UFR逆)",
    "title": "彳亍双角对角翻色 (UBL顺 + UFR逆)",
    "group": "彳亍盲拧 - 翻色与奇偶",
    "alg": "R' D' R D R' D' R D U2 D' R' D R D' R' D R U2",
    "algs": [
      "R' D' R D R' D' R D U2 D' R' D R D' R' D R U2"
    ],
    "moves": 18,
    "desc": "顶层对角极速翻色公式"
  },
  {
    "id": "chichu_co_triple_cw",
    "code": "CO_TRIPLE_CW",
    "name": "彳亍三角翻色 (UBL+UBR+UFR 全顺)",
    "title": "彳亍三角翻色 (UBL+UBR+UFR 全顺)",
    "group": "彳亍盲拧 - 翻色与奇偶",
    "alg": "R U R' U R U2 R' L' U' L U' L' U2 L",
    "algs": [
      "R U R' U R U2 R' L' U' L U' L' U2 L"
    ],
    "moves": 14,
    "desc": "顶层三纯角顺时针全翻公式"
  },
  {
    "id": "chichu_co_triple_ccw",
    "code": "CO_TRIPLE_CCW",
    "name": "彳亍三角翻色 (UBL+UBR+UFR 全逆)",
    "title": "彳亍三角翻色 (UBL+UBR+UFR 全逆)",
    "group": "彳亍盲拧 - 翻色与奇偶",
    "alg": "L' U2 L U L' U L R U2 R' U' R U' R'",
    "algs": [
      "L' U2 L U L' U L R U2 R' U' R U' R'"
    ],
    "moves": 14,
    "desc": "顶层三纯角逆时针全翻公式"
  },
  {
    "id": "chichu_parity_t_variant",
    "code": "PARITY_T",
    "name": "彳亍奇偶 (UF-UL棱 + UBL-UBR角)",
    "title": "彳亍奇偶 (UF-UL棱 + UBL-UBR角)",
    "group": "彳亍盲拧 - 奇偶校验",
    "alg": "R U R' U' R' F R2 U' R' U' R U R' F'",
    "algs": [
      "R U R' U' R' F R2 U' R' U' R U R' F'"
    ],
    "moves": 14,
    "desc": "经典T-Perm奇偶校验公式"
  },
  {
    "id": "chichu_parity_ja_variant",
    "code": "PARITY_JA",
    "name": "彳亍奇偶 (UF-UB棱 + UBL-UFL角)",
    "title": "彳亍奇偶 (UF-UB棱 + UBL-UFL角)",
    "group": "彳亍盲拧 - 奇偶校验",
    "alg": "R U' R' U' R U R D R' U' R D' R' U2 R' U'",
    "algs": [
      "R U' R' U' R U R D R' U' R D' R' U2 R' U'"
    ],
    "moves": 16,
    "desc": "Ja-Perm变体奇偶校验"
  },
  {
    "id": "chichu_parity_rb_variant",
    "code": "PARITY_RB",
    "name": "彳亍奇偶 (UF-UR棱 + UBL-UBR角)",
    "title": "彳亍奇偶 (UF-UR棱 + UBL-UBR角)",
    "group": "彳亍盲拧 - 奇偶校验",
    "alg": "R' U2 R U2 R' F R U R' U' R' F' R2 U'",
    "algs": [
      "R' U2 R U2 R' F R U R' U' R' F' R2 U'"
    ],
    "moves": 14,
    "desc": "Rb-Perm变体奇偶校验"
  },
  {
    "id": "chichu_parity_buffer_m2",
    "code": "PARITY_M2",
    "name": "彳亍缓冲奇偶 (M2通用奇偶)",
    "title": "彳亍缓冲奇偶 (M2通用奇偶)",
    "group": "彳亍盲拧 - 奇偶校验",
    "alg": "D' L2 D M2 D' L2 D",
    "algs": [
      "D' L2 D M2 D' L2 D",
      "y D' L2 D M2 D' L2 D y'"
    ],
    "moves": 7,
    "desc": "M2缓冲奇偶还原公式"
  },
  {
    "id": "chichu_parity_fast_sync",
    "code": "PARITY_FAST",
    "name": "彳亍角棱快速同步奇偶交换",
    "title": "彳亍角棱快速同步奇偶交换",
    "group": "彳亍盲拧 - 奇偶校验",
    "alg": "r2 D' r2 D r2 U R' U' R r2 D' r2 D r2",
    "algs": [
      "r2 D' r2 D r2 U R' U' R r2 D' r2 D r2"
    ],
    "moves": 14,
    "desc": "角棱同步快速奇偶公式"
  },
  {
    "id": "chichu_parity_ra_variant",
    "code": "PARITY_RA",
    "name": "彳亍奇偶 (UF-FR棱 + UBL-DFR角)",
    "title": "彳亍奇偶 (UF-FR棱 + UBL-DFR角)",
    "group": "彳亍盲拧 - 奇偶校验",
    "alg": "R U R' F' R U2 R' U2 R' F R U R U2 R'",
    "algs": [
      "R U R' F' R U2 R' U2 R' F R U R U2 R'"
    ],
    "moves": 15,
    "desc": "Ra-Perm变体奇偶校验"
  },
  {
    "id": "chichu_parity_jb_variant",
    "code": "PARITY_JB",
    "name": "彳亍奇偶 (UF-FL棱 + UBL-DFL角)",
    "title": "彳亍奇偶 (UF-FL棱 + UBL-DFL角)",
    "group": "彳亍盲拧 - 奇偶校验",
    "alg": "R' U2 R U R' U2 L U' R U L'",
    "algs": [
      "R' U2 R U2 L U' R U L'"
    ],
    "moves": 11,
    "desc": "Jb-Perm变体奇偶校验"
  },
  {
    "id": "chichu_parity_f_variant",
    "code": "PARITY_F",
    "name": "彳亍奇偶 (UF-UB棱 + UBL-UBR角)",
    "title": "彳亍奇偶 (UF-UB棱 + UBL-UBR角)",
    "group": "彳亍盲拧 - 奇偶校验",
    "alg": "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R",
    "algs": [
      "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R"
    ],
    "moves": 18,
    "desc": "F-Perm变体奇偶校验"
  },
  {
    "id": "chichu_parity_y_variant",
    "code": "PARITY_Y",
    "name": "彳亍奇偶 (UF-UL棱 + UBL-UFR角)",
    "title": "彳亍奇偶 (UF-UL棱 + UBL-UFR角)",
    "group": "彳亍盲拧 - 奇偶校验",
    "alg": "F R U' R' U' R U R' F' R U R' U' R' F R F'",
    "algs": [
      "F R U' R' U' R U R' F' R U R' U' R' F R F'"
    ],
    "moves": 17,
    "desc": "Y-Perm变体奇偶校验"
  }
];
}));

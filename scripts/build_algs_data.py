import json, re

# Load speedcubedb data
with open('data/speedcubedb_algs.json', 'r', encoding='utf-8') as f:
    scdb = json.load(f)

# Build Triggers
TRIGGERS = [
    {
        "id": "trig_sexy",
        "name": "Sexy Move",
        "group": "Triggers",
        "alg": "R U R' U'",
        "algs": ["R U R' U'", "y R U R' U'", "y' L' U' L U"],
        "moves": 4,
        "desc": "Core fundamental speedcubing trigger"
    },
    {
        "id": "trig_rev_sexy",
        "name": "Reverse Sexy",
        "group": "Triggers",
        "alg": "U R U' R'",
        "algs": ["U R U' R'", "y' U' L' U L"],
        "moves": 4,
        "desc": "Inverse sequence of Sexy Move"
    },
    {
        "id": "trig_inv_sexy",
        "name": "Inverse Sexy",
        "group": "Triggers",
        "alg": "U' R U R'",
        "algs": ["U' R U R'", "y U L' U' L"],
        "moves": 4,
        "desc": "Setup variation for F2L inserts"
    },
    {
        "id": "trig_sledge",
        "name": "Sledgehammer",
        "group": "Triggers",
        "alg": "R' F R F'",
        "algs": ["R' F R F'", "y' L F' L' F"],
        "moves": 4,
        "desc": "Corner insertion & edge orientation trigger"
    },
    {
        "id": "trig_hedge",
        "name": "Hedgeslammer",
        "group": "Triggers",
        "alg": "F R' F' R",
        "algs": ["F R' F' R", "y' F' L F L'"],
        "moves": 4,
        "desc": "Inverse of Sledgehammer"
    },
    {
        "id": "trig_triple_s",
        "name": "Triple Sexy",
        "group": "Triggers",
        "alg": "R U R' U' R U R' U' R U R' U'",
        "algs": ["R U R' U' R U R' U' R U R' U'"],
        "moves": 12,
        "desc": "3x Sexy Move cycle (OLL 33 / CP preservation)"
    },
    {
        "id": "trig_fat_sune",
        "name": "Fat Sune",
        "group": "Triggers",
        "alg": "r U R' U' r' F R F'",
        "algs": ["r U R' U' r' F R F'"],
        "moves": 8,
        "desc": "Wide Sune variation"
    },
    {
        "id": "trig_suicide",
        "name": "Suicide Move",
        "group": "Triggers",
        "alg": "R U2 R' U' R U' R'",
        "algs": ["R U2 R' U' R U' R'"],
        "moves": 7,
        "desc": "Anti-Sune trigger"
    }
]

# Build Roux CMLL
CMLL_CASES = [
    { "id": "cmll_sune", "name": "CMLL Sune", "group": "Roux CMLL", "alg": "R U R' U R U2 R'", "algs": ["R U R' U R U2 R'", "L' U' L U' L' U2 L"], "moves": 7, "desc": "Standard Sune with preserved blocks" },
    { "id": "cmll_antisune", "name": "CMLL Anti-Sune", "group": "Roux CMLL", "alg": "R' U' R U' R' U2 R", "algs": ["R' U' R U' R' U2 R", "L U L' U L U2 L'"], "moves": 7, "desc": "Anti-Sune with preserved blocks" },
    { "id": "cmll_u_forward", "name": "CMLL U Forward", "group": "Roux CMLL", "alg": "R2 D R' U2 R D' R' U2 R'", "algs": ["R2 D R' U2 R D' R' U2 R'", "y' R' U' R U' R' U2 R"], "moves": 9, "desc": "Headlights case" },
    { "id": "cmll_pi_diag", "name": "CMLL Pi Diagonal", "group": "Roux CMLL", "alg": "r U' r2 U r2 U r2 U' r", "algs": ["r U' r2 U r2 U r2 U' r", "F R U R' U' R U R' U' F'"], "moves": 9, "desc": "Diagonal corners swap Pi" },
    { "id": "cmll_t_headlights", "name": "CMLL T Headlights", "group": "Roux CMLL", "alg": "r' U r U2 R2 F R F' R", "algs": ["r' U r U2 R2 F R F' R", "L' U' L U L F' L' F"], "moves": 9, "desc": "T shape with headlights" },
    { "id": "cmll_l_mirror", "name": "CMLL L Mirror", "group": "Roux CMLL", "alg": "F R' F' R U R U' R'", "algs": ["F R' F' R U R U' R'", "R' U2 R U2 R' F R U R' U' F'"], "moves": 8, "desc": "L shape CMLL case" },
    { "id": "cmll_h_column", "name": "CMLL H Column", "group": "Roux CMLL", "alg": "R U R' U R U' R' U R U2 R'", "algs": ["R U R' U R U' R' U R U2 R'", "F R U R' U' R U R' U' R U R' U' F'"], "moves": 11, "desc": "H shape CMLL case" }
]

# Build Chi-Chu BLD
CHICHU_CORNERS = [
    {
        "id": "chichu_c_ubl_ubr_ufr",
        "name": "彳亍角块 [UBL-UBR-UFR]",
        "group": "彳亍盲拧 - 角块三循环",
        "alg": "R D R' U' R D' R' U",
        "algs": ["R D R' U' R D' R' U", "y' R' D R U' R' D' R U y"],
        "moves": 8,
        "desc": "8步基础角块三循环 [R D R', U']"
    },
    {
        "id": "chichu_c_ubl_ufr_ubr",
        "name": "彳亍角块 [UBL-UFR-UBR]",
        "group": "彳亍盲拧 - 角块三循环",
        "alg": "U' R D R' U R D' R'",
        "algs": ["U' R D R' U R D' R'", "y' U' R' D R U R' D' R y"],
        "moves": 8,
        "desc": "8步逆向角块三循环 [U', R D R']"
    },
    {
        "id": "chichu_c_ubl_ubr_ufl",
        "name": "彳亍角块 [UBL-UBR-UFL]",
        "group": "彳亍盲拧 - 角块三循环",
        "alg": "R D2 R' U R D2 R' U'",
        "algs": ["R D2 R' U R D2 R' U'", "y L' D2 L U' L' D2 L U y'"],
        "moves": 8,
        "desc": "8步跨顶角块三循环 [R D2 R', U]"
    },
    {
        "id": "chichu_c_ubl_ufl_ubr",
        "name": "彳亍角块 [UBL-UFL-UBR]",
        "group": "彳亍盲拧 - 角块三循环",
        "alg": "U R D2 R' U' R D2 R'",
        "algs": ["U R D2 R' U' R D2 R'", "y U' L' D2 L U L' D2 L y'"],
        "moves": 8,
        "desc": "8步逆向跨顶角块三循环 [U, R D2 R']"
    },
    {
        "id": "chichu_c_ubl_ufl_ufr",
        "name": "彳亍角块 [UBL-UFL-UFR]",
        "group": "彳亍盲拧 - 角块三循环",
        "alg": "R' D R U R' D' R U'",
        "algs": ["R' D R U R' D' R U'", "y L D' L' U' L D L' U y'"],
        "moves": 8,
        "desc": "8步前侧角块三循环 [R' D R, U]"
    },
    {
        "id": "chichu_c_ubl_ufr_ufl",
        "name": "彳亍角块 [UBL-UFR-UFL]",
        "group": "彳亍盲拧 - 角块三循环",
        "alg": "U R' D R U' R' D' R",
        "algs": ["U R' D R U' R' D' R", "y U' L D' L' U L D L' y'"],
        "moves": 8,
        "desc": "8步前侧逆向角块三循环 [U, R' D R]"
    },
    {
        "id": "chichu_c_ubl_ubr_dfr",
        "name": "彳亍角块 [UBL-UBR-DFR]",
        "group": "彳亍盲拧 - 角块三循环",
        "alg": "R' D2 R U' R' D2 R U",
        "algs": ["R' D2 R U' R' D2 R U", "y' R D2 R' U' R D2 R' U y"],
        "moves": 8,
        "desc": "8步底层前右角三循环 [R' D2 R, U']"
    },
    {
        "id": "chichu_c_ubl_dfr_ubr",
        "name": "彳亍角块 [UBL-DFR-UBR]",
        "group": "彳亍盲拧 - 角块三循环",
        "alg": "U' R' D2 R U R' D2 R",
        "algs": ["U' R' D2 R U R' D2 R", "y' U' R D2 R' U R D2 R' y"],
        "moves": 8,
        "desc": "8步底层前右逆向角块三循环 [U', R' D2 R]"
    },
    {
        "id": "chichu_c_ubl_ubr_dfl",
        "name": "彳亍角块 [UBL-UBR-DFL]",
        "group": "彳亍盲拧 - 角块三循环",
        "alg": "R' D' R U2 R' D R U2",
        "algs": ["R' D' R U2 R' D R U2", "y' R D R' U2 R D' R' U2 y"],
        "moves": 8,
        "desc": "8步底层前左角三循环 [R' D' R, U2]"
    },
    {
        "id": "chichu_c_ubl_dfl_ubr",
        "name": "彳亍角块 [UBL-DFL-UBR]",
        "group": "彳亍盲拧 - 角块三循环",
        "alg": "U2 R' D' R U2 R' D R",
        "algs": ["U2 R' D' R U2 R' D R", "y' U2 R D R' U2 R D' R' y"],
        "moves": 8,
        "desc": "8步底层前左逆向角块三循环 [U2, R' D' R]"
    },
    {
        "id": "chichu_c_ubl_ufr_dfr",
        "name": "彳亍角块 [UBL-UFR-DFR]",
        "group": "彳亍盲拧 - 角块三循环",
        "alg": "R U' R D R' U R D' R2",
        "algs": ["R U' R D R' U R D' R2", "R2 D R' U' R D' R' U R'"],
        "moves": 9,
        "desc": "Setup角块三循环 [R: [U', R D R']]"
    },
    {
        "id": "chichu_c_ubl_ufr_dfl",
        "name": "彳亍角块 [UBL-UFR-DFL]",
        "group": "彳亍盲拧 - 角块三循环",
        "alg": "F R U R' D2 R U' R' D2 F'",
        "algs": ["F R U R' D2 R U' R' D2 F'", "F D2 R U R' D2 R U' R' F'"],
        "moves": 10,
        "desc": "F面Setup角块三循环 [F: [R U R', D2]]"
    },
    {
        "id": "chichu_c_ubl_ufr_dbl",
        "name": "彳亍角块 [UBL-UFR-DBL]",
        "group": "彳亍盲拧 - 角块三循环",
        "alg": "D R U R' D' R U' R' D2",
        "algs": ["D R U R' D' R U' R' D2", "D2 R U R' D R U' R' D'"],
        "moves": 9,
        "desc": "D面Setup角块三循环 [D: [R U R', D']]"
    },
    {
        "id": "chichu_c_ubl_ufl_dfr",
        "name": "彳亍角块 [UBL-UFL-DFR]",
        "group": "彳亍盲拧 - 角块三循环",
        "alg": "F' R' D R U2 R' D' R U2 F",
        "algs": ["F' R' D R U2 R' D' R U2 F", "F' U2 R' D R U2 R' D' R F"],
        "moves": 10,
        "desc": "F'面Setup角块三循环 [F': [R' D R, U2]]"
    },
    {
        "id": "chichu_c_ubl_dfr_dfl",
        "name": "彳亍角块 [UBL-DFR-DFL]",
        "group": "彳亍盲拧 - 角块三循环",
        "alg": "x' R U' R' D R U R' D' x",
        "algs": ["x' R U' R' D R U R' D' x", "x' D R U' R' D' R U R' x"],
        "moves": 8,
        "desc": "底层前排双角三循环 [x': [R U' R', D]]"
    },
    {
        "id": "chichu_c_ubl_dfr_dbr",
        "name": "彳亍角块 [UBL-DFR-DBR]",
        "group": "彳亍盲拧 - 角块三循环",
        "alg": "z U R U' D' U R' U' D z'",
        "algs": ["z U R U' D' U R' U' D z'", "z D' U R U' D U R' U' z'"],
        "moves": 8,
        "desc": "底层右侧双角三循环 [z: [U R U', D']]"
    },
    {
        "id": "chichu_c_ubl_dfl_dbl",
        "name": "彳亍角块 [UBL-DFL-DBL]",
        "group": "彳亍盲拧 - 角块三循环",
        "alg": "x' L' U L D' L' U' L D x",
        "algs": ["x' L' U L D' L' U' L D x", "x' D L' U L D' L' U' L x"],
        "moves": 8,
        "desc": "底层左侧双角三循环 [x': [L' U L, D']]"
    },
    {
        "id": "chichu_c_ubl_dbl_dbr",
        "name": "彳亍角块 [UBL-DBL-DBR]",
        "group": "彳亍盲拧 - 角块三循环",
        "alg": "D R D' R' U R D R' U' D'",
        "algs": ["D R D' R' U R D R' U' D'", "D U R D' R' U' R D R' D'"],
        "moves": 10,
        "desc": "底层后排双角三循环 [D: [R D' R', U]]"
    }
]

CHICHU_EDGES = [
    {
        "id": "chichu_e_uf_ub_df",
        "name": "彳亍棱块 [UF-UB-DF]",
        "group": "彳亍盲拧 - 棱块三循环",
        "alg": "M' U2 M U2 M' U2 M U2",
        "algs": ["M' U2 M U2 M' U2 M U2", "M2 U2 M2 U2"],
        "moves": 8,
        "desc": "M层经典上下对棱三循环 [M', U2 M U2]"
    },
    {
        "id": "chichu_e_uf_df_ub",
        "name": "彳亍棱块 [UF-DF-UB]",
        "group": "彳亍盲拧 - 棱块三循环",
        "alg": "U2 M U2 M' U2 M' U2 M",
        "algs": ["U2 M U2 M' U2 M' U2 M", "U2 M2 U2 M2"],
        "moves": 8,
        "desc": "M层逆向上对棱三循环 [U2 M U2, M']"
    },
    {
        "id": "chichu_e_uf_ur_ul",
        "name": "彳亍棱块 [UF-UR-UL]",
        "group": "彳亍盲拧 - 棱块三循环",
        "alg": "M' U R U' M U R' U'",
        "algs": ["M' U R U' M U R' U'", "U R U' M' U R' U' M"],
        "moves": 8,
        "desc": "顶层前左右三棱高速循环 [M', U R U']"
    },
    {
        "id": "chichu_e_uf_ul_ur",
        "name": "彳亍棱块 [UF-UL-UR]",
        "group": "彳亍盲拧 - 棱块三循环",
        "alg": "U R U' M' U R' U' M",
        "algs": ["U R U' M' U R' U' M", "M' U R U' M U R' U'"],
        "moves": 8,
        "desc": "顶层前左右逆向三棱循环 [U R U', M']"
    },
    {
        "id": "chichu_e_uf_ur_ub",
        "name": "彳亍棱块 [UF-UR-UB]",
        "group": "彳亍盲拧 - 棱块三循环",
        "alg": "M' U R' U' M U R U'",
        "algs": ["M' U R' U' M U R U'", "U R' U' M' U R U' M"],
        "moves": 8,
        "desc": "顶层前右后三棱循环 [M', U R' U']"
    },
    {
        "id": "chichu_e_uf_ub_ur",
        "name": "彳亍棱块 [UF-UB-UR]",
        "group": "彳亍盲拧 - 棱块三循环",
        "alg": "U R' U' M' U R U' M",
        "algs": ["U R' U' M' U R U' M", "M' U R' U' M U R U'"],
        "moves": 8,
        "desc": "顶层前右后逆向三棱循环 [U R' U', M']"
    },
    {
        "id": "chichu_e_uf_ul_ub",
        "name": "彳亍棱块 [UF-UL-UB]",
        "group": "彳亍盲拧 - 棱块三循环",
        "alg": "M' U' L' U M U' L U",
        "algs": ["M' U' L' U M U' L U", "U' L' U M' U' L U M"],
        "moves": 8,
        "desc": "顶层前左后三棱循环 [M', U' L' U]"
    },
    {
        "id": "chichu_e_uf_ub_ul",
        "name": "彳亍棱块 [UF-UB-UL]",
        "group": "彳亍盲拧 - 棱块三循环",
        "alg": "U' L' U M' U' L U M",
        "algs": ["U' L' U M' U' L U M", "M' U' L' U M U' L U"],
        "moves": 8,
        "desc": "顶层前左后逆向三棱循环 [U' L' U, M']"
    },
    {
        "id": "chichu_e_uf_ul_df",
        "name": "彳亍棱块 [UF-UL-DF]",
        "group": "彳亍盲拧 - 棱块三循环",
        "alg": "M' U' L U M U' L' U",
        "algs": ["M' U' L U M U' L' U", "U' L U M' U' L' U M"],
        "moves": 8,
        "desc": "前左底前三棱循环 [M', U' L U]"
    },
    {
        "id": "chichu_e_uf_ur_df",
        "name": "彳亍棱块 [UF-UR-DF]",
        "group": "彳亍盲拧 - 棱块三循环",
        "alg": "M2 U R U' M2 U R' U'",
        "algs": ["M2 U R U' M2 U R' U'", "U R U' M2 U R' U' M2"],
        "moves": 8,
        "desc": "前右底前M2三循环 [M2, U R U']"
    },
    {
        "id": "chichu_e_uf_ur_dr",
        "name": "彳亍棱块 [UF-UR-DR]",
        "group": "彳亍盲拧 - 棱块三循环",
        "alg": "M2 U R2 U' M2 U R2 U'",
        "algs": ["M2 U R2 U' M2 U R2 U'", "U R2 U' M2 U R2 U' M2"],
        "moves": 8,
        "desc": "右侧上下M2三循环 [M2, U R2 U']"
    },
    {
        "id": "chichu_e_uf_ul_dl",
        "name": "彳亍棱块 [UF-UL-DL]",
        "group": "彳亍盲拧 - 棱块三循环",
        "alg": "M2 U' L2 U M2 U' L2 U",
        "algs": ["M2 U' L2 U M2 U' L2 U", "U' L2 U M2 U' L2 U M2"],
        "moves": 8,
        "desc": "左侧上下M2三循环 [M2, U' L2 U]"
    },
    {
        "id": "chichu_e_uf_fr_fl",
        "name": "彳亍棱块 [UF-FR-FL]",
        "group": "彳亍盲拧 - 棱块三循环",
        "alg": "S R' F' R S' R' F R",
        "algs": ["S R' F' R S' R' F R", "R' F' R S R' F' R S'"],
        "moves": 8,
        "desc": "S层前排中层棱三循环 [S, R' F' R]"
    },
    {
        "id": "chichu_e_uf_br_bl",
        "name": "彳亍棱块 [UF-BR-BL]",
        "group": "彳亍盲拧 - 棱块三循环",
        "alg": "S' R B R' S R B' R'",
        "algs": ["S' R B R' S R B' R'", "R B R' S' R B' R' S"],
        "moves": 8,
        "desc": "S层后排中层棱三循环 [S', R B R']"
    },
    {
        "id": "chichu_e_uf_fr_br",
        "name": "彳亍棱块 [UF-FR-BR]",
        "group": "彳亍盲拧 - 棱块三循环",
        "alg": "E R U R' E' R U' R'",
        "algs": ["E R U R' E' R U' R'", "R U R' E R U' R' E'"],
        "moves": 8,
        "desc": "E层右侧前后中层棱三循环 [E, R U R']"
    },
    {
        "id": "chichu_e_uf_fl_bl",
        "name": "彳亍棱块 [UF-FL-BL]",
        "group": "彳亍盲拧 - 棱块三循环",
        "alg": "E' L' U' L E L' U L",
        "algs": ["E' L' U' L E L' U L", "L' U' L E' L' U L E"],
        "moves": 8,
        "desc": "E层左侧前后中层棱三循环 [E', L' U' L]"
    },
    {
        "id": "chichu_e_uf_ur_br",
        "name": "彳亍棱块 [UF-UR-BR]",
        "group": "彳亍盲拧 - 棱块三循环",
        "alg": "R U' M' U R2 U' M U R'",
        "algs": ["R U' M' U R2 U' M U R'", "R U' M' U R2 U' M U R"],
        "moves": 9,
        "desc": "R面Setup棱块三循环 [R: [U' M' U, R2]]"
    },
    {
        "id": "chichu_e_uf_ul_bl",
        "name": "彳亍棱块 [UF-UL-BL]",
        "group": "彳亍盲拧 - 棱块三循环",
        "alg": "L' U M' U' L2 U M U' L'",
        "algs": ["L' U M' U' L2 U M U' L'", "L' U M' U' L2 U M U' L"],
        "moves": 9,
        "desc": "L面Setup棱块三循环 [L': [U M' U', L2]]"
    },
    {
        "id": "chichu_e_uf_db_df",
        "name": "彳亍棱块 [UF-DB-DF]",
        "group": "彳亍盲拧 - 棱块三循环",
        "alg": "D M' U R U' M U R' U' D'",
        "algs": ["D M' U R U' M U R' U' D'", "D U R U' M' U R' U' M D'"],
        "moves": 10,
        "desc": "D面Setup底棱三循环 [D: [M', U R U']]"
    }
]

CHICHU_CO_EO = [
    {
        "id": "chichu_co_ubl_ubr_cw_ccw",
        "name": "彳亍翻角 (UBL顺 + UBR逆)",
        "group": "彳亍盲拧 - 翻角与翻棱",
        "alg": "R U R' U R U2 R' L' U' L U' L' U2 L",
        "algs": ["R U R' U R U2 R' L' U' L U' L' U2 L", "y' R U2 R' U' R U' R' L' U2 L U L' U L y"],
        "moves": 14,
        "desc": "双角顺逆翻 (Sune + 左手Anti-Sune)"
    },
    {
        "id": "chichu_co_ubl_ubr_ccw_cw",
        "name": "彳亍翻角 (UBL逆 + UBR顺)",
        "group": "彳亍盲拧 - 翻角与翻棱",
        "alg": "L' U' L U' L' U2 L R U R' U R U2 R'",
        "algs": ["L' U' L U' L' U2 L R U R' U R U2 R'", "R' U' R U' R' U2 R L U L' U L U2 L'"],
        "moves": 14,
        "desc": "双角逆顺翻 (左手Anti-Sune + Sune)"
    },
    {
        "id": "chichu_co_ubl_ufr_diag",
        "name": "彳亍对角翻色 (UBL顺 + UFR逆)",
        "group": "彳亍盲拧 - 翻角与翻棱",
        "alg": "R U R' U R U2 R' U' L' U' L U' L' U2 L U",
        "algs": ["R U R' U R U2 R' U' L' U' L U' L' U2 L U"],
        "moves": 16,
        "desc": "顶层对角翻色"
    },
    {
        "id": "chichu_co_triple_cw",
        "name": "彳亍三角顺翻 (UBL + UBR + UFR)",
        "group": "彳亍盲拧 - 翻角与翻棱",
        "alg": "R U R' U R U2 R' U R U R' U R U2 R' U R U R' U R U2 R' U2",
        "algs": ["R U R' U R U2 R' U R U R' U R U2 R' U R U R' U R U2 R' U2"],
        "moves": 23,
        "desc": "顶层三角顺时针翻色 (3x Sune)"
    },
    {
        "id": "chichu_co_triple_ccw",
        "name": "彳亍三角逆翻 (UBL + UBR + UFR)",
        "group": "彳亍盲拧 - 翻角与翻棱",
        "alg": "R' U' R U' R' U2 R U R' U' R U' R' U2 R U R' U' R U' R' U2 R U2",
        "algs": ["R' U' R U' R' U2 R U R' U' R U' R' U2 R U R' U' R U' R' U2 R U2"],
        "moves": 23,
        "desc": "顶层三角逆时针翻色 (3x Anti-Sune)"
    },
    {
        "id": "chichu_co_cross_layer",
        "name": "彳亍跨层对角翻色 (UBL + DFR)",
        "group": "彳亍盲拧 - 翻角与翻棱",
        "alg": "R U R' U R U2 R' D2 L' U' L U' L' U2 L D2",
        "algs": ["R U R' U R U2 R' D2 L' U' L U' L' U2 L D2"],
        "moves": 16,
        "desc": "跨层对角翻色 (D2 Setup)"
    },
    {
        "id": "chichu_eo_uf_ub_double",
        "name": "彳亍翻双棱 (UF + UB)",
        "group": "彳亍盲拧 - 翻角与翻棱",
        "alg": "M' U M' U M' U2 M U M U M U2",
        "algs": ["M' U M' U M' U2 M U M U M U2", "M' U M' U M' U M' U M' U' M' U' M' U' M' U'"],
        "moves": 12,
        "desc": "前上与后上双棱翻色"
    },
    {
        "id": "chichu_eo_uf_ul_adjacent",
        "name": "彳亍翻相邻双棱 (UF + UL)",
        "group": "彳亍盲拧 - 翻角与翻棱",
        "alg": "r U R' U' r' R U R U' R'",
        "algs": ["r U R' U' r' R U R U' R'", "l' U' L U l L' U' L' U L"],
        "moves": 10,
        "desc": "前上与左上相邻双棱翻色"
    },
    {
        "id": "chichu_eo_uf_ur_adjacent",
        "name": "彳亍翻相邻双棱 (UF + UR)",
        "group": "彳亍盲拧 - 翻角与翻棱",
        "alg": "l' U' L U l L' U' L' U L",
        "algs": ["l' U' L U l L' U' L' U L", "r U R' U' r' R U R U' R'"],
        "moves": 10,
        "desc": "前上与右上相邻双棱翻色"
    },
    {
        "id": "chichu_eo_uf_df_vertical",
        "name": "彳亍翻上下双棱 (UF + DF)",
        "group": "彳亍盲拧 - 翻角与翻棱",
        "alg": "M' U M' U M' U M' U M U M' U M' U M' U M' M'",
        "algs": ["M' U M' U M' U M' U M U M' U M' U M' U M' M'"],
        "moves": 18,
        "desc": "前上与前下上下双棱翻色"
    },
    {
        "id": "chichu_eo_top_four_edges",
        "name": "彳亍顶层四棱全翻 (UF/UB/UL/UR)",
        "group": "彳亍盲拧 - 翻角与翻棱",
        "alg": "M' U M' U M' U2 M' U M' U M' U2",
        "algs": ["M' U M' U M' U2 M' U M' U M' U2", "M' U M' U M' U M' U M' U' M' U' M' U' M' U' M' U M' U M' U M' U M' U' M' U' M' U' M' U'"],
        "moves": 12,
        "desc": "顶层四个棱块同时翻色"
    },
    {
        "id": "chichu_eo_eight_m_layer",
        "name": "彳亍前后四棱全翻 (UF/UB/DF/DB)",
        "group": "彳亍盲拧 - 翻角与翻棱",
        "alg": "M' U M' U M' U M' U M' U M' U M' U M' U",
        "algs": ["M' U M' U M' U M' U M' U M' U M' U M' U"],
        "moves": 16,
        "desc": "M环上四个棱块全翻 (8x M' U)"
    }
]

CHICHU_PARITY = [
    {
        "id": "chichu_parity_t_variant",
        "name": "彳亍奇偶 (UF-UB棱 + UBL-UBR角)",
        "group": "彳亍盲拧 - 奇偶校验",
        "alg": "R U R' F' R U R' U' R' F R2 U' R' U'",
        "algs": ["R U R' F' R U R' U' R' F R2 U' R' U'", "R U R' F' R U R' U' R' F R2 U' R'"],
        "moves": 14,
        "desc": "经典T-Perm奇偶校验公式"
    },
    {
        "id": "chichu_parity_uf_ul_ubl_ufr",
        "name": "彳亍奇偶 (UF-UL棱 + UBL-UFR角)",
        "group": "彳亍盲拧 - 奇偶校验",
        "alg": "R U R' U' r2 U2 R2 U2 r2 U R U' R'",
        "algs": ["R U R' U' r2 U2 R2 U2 r2 U R U' R'", "R U R' U' M2 U2 R2 U2 M2 U R U' R'"],
        "moves": 13,
        "desc": "高速宽转奇偶校验公式"
    },
    {
        "id": "chichu_parity_ja_variant",
        "name": "彳亍奇偶 (UF-UB棱 + UBL-UFL角)",
        "group": "彳亍盲拧 - 奇偶校验",
        "alg": "R U' R' U' R U R D R' U' R D' R' U2 R' U'",
        "algs": ["R U' R' U' R U R D R' U' R D' R' U2 R' U'"],
        "moves": 16,
        "desc": "Ja-Perm变体奇偶校验"
    },
    {
        "id": "chichu_parity_rb_variant",
        "name": "彳亍奇偶 (UF-UR棱 + UBL-UBR角)",
        "group": "彳亍盲拧 - 奇偶校验",
        "alg": "R' U2 R U2 R' F R U R' U' R' F' R2 U'",
        "algs": ["R' U2 R U2 R' F R U R' U' R' F' R2 U'"],
        "moves": 14,
        "desc": "Rb-Perm变体奇偶校验"
    },
    {
        "id": "chichu_parity_buffer_m2",
        "name": "彳亍缓冲奇偶 (M2通用奇偶)",
        "group": "彳亍盲拧 - 奇偶校验",
        "alg": "D' L2 D M2 D' L2 D",
        "algs": ["D' L2 D M2 D' L2 D", "y D' L2 D M2 D' L2 D y'"],
        "moves": 7,
        "desc": "M2缓冲奇偶还原公式"
    },
    {
        "id": "chichu_parity_fast_sync",
        "name": "彳亍角棱快速同步奇偶交换",
        "group": "彳亍盲拧 - 奇偶校验",
        "alg": "r2 D' r2 D r2 U R' U' R r2 D' r2 D r2",
        "algs": ["r2 D' r2 D r2 U R' U' R r2 D' r2 D r2"],
        "moves": 14,
        "desc": "角棱同步快速奇偶公式"
    }
]

# Merge all
all_cases = [
    *TRIGGERS,
    *scdb['pll'],
    *scdb['oll'],
    *scdb['f2l'],
    *scdb['af2l'],
    *scdb['zbll_t'],
    *scdb['zbll_u'],
    *scdb['zbll_l'],
    *scdb['zbll_h'],
    *scdb['zbll_pi'],
    *scdb['zbll_s'],
    *scdb['zbll_as'],
    *CHICHU_CORNERS,
    *CHICHU_EDGES,
    *CHICHU_CO_EO,
    *CHICHU_PARITY,
    *CMLL_CASES
]

print(f'Total compiled cases: {len(all_cases)}')
total_algs = sum(len(c.get('algs', [c['alg']])) for c in all_cases)
print(f'Total compiled algorithms: {total_algs}')

js_content = f"""/**
 * algs-data.js
 * Comprehensive Rubik's Cube Algorithm Library
 * Sources: SpeedCubeDB.com & Complete Chi-Chu BLD Formula Set
 * Contains {len(all_cases)} cases with {total_algs} alternative algorithms.
 */
(function(root) {{
    'use strict';
    root.RUBIKS_ALGORITHM_DATASET = {json.dumps(all_cases, ensure_ascii=False, indent=2)};
}})(typeof self !== 'undefined' ? self : this);
"""

with open('src/core/algs-data.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print('Generated src/core/algs-data.js successfully!')

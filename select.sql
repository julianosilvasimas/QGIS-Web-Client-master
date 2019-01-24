----------------------------------------------------------------------
-- SCRIPT CRIADO POR : MAURO C. PICHILIANI
-- DATA : 12/02/2006
-- CONTEÚDO: CRIAÇÃO DE SERVIDOR LINKADO PARA O EXCEL E ARQUIVO TEXT
-- EXEMPLOS DE ACESSO E MANIPULAÇÃO DOS DADOS EM SERVIDORES LINKADOS
---------------------------------------------------------------------

/* CRIANDO UM SERVIDOR LINKADO PARA */
/* ACESSAR OS DADOS DAS PLANILHAS DO ARQUIVO */
EXEC sp_addlinkedserver 'FonteExcel',
   'Jet 4.0',
   'Microsoft.Jet.OLEDB.4.0',
   'c:\dados\DadosExcel.xls',
   NULL,
   'Excel 5.0'
GO

/* VERIFICANDO O QUE ESTÁ DISPONÍVEL PARA NÓS */
EXEC sp_tables_ex FonteExcel

/* VERIFICANDO OS DADOS NA TABELA1 */
SELECT *
FROM FonteExcel...Tabela1

/* VERIFICANDO OS DADOS NA PLANILHA 1 */
SELECT *
FROM FonteExcel...Planilha1$

/* VERIFICANDO OS DADOS NA PLANILHA 2 */
SELECT *
FROM FonteExcel...Planilha2$

/* VERIFICANDO OS DADOS NA PLANILHA 3 */
SELECT *
FROM FonteExcel...Planilha3$


/* INSERINDO DADOS NA PLANILHA 1 */
INSERT FonteExcel...Tabela1
VALUES(4,'D',5.8)

/* ALTERANDO DADOS NA PLANILHA 1 */
UPDATE FonteExcel...Tabela1
SET Id = Id * 2

/* A INSTRUÇÃO ABAIXO GERA UM ERRO */
DELETE FonteExcel...Tabela1
WHERE Nome = 'D'

/* REMOVENDO O SERVIDOR LINKADO */
sp_dropserver FonteExcel
GO



/* CRIANDO UM SERVIDOR LINKADO PARA */
/* ACESSAR O ARQUIVO TEXTO */
EXEC sp_addlinkedserver FonteTxt, 'Jet 4.0', 
   'Microsoft.Jet.OLEDB.4.0',
   'c:\Dados',
   NULL,
   'Text'
GO

/* VERIFICANDO O QUE ESTÁ DISPONÍVEL PARA NÓS */
EXEC sp_tables_ex FonteTxt
GO

/* VERIFICANDO OS DADOS DO ARQUIVO TEXTO */
SELECT *
FROM FonteTxt...Teste#txt

/* REMOVENDO O SERVIDOR LINKADO */
sp_dropserver FonteTxt
GO
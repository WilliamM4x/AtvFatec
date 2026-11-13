import {Router} from 'express';
import pool from '@/databasePool.js';

const megaRouter = Router();

megaRouter.get('/recente', async(_req, res) =>{
    try{
        const result = await pool.query(
            "SELECT * FROM megasena ORDER BY concurso DESC LIMIT 1"
        );
        res.json(result.rows[0])
    }catch(error){
        console.error("ERRO DETALHADO NO BANCO:", error);
        res.status(500).json({error : 'Erro ao buscar concurso recente no banco.'})
    }

});


megaRouter.get('/historico', async (req, res) => {
  const { pular } = req.query; // Pega quantos registros pular (0, 15, 30...)
  const result = await pool.query(
    "SELECT * FROM megasena ORDER BY concurso DESC LIMIT 15 OFFSET $1", 
    [pular || 0]
  );
  res.json(result.rows);
});

megaRouter.get('/:concurso', async(req, res) =>{
    const {concurso} = req.params;
    
    try{
        const result = await pool.query(
            "SELECT * FROM megasena WHERE concurso = $1", 
            [concurso]
        );

        if (result.rows.length === 0) {
            
            return res.json({ message: `Não existem dados do concurso ${concurso}` });
        }

        res.json(result.rows[0])
    }catch(error){
        console.error("ERRO DETALHADO NO BANCO:", error);
        res.status(500).json({error : "Erro ao buscar concurso"})
    }
});

export default megaRouter;
import express, {Request, Response} from "express";
import dotenv from "dotenv";

dotenv.config();

const app= express();
app.use(express.json());//Midwhere
const PORT = process.env.PORT;

app.listen(PORT, function(){
    console.log(`Rodando na porta ${PORT}`);
});

app.get("/listar", function(_req:Request, res:Response){
    const r="oie" //esturturando a var r
    res.status(200).json({r});
});

app.post("/create", function(req:Request, res:Response){
    const r= req.body;
    console.log(r)
    if(r.idade<18){
        console.log(res)
        res.status(200).json({msg:"De menor"});
    } else {
        res.status(200).json({msg:"De maior"});
    }
    res.status(200).json({r});
});

app.delete("/remove/:id", function(req:Request,res:Response){
    const r = req.params.id;
    res.status(200).json({r});
});


// app.post("/create", function(_req:Request, res:Response){
//     const r="Agora sim" //esturturando a var r
//     res.status(200).json({r});
// });

//curl -X POST http://localhost:3000/create -d '{"nome": "Ana", "idade":22}' -H "Content-Type: application/json"
//curl -X DELETE http://localhost:3000/remove/12

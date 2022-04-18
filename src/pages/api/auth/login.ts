import prisma from '@database';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(req: any,res: any ) {
  if (req.method === "POST") {
    const { user, password } = req.body;
    let token;

    if (!user) return res.status(422).json({ error: "Usuário obrigatório!" });
    if (!password) return res.status(422).json({ error: "Senha obrigatório!" });

    const query = await prisma.users.findUnique({
      where: {
        mail: user,
      },
      select: {
        id: true,
        password: true,
      },
    });

    if (!query)
      return res.status(404).json({ error: "Usuário não encontrado!" });

    if(await bcrypt.compare(password, query.password)) {
      token = jwt.sign({
          exp: (Math.floor(Date.now() / 1000) + 60 * 60) * 3, //3 hours
          data: query.id,
        },
        process.env.SECRET || ''
      );
      res.status(200).json({ message: "Login autorizado!", token });
    } else {
      res.status(401).json({ message: "Usuário ou Senha invalidos!" });
    }
  }else{
    res.status(401).json({ message: "Método não permitido" });
  }
}

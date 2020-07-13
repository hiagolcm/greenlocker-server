import { Router } from 'express';
import { getRepository } from 'typeorm';
import Post, { PostType } from '../models/Post';
import Secret from '../models/Secret';

const secretsRouter = Router();

secretsRouter.post('/', async (req, res) => {
  const { message } = req.body;

  const postsRepository = getRepository(Post);
  const secretsRepository = getRepository(Secret);

  const post = postsRepository.create({ type: PostType.SECRET });
  await postsRepository.save(post);

  const secret = secretsRepository.create({
    post_id: post.id,
    message,
  });
  await secretsRepository.save(secret);

  res.json({ secret });
});

secretsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const postsRepository = getRepository(Post);

  await postsRepository.delete({ id: parseInt(id, 10) });

  res.status(204).json();
});

export default secretsRouter;

import { Controller, Post, Delete, Param, Body, Get } from '@nestjs/common';
import { LikeService } from './like.service';
import { ApiOperation, ApiResponse, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('likes')  // Ajouter un tag pour les Likes
@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post('add/:postId/:userId')
  @ApiOperation({ summary: 'Ajouter un like à un post' })
  @ApiParam({ name: 'postId', description: 'ID du post à aimer', type: Number })
  @ApiParam({ name: 'userId', description: 'ID de l\'utilisateur qui aime le post', type: Number })
  @ApiResponse({ status: 201, description: 'Like ajouté avec succès' })
  @ApiResponse({ status: 400, description: 'Mauvaise demande' })
  @ApiResponse({ status: 404, description: 'Post ou utilisateur introuvable' })
  async addLike(@Param('postId') postId: number, @Param('userId') userId: number) {
    return this.likeService.addLike(postId, userId);
  }

  @Delete('remove/:postId/:userId')
  @ApiOperation({ summary: 'Supprimer un like d\'un post' })
  @ApiParam({ name: 'postId', description: 'ID du post dont on veut enlever le like', type: Number })
  @ApiParam({ name: 'userId', description: 'ID de l\'utilisateur qui a aimé le post', type: Number })
  @ApiResponse({ status: 200, description: 'Like supprimé avec succès' })
  @ApiResponse({ status: 404, description: 'Like non trouvé pour ce post et utilisateur' })
  async removeLike(@Param('postId') postId: number, @Param('userId') userId: number) {
    return this.likeService.removeLike(postId, userId);
  }

  @Post('count/:postId')
  @ApiOperation({ summary: 'Obtenir le nombre de likes d\'un post' })
  @ApiParam({ name: 'postId', description: 'ID du post pour lequel on veut obtenir le nombre de likes', type: Number })
  @ApiResponse({ status: 200, description: 'Nombre de likes retourné' })
  @ApiResponse({ status: 404, description: 'Post non trouvé' })
  async getLikesCount(@Param('postId') postId: number) {
    return this.likeService.getLikesCount(postId);
  }

}

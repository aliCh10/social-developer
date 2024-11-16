import { Controller, Post, Body, Param, Get, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { CommentService } from './comments.service';

@ApiTags('Comments') // Define the Swagger tag for this controller
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // CREATE
  @Post(':postId/user/:userId')
  @ApiOperation({ summary: 'Créer un commentaire pour un post' })
  @ApiResponse({ status: 201, description: 'Commentaire créé', type: Comment })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiParam({ name: 'postId', description: 'ID du post', type: Number })
  @ApiParam({ name: 'userId', description: 'ID de l\'utilisateur', type: Number })
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @Param('postId', ParseIntPipe) postId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.commentService.create(createCommentDto, postId, userId);
  }

  // READ ALL
  @Get('post/:postId')
  @ApiOperation({ summary: 'Récupérer les commentaires d\'un post' })
  @ApiResponse({ status: 200, description: 'Liste des commentaires', type: [Comment] })
  @ApiParam({ name: 'postId', description: 'ID du post', type: Number })
  async findAll(@Param('postId', ParseIntPipe) postId: number) {
    return this.commentService.findAll(postId);
  }

  // READ ONE
  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un commentaire par son ID' })
  @ApiResponse({ status: 200, description: 'Commentaire trouvé', type: Comment })
  @ApiResponse({ status: 404, description: 'Commentaire non trouvé' })
  @ApiParam({ name: 'id', description: 'ID du commentaire', type: Number })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.findOne(id);
  }

  // UPDATE
  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un commentaire' })
  @ApiResponse({ status: 200, description: 'Commentaire mis à jour', type: Comment })
  @ApiResponse({ status: 404, description: 'Commentaire non trouvé' })
  @ApiParam({ name: 'id', description: 'ID du commentaire à mettre à jour', type: Number })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.update(id, updateCommentDto);
  }

  // DELETE
  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un commentaire' })
  @ApiResponse({ status: 200, description: 'Commentaire supprimé' })
  @ApiResponse({ status: 404, description: 'Commentaire non trouvé' })
  @ApiParam({ name: 'id', description: 'ID du commentaire à supprimer', type: Number })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.remove(id);
  }
}

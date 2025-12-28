
import { Controller, Get, Post, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('communities')
export class CommunitiesController {
    constructor(private readonly communitiesService: CommunitiesService) { }

    @Get()
    findAll() {
        return this.communitiesService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() body: { name: string; description: string }) {
        return this.communitiesService.create(body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post(':id/join')
    join(@Request() req, @Param('id') id: string) {
        return this.communitiesService.join(id, req.user.userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id/messages')
    getMessages(@Param('id') id: string, @Query('limit') limit: number) {
        return this.communitiesService.getMessages(id, limit);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post(':id/messages')
    sendMessage(@Request() req, @Param('id') id: string, @Body() body: { text: string }) {
        return this.communitiesService.sendMessage(req.user.userId, id, body.text);
    }
}

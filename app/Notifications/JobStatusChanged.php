<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class JobStatusChanged extends Notification
{
    use Queueable;
    protected $status;
    protected $reason;

    /**
     * Create a new notification instance.
     */
    public function __construct(string $status, string $reason = null)
    {
        $this->status = $status;
        $this->reason = $reason;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        if ($this->status === 'approved') {
            return (new MailMessage)
                ->subject('✅ Your Job Has Been Approved')
                ->greeting('Hello ' . $notifiable->name . '!')
                ->line('Your job post has been approved successfully.')
                ->action('View Your Job', url('/job-posts'))
                ->line('Thank you for using Job Hunters!');
        }

        return (new MailMessage)
            ->subject('❌ Your Job Has Been Denied')
            ->greeting('Hello ' . $notifiable->name . ',')
            ->line('Unfortunately, your job post has been denied.')
            ->line('Reason: ' . ($this->reason ?: 'No reason provided.'))
            ->line('You can review and resubmit it.')
            ->action('Edit Job', url('/job-posts/create'))
            ->line('Thank you for understanding.');
    }
    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}

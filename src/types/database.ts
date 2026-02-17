export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      coaching_courses: {
        Row: {
          id: string
          title: string
          description: string | null
          course_type: 'online' | 'offline'
          price: number
          duration_minutes: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          course_type: 'online' | 'offline'
          price: number
          duration_minutes?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          course_type?: 'online' | 'offline'
          price?: number
          duration_minutes?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      coaching_bookings: {
        Row: {
          id: string
          user_id: string
          course_id: string
          booking_date: string | null
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          booking_date?: string | null
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          booking_date?: string | null
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          booking_id: string
          user_id: string
          amount: number
          payment_type: 'one_time' | 'subscription'
          payment_method: string | null
          toss_payment_key: string | null
          toss_order_id: string | null
          toss_payment_status: 'pending' | 'ready' | 'in_progress' | 'waiting_for_deposit' | 'done' | 'canceled' | 'partial_canceled' | 'aborted' | 'expired'
          paid_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          user_id: string
          amount: number
          payment_type: 'one_time' | 'subscription'
          payment_method?: string | null
          toss_payment_key?: string | null
          toss_order_id?: string | null
          toss_payment_status?: 'pending' | 'ready' | 'in_progress' | 'waiting_for_deposit' | 'done' | 'canceled' | 'partial_canceled' | 'aborted' | 'expired'
          paid_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          user_id?: string
          amount?: number
          payment_type?: 'one_time' | 'subscription'
          payment_method?: string | null
          toss_payment_key?: string | null
          toss_order_id?: string | null
          toss_payment_status?: 'pending' | 'ready' | 'in_progress' | 'waiting_for_deposit' | 'done' | 'canceled' | 'partial_canceled' | 'aborted' | 'expired'
          paid_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          course_id: string
          billing_key: string
          customer_key: string
          status: 'active' | 'paused' | 'cancelled'
          next_payment_date: string | null
          amount: number
          created_at: string
          updated_at: string
          cancelled_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          billing_key: string
          customer_key: string
          status?: 'active' | 'paused' | 'cancelled'
          next_payment_date?: string | null
          amount: number
          created_at?: string
          updated_at?: string
          cancelled_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          billing_key?: string
          customer_key?: string
          status?: 'active' | 'paused' | 'cancelled'
          next_payment_date?: string | null
          amount?: number
          created_at?: string
          updated_at?: string
          cancelled_at?: string | null
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}

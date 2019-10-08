MBB:0000 
0x00007faeacd525c8:   90                               nop
0x00007faeacd525c9:   8b 46 10                         mov    0x10(%rsi),%eax
0x00007faeacd525cc:   44 8b 47 10                      mov    0x10(%rdi),%r8d
0x00007faeacd525d0:   41 b9 00 00 00 00                mov    $0x0,%r9d
0x00007faeacd525d6:   44 8b 51 10                      mov    0x10(%rcx),%r10d
MBB:0001 
0x00007faeacd525da:   41 bb 00 00 00 00                mov    $0x0,%r11d
0x00007faeacd525e0:   45 3b ca                         cmp    %r10d,%r9d
0x00007faeacd525e3:   0f 8d 19 00 00 00                jge    0x00007faeacd52602
MBB:0002 
0x00007faeacd525e9:   41 bb ff ff ff ff                mov    $0xffffffff,%r11d
0x00007faeacd525ef:   46 89 5c 89 18                   mov    %r11d,0x18(%rcx,%r9,4)
0x00007faeacd525f4:   41 bb 01 00 00 00                mov    $0x1,%r11d
0x00007faeacd525fa:   45 03 cb                         add    %r11d,%r9d
0x00007faeacd525fd:   e9 d8 ff ff ff                   jmpq   0x00007faeacd525da
MBB:0003 
0x00007faeacd52602:   41 b9 01 00 00 00                mov    $0x1,%r9d
0x00007faeacd52608:   45 8b d0                         mov    %r8d,%r10d
0x00007faeacd5260b:   45 2b d1                         sub    %r9d,%r10d
0x00007faeacd5260e:   45 8b ca                         mov    %r10d,%r9d
MBB:0004 
0x00007faeacd52611:   41 bc 00 00 00 00                mov    $0x0,%r12d
0x00007faeacd52617:   45 3b cc                         cmp    %r12d,%r9d
0x00007faeacd5261a:   0f 8c 4b 00 00 00                jl     0x00007faeacd5266b
MBB:0005 
0x00007faeacd52620:   41 bc ff ff ff ff                mov    $0xffffffff,%r12d
0x00007faeacd52626:   46 8b 6c 8f 18                   mov    0x18(%rdi,%r9,4),%r13d
0x00007faeacd5262b:   44 8b 71 10                      mov    0x10(%rcx),%r14d
0x00007faeacd5262f:   45 3b ee                         cmp    %r14d,%r13d
0x00007faeacd52632:   0f 82 08 00 00 00                jb     0x00007faeacd52640
0x00007faeacd52638:   48 8b 2c 25 02 00 00 00          mov    0x2,%rbp
0x00007faeacd52640:   46 8b 74 a9 18                   mov    0x18(%rcx,%r13,4),%r14d
0x00007faeacd52645:   45 3b f4                         cmp    %r12d,%r14d
0x00007faeacd52648:   0f 85 05 00 00 00                jne    0x00007faeacd52653
0x00007faeacd5264e:   e9 05 00 00 00                   jmpq   0x00007faeacd52658
MBB:0026 
0x00007faeacd52653:   e9 05 00 00 00                   jmpq   0x00007faeacd5265d
MBB:0006 
0x00007faeacd52658:   46 89 4c a9 18                   mov    %r9d,0x18(%rcx,%r13,4)
MBB:0007 
0x00007faeacd5265d:   41 bc ff ff ff ff                mov    $0xffffffff,%r12d
0x00007faeacd52663:   45 03 cc                         add    %r12d,%r9d
0x00007faeacd52666:   e9 a6 ff ff ff                   jmpq   0x00007faeacd52611
MBB:0008 
0x00007faeacd5266b:   41 b9 00 00 00 00                mov    $0x0,%r9d
0x00007faeacd52671:   4d 87 d1                         xchg   %r10,%r9
MBB:0009 
0x00007faeacd52674:   45 8b e2                         mov    %r10d,%r12d
0x00007faeacd52677:   45 03 e1                         add    %r9d,%r12d
0x00007faeacd5267a:   44 3b e0                         cmp    %eax,%r12d
0x00007faeacd5267d:   0f 8d 67 01 00 00                jge    0x00007faeacd527ea
MBB:0010 
0x00007faeacd52683:   45 8b e1                         mov    %r9d,%r12d
0x00007faeacd52686:   4d 87 e3                         xchg   %r12,%r11
0x00007faeacd52689:   4d 87 da                         xchg   %r11,%r10
MBB:0011 
0x00007faeacd5268c:   41 bd 00 00 00 00                mov    $0x0,%r13d
0x00007faeacd52692:   45 3b d5                         cmp    %r13d,%r10d
0x00007faeacd52695:   0f 8c 05 00 00 00                jl     0x00007faeacd526a0
0x00007faeacd5269b:   e9 08 00 00 00                   jmpq   0x00007faeacd526a8
MBB:0027 
0x00007faeacd526a0:   45 8b d3                         mov    %r11d,%r10d
0x00007faeacd526a3:   e9 3a 01 00 00                   jmpq   0x00007faeacd527e2
MBB:0012 
0x00007faeacd526a8:   45 8b eb                         mov    %r11d,%r13d
0x00007faeacd526ab:   45 03 ea                         add    %r10d,%r13d
0x00007faeacd526ae:   44 8b 76 10                      mov    0x10(%rsi),%r14d
0x00007faeacd526b2:   45 3b ee                         cmp    %r14d,%r13d
0x00007faeacd526b5:   0f 82 08 00 00 00                jb     0x00007faeacd526c3
0x00007faeacd526bb:   48 8b 2c 25 02 00 00 00          mov    0x2,%rbp
0x00007faeacd526c3:   46 8b 74 ae 18                   mov    0x18(%rsi,%r13,4),%r14d
0x00007faeacd526c8:   46 8b 7c 97 18                   mov    0x18(%rdi,%r10,4),%r15d
0x00007faeacd526cd:   44 3b e8                         cmp    %eax,%r13d
0x00007faeacd526d0:   0f 8c 05 00 00 00                jl     0x00007faeacd526db
0x00007faeacd526d6:   e9 04 01 00 00                   jmpq   0x00007faeacd527df
MBB:0013 
0x00007faeacd526db:   44 89 4c 24 f8                   mov    %r9d,-0x8(%rsp)
0x00007faeacd526e0:   41 b9 01 00 00 00                mov    $0x1,%r9d
0x00007faeacd526e6:   44 89 6c 24 f0                   mov    %r13d,-0x10(%rsp)
0x00007faeacd526eb:   45 8b eb                         mov    %r11d,%r13d
0x00007faeacd526ee:   45 03 e9                         add    %r9d,%r13d
0x00007faeacd526f1:   45 3b f7                         cmp    %r15d,%r14d
0x00007faeacd526f4:   0f 84 05 00 00 00                je     0x00007faeacd526ff
0x00007faeacd526fa:   e9 67 00 00 00                   jmpq   0x00007faeacd52766
MBB:0014 
0x00007faeacd526ff:   41 b9 00 00 00 00                mov    $0x0,%r9d
0x00007faeacd52705:   45 3b d1                         cmp    %r9d,%r10d
0x00007faeacd52708:   0f 85 05 00 00 00                jne    0x00007faeacd52713
0x00007faeacd5270e:   e9 0e 00 00 00                   jmpq   0x00007faeacd52721
MBB:0028 
0x00007faeacd52713:   45 8b f4                         mov    %r12d,%r14d
0x00007faeacd52716:   45 8b cb                         mov    %r11d,%r9d
0x00007faeacd52719:   45 8b de                         mov    %r14d,%r11d
0x00007faeacd5271c:   e9 2c 00 00 00                   jmpq   0x00007faeacd5274d
MBB:0015 
0x00007faeacd52721:   44 8b 4a 10                      mov    0x10(%rdx),%r9d
0x00007faeacd52725:   45 3b e1                         cmp    %r9d,%r12d
0x00007faeacd52728:   0f 82 08 00 00 00                jb     0x00007faeacd52736
0x00007faeacd5272e:   48 8b 24 25 02 00 00 00          mov    0x2,%rsp
0x00007faeacd52736:   41 b9 01 00 00 00                mov    $0x1,%r9d
0x00007faeacd5273c:   45 8b f4                         mov    %r12d,%r14d
0x00007faeacd5273f:   45 03 f1                         add    %r9d,%r14d
0x00007faeacd52742:   46 89 5c a2 18                   mov    %r11d,0x18(%rdx,%r12,4)
0x00007faeacd52747:   45 8b de                         mov    %r14d,%r11d
0x00007faeacd5274a:   45 8b cd                         mov    %r13d,%r9d
MBB:0016 
0x00007faeacd5274d:   41 bc ff ff ff ff                mov    $0xffffffff,%r12d
0x00007faeacd52753:   45 03 d4                         add    %r12d,%r10d
0x00007faeacd52756:   44 8b 64 24 f8                   mov    -0x8(%rsp),%r12d
0x00007faeacd5275b:   4d 87 e3                         xchg   %r12,%r11
0x00007faeacd5275e:   4d 87 d9                         xchg   %r11,%r9
0x00007faeacd52761:   e9 26 ff ff ff                   jmpq   0x00007faeacd5268c
MBB:0017 
0x00007faeacd52766:   44 8b 49 10                      mov    0x10(%rcx),%r9d
0x00007faeacd5276a:   45 3b f1                         cmp    %r9d,%r14d
0x00007faeacd5276d:   0f 82 08 00 00 00                jb     0x00007faeacd5277b
0x00007faeacd52773:   48 8b 34 25 02 00 00 00          mov    0x2,%rsi
0x00007faeacd5277b:   46 8b 4c b1 18                   mov    0x18(%rcx,%r14,4),%r9d
0x00007faeacd52780:   41 ba ff ff ff ff                mov    $0xffffffff,%r10d
0x00007faeacd52786:   45 3b ca                         cmp    %r10d,%r9d
0x00007faeacd52789:   0f 85 18 00 00 00                jne    0x00007faeacd527a7
MBB:0018 
0x00007faeacd5278f:   41 b9 01 00 00 00                mov    $0x1,%r9d
0x00007faeacd52795:   44 8b 54 24 f0                   mov    -0x10(%rsp),%r10d
0x00007faeacd5279a:   45 03 d1                         add    %r9d,%r10d
0x00007faeacd5279d:   44 8b 4c 24 f8                   mov    -0x8(%rsp),%r9d
0x00007faeacd527a2:   e9 3b 00 00 00                   jmpq   0x00007faeacd527e2
MBB:0019 
0x00007faeacd527a7:   45 8b d3                         mov    %r11d,%r10d
0x00007faeacd527aa:   45 03 d1                         add    %r9d,%r10d
0x00007faeacd527ad:   44 8b 4c 24 f0                   mov    -0x10(%rsp),%r9d
0x00007faeacd527b2:   45 2b ca                         sub    %r10d,%r9d
0x00007faeacd527b5:   41 ba 00 00 00 00                mov    $0x0,%r10d
0x00007faeacd527bb:   45 3b ca                         cmp    %r10d,%r9d
0x00007faeacd527be:   0f 8e 05 00 00 00                jle    0x00007faeacd527c9
0x00007faeacd527c4:   e9 03 00 00 00                   jmpq   0x00007faeacd527cc
MBB:0020 
0x00007faeacd527c9:   45 8b cd                         mov    %r13d,%r9d
MBB:0021 
MBB:0022 
0x00007faeacd527cc:   45 03 d9                         add    %r9d,%r11d
0x00007faeacd527cf:   45 8b cb                         mov    %r11d,%r9d
0x00007faeacd527d2:   44 8b 54 24 f8                   mov    -0x8(%rsp),%r10d
0x00007faeacd527d7:   4d 87 d1                         xchg   %r10,%r9
0x00007faeacd527da:   e9 03 00 00 00                   jmpq   0x00007faeacd527e2
MBB:0023 
0x00007faeacd527df:   45 8b d3                         mov    %r11d,%r10d
MBB:0024 
0x00007faeacd527e2:   45 8b dc                         mov    %r12d,%r11d
0x00007faeacd527e5:   e9 8a fe ff ff                   jmpq   0x00007faeacd52674
MBB:0025 
0x00007faeacd527ea:   41 8b c3                         mov    %r11d,%eax
0x00007faeacd527ed:   c3                               retq   
